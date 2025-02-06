import express from 'express'
import { pool } from '..'
import { queries } from '../queries'
import { Request, Response } from 'express'


export const getSavings = async (req: Request, res: Response) => {
    const {sortType} = req.query // sort could by category by date by amount how to do this 
   
    
    const validSort = ['category','amount','date']

    const finalSort = validSort.includes(sortType as string) ? sortType: 'amount'

    try{
        let result = await pool.query(`
            SELECT s.id, s.user_id, s.description, s.amount, TO_CHAR(s.date, 'Mon DD, YYYY') as date,
            c.name AS category_name, c.id AS category_id
            FROM savings s JOIN categories c
            ON s.category_id = c.id 
            WHERE s.user_id = '${req.user?.id}'
            ORDER BY ${finalSort};`)
        if (result.rowCount! > 0){
            res.status(200).json({status:"success", message: "succesfully retrieved multiple savings", data: result.rows})
        }else{
            res.status(200).json({status:"success", message: "did not find any data"})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({status:"fail", message:"did not retrieve data due to internal error",})
    }

}

export const getSavingById = async (req: Request, res: Response) => {


    
}



export const createSaving = async (req: Request, res: Response) => {
    const {description, categoryId, amount, date} = req.body    
    try{
        let result = await pool.query(queries.savings.createSavingQ, [req.user?.id, description, categoryId, amount, date])
            if (result.rowCount! > 0){
                res.status(200).json({status:"success", message: "succesfully created savings", data: result.rows})
            }else{
                res.status(200).json({status:"success", message: "did not create savings"})
            }
    }catch(e){
        res.status(500).json({status:"fail", message: "did not create savings due to server errors"})
        console.log(e)
    }
}

export const patchSaving = async (req: Request, res: Response) => {
    const {category_id, amount, date, description} = req.body
    const {savingId} = req.params


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
    values.push(savingId)


    whereConditions.push(`user_id = $${values.length+1}`);
    values.push(req.user?.id);
    
    let newQuery: string = `
        UPDATE savings 
        SET ${conditions.join(', ')}
        WHERE ${whereConditions.join(` AND `)}
        RETURNING *;
    `

    console.log(newQuery, "NEW QUERY");
    console.log(values, "values");


    try{
        let result = await pool.query(newQuery, values)
        if (result.rowCount! > 0){
            res.status(200).json({status:"success", message: "succesfully created savings"})
        }else{
            console.log("NIGP")
            res.status(200).json({status:"success", message: "did not create savings"})
        }
    }catch(e){
        res.status(500).json({status:"fail", message: "did not create savings due to server errors"})
        console.log(e)
    }
}

export const deleteSaving = async (req: Request, res: Response) => {
    const {savingId} = req.params   
    try{
        let result = await pool.query(queries.savings.deleteSavingQ, [req.user?.id, savingId])
            if (result.rowCount! > 0){
                res.status(200).json({status:"success", message: "succesfully deleted savings", data: result.rows})
            }else{
                res.status(200).json({status:"success", message: "did not delete savings but success"})
            }
    }catch(e){
        res.status(500).json({status:"fail", message: "did not delete savings due to errors"})
        console.log(e)
    }

    
}

