import express from 'express'
import { pool } from '..'
import { queries } from '../queries'
import { Request, Response } from 'express'


export const getIncome = async (req: Request, res: Response) => {
    const {sortType} = req.query // sort could by category by date by amount how to do this 
   
    
    const validSort = ['category','amount','date']

    const finalSort = validSort.includes(sortType as string) ? sortType: 'amount'

    try{
        let result = await pool.query(`
            SELECT i.id, i.user_id, i.description, i.amount, TO_CHAR(i.date, 'Mon DD, YYYY') as date,
            c.name AS category_name, c.id AS category_id
            FROM income i JOIN categories c
            ON i.category_id = c.id 
            WHERE i.user_id = '${req.user?.id}'
            ORDER BY ${finalSort};`)
        if (result.rowCount! > 0){
            res.status(200).json({status:"success", message: "succesfully retrieved multiple income", data: result.rows})
        }else{
            res.status(200).json({status:"success", message: "did not find any data"})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({status:"fail", message:"did not retrieve data due to internal error",})
    }

}

export const getIncomeById = async (req: Request, res: Response) => {


    
}



export const createIncome = async (req: Request, res: Response) => {
    const {description, categoryId, amount, date} = req.body    
    try{
        let result = await pool.query(queries.income.createIncomeQ, [req.user?.id, description, categoryId, amount, date])
            if (result.rowCount! > 0){
                res.status(200).json({status:"success", message: "succesfully created income", data: result.rows})
            }else{
                res.status(200).json({status:"success", message: "did not create income"})
            }
    }catch(e){
        res.status(500).json({status:"fail", message: "did not create income due to server errors"})
        console.log(e)
    }
}

export const patchIncome = async (req: Request, res: Response) => {
    const {category_id, amount, date, description} = req.body
    const {incomeId} = req.params


    let values : any = []
    let conditions : any = []
    let whereConditions : any = []

    if (category_id){
        conditions.push(`category_id = $${values.length+1}`)
        values.push(category_id)
    }
    if(amount){
        conditions.push(`amount = $${values.length+1}`)
        values.push(amount)
    }
    if(date){
        conditions.push(`date = $${values.length+1}`)
        values.push(date)
    }
    if(description){
        conditions.push(`description = $${values.length+1}`)
        values.push(description)
    }

    whereConditions.push(`id = $${values.length+1}`);
    values.push(incomeId)


    whereConditions.push(`user_id = $${values.length+1}`);
    values.push(req.user?.id);
    
    let newQuery: string = `
        UPDATE income
        SET ${conditions.join(', ')}
        WHERE ${whereConditions.join(` AND `)}
        RETURNING *;
    `

    console.log(newQuery, "NEW QUERY");
    console.log(values, "values");


    try{
        let result = await pool.query(newQuery, values)
        if (result.rowCount! > 0){
            res.status(200).json({status:"success", message: "succesfully created income"})
        }else{
            console.log("NIGP")
            res.status(200).json({status:"success", message: "did not create income"})
        }
    }catch(e){
        res.status(500).json({status:"fail", message: "did not create income due to server errors"})
        console.log(e)
    }
}

export const deleteIncome = async (req: Request, res: Response) => {
    const {incomeId} = req.params   
    console.log(incomeId); 
    try{
        let result = await pool.query(queries.income.deleteIncomeQ, [req.user?.id, incomeId])
            if (result.rowCount! > 0){
                res.status(200).json({status:"success", message: "succesfully deleted income", data: result.rows})
            }else{
                res.status(200).json({status:"success", message: "did not delete income but success"})
            }
    }catch(e){
        res.status(500).json({status:"fail", message: "did not delete income due to errors"})
        console.log(e)
    }

    
}

