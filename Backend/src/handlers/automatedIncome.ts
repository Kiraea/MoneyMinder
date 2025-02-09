import express from 'express'
import { pool } from '..'
import { queries } from '../queries'
import { Request, Response } from 'express'


export const getAutomatedIncome = async (req: Request, res: Response) => {

    console.log("kdksaodkaso");
    const {sortType} = req.query // sort could by category by date by amount how to do this 
   
    
    const validSort = ['category','amount','date']

    const finalSort = validSort.includes(sortType as string) ? sortType: 'amount'

    try{
        let result = await pool.query(`
            SELECT i.id, i.user_id, i.description, i.amount, TO_CHAR(i.date, 'Mon DD, YYYY') as date, i.schedule_frequency,
            c.name AS category_name, c.id AS category_id
            FROM automated_income i JOIN categories c
            ON i.category_id = c.id 
            WHERE i.user_id = '${req.user?.id}'
            ORDER BY ${finalSort};`)
        if (result.rowCount! > 0){
            res.status(200).json({status:"success", message: "succesfully retrieved multiple automated_income", data: result.rows})
        }else{
            res.status(200).json({status:"success", message: "did not find any data"})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({status:"fail", message:"did not retrieve data due to internal error",})
    }

}

export const getAutomatedIncomeById = async (req: Request, res: Response) => {


    
}



export const createAutomatedIncome = async (req: Request, res: Response) => {
    const {description, categoryId, amount, date, scheduleFrequency} = req.body    
    console.log(scheduleFrequency)
    try{
        let result = await pool.query(queries.automatedIncome.createAutomatedIncomeQ, [req.user?.id, description, categoryId, amount, date, scheduleFrequency])
            if (result.rowCount! > 0){
                res.status(200).json({status:"success", message: "succesfully created automated income", data: result.rows})
            }else{
                res.status(200).json({status:"success", message: "did not create automated income"})
            }
    }catch(e){
        res.status(500).json({status:"fail", message: "did not create automated income due to server errors"})
        console.log(e)
    }
}

export const patchAutomatedIncome = async (req: Request, res: Response) => {
    const {category_id, amount, date, description} = req.body
    const {automatedIncomeId} = req.params


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
    values.push(automatedIncomeId)


    whereConditions.push(`user_id = $${values.length+1}`);
    values.push(req.user?.id);
    
    let newQuery: string = `
        UPDATE automated_income 
        SET ${conditions.join(', ')}
        WHERE ${whereConditions.join(` AND `)}
        RETURNING *;
    `

    console.log(newQuery, "NEW QUERY");
    console.log(values, "values");


    try{
        let result = await pool.query(newQuery, values)
        if (result.rowCount! > 0){
            res.status(200).json({status:"success", message: "succesfully created automated_income"})
        }else{
            console.log("NIGP")
            res.status(200).json({status:"success", message: "did not create automated income"})
        }
    }catch(e){
        res.status(500).json({status:"fail", message: "did not create automated income due to server errors"})
        console.log(e)
    }
}

export const deleteAutomatedIncome = async (req: Request, res: Response) => {
    const {automatedIncomeId} = req.params   
    try{
        let result = await pool.query(queries.automatedIncome.deleteAutomatedIncomeQ, [req.user?.id, automatedIncomeId])
            if (result.rowCount! > 0){
                res.status(200).json({status:"success", message: "succesfully deleted automated_income", data: result.rows})
            }else{
                res.status(200).json({status:"success", message: "did not delete automated_income but success"})
            }
    }catch(e){
        res.status(500).json({status:"fail", message: "did not delete automated_income due to errors"})
        console.log(e)
    }
}

