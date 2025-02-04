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
            c.name AS category_name 
            FROM expenses e JOIN categories c
            ON e.category_id = c.id ORDER BY ${finalSort};`)
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

export const updateExpense = async (req: Request, res: Response) => {


    
}

export const deleteExpense = async (req: Request, res: Response) => {
    const {expenseId} = req.params   
    console.log(expenseId); 
    try{
        let result = await pool.query(queries.expenses.deleteExpenseQ, [req.user?.id, expenseId])
            if (result.rowCount! > 0){
                res.status(200).json({status:"success", message: "succesfully deleted expense", data: result.rows})
            }else{
                res.status(200).json({status:"success", message: "did not delete expense"})
            }
    }catch(e){
        res.status(500).json({status:"fail", message: "did not delete expense"})
        console.log(e)
    }

    
}

