import express from 'express'
import { pool } from '..'
import { queries } from '../queries'
import { Request, Response } from 'express'


export const getExpenses = async (req: Request, res: Response) => {
    const {sortType} = req.query // sort could by category by date by amount how to do this 
   
    
    const validSort = ['category','amount','date']

    const finalSort = validSort.includes(sortType as string) ? sortType: 'amount'

    try{
        let result = await pool.query(`
            SELECT e.id, e.user_id, e.description, e.amount, TO_CHAR(e.date, 'Mon DD, YYYY') as date,
            c.name AS category_name, c.id AS category_id
            FROM expenses e JOIN categories c
            ON e.category_id = c.id 
            WHERE e.user_id = '${req.user?.id}'
            ORDER BY ${finalSort};`)
        if (result.rowCount! > 0){
            res.status(200).json({status:"success", message: "succesfully retrieved expenses", data: result.rows})
        }else{
            res.status(200).json({status:"success", message: "did not find any data"})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({status:"fail", message:"did not retrieve data due to internal error",})
    }

}

export const getExpense = async (req: Request, res: Response) => {


    
}



export const createExpense = async (req: Request, res: Response) => {
    const {description, categoryId, amount, date} = req.body    
    try{
        let result = await pool.query(queries.expenses.createExpenseQ, [req.user?.id, description, categoryId, amount, date])
            if (result.rowCount! > 0){
                res.status(200).json({status:"success", message: "succesfully created expense", data: result.rows})
            }else{
                res.status(200).json({status:"success", message: "did not create expense"})
            }
    }catch(e){
        res.status(500).json({status:"fail", message: "did not create expense"})
        console.log(e)
    }
}

export const patchExpense = async (req: Request, res: Response) => {
    console.log("patchexpense function")
    const {category_id, amount, date, description} = req.body
    const {expenseId} = req.params


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
    values.push(expenseId)


    whereConditions.push(`user_id = $${values.length+1}`);
    values.push(req.user?.id);
    
    let newQuery: string = `
        UPDATE expenses
        SET ${conditions.join(', ')}
        WHERE ${whereConditions.join(` AND `)}
        RETURNING *;
    `

    console.log(newQuery, "NEW QUERY");
    console.log(values, "values");


    try{
        let result = await pool.query(newQuery, values)
        if (result.rowCount! > 0){
            res.status(200).json({status:"success", message: "succesfully created expense"})
        }else{
            console.log("NIGP")
            res.status(200).json({status:"success", message: "did not create expense"})
        }
    }catch(e){
        res.status(500).json({status:"fail", message: "did not create expense"})
        console.log(e)
    }
}

export const deleteExpense = async (req: Request, res: Response) => {
    const {expenseId} = req.params   
    console.log(expenseId); 
    try{
        let result = await pool.query(queries.expenses.deleteExpenseQ, [req.user?.id, expenseId])
            if (result.rowCount! > 0){
                res.status(200).json({status:"success", message: "succesfully deleted expense", data: result.rows})
            }else{
                res.status(200).json({status:"success", message: "did not delete expense but success"})
            }
    }catch(e){
        res.status(500).json({status:"fail", message: "did not delete expense"})
        console.log(e)
    }

    
}

