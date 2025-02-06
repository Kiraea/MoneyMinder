import express from 'express'
import { pool } from '..'
import { queries } from '../queries'
import { Request, Response } from 'express'


export const getCategories = async (req: Request, res: Response) => {
    const {categoryType} = req.query

    let values: any[] = [];
    let conditions: string[] = [];  


    if (categoryType) {
        conditions.push(`type = $${values.length + 1}`);
        values.push(categoryType);
    }
    let queryStatement = `WHERE user_id = $${values.length + 1}`;
    values.push(req.user?.id);

   if (conditions.length > 0){
        queryStatement += ` AND ${conditions.join(" AND ")}`
   } 

    try{
        let result = await pool.query(`SELECT * FROM categories c ${queryStatement};`, values)
        if (result.rowCount! > 0){
            res.status(200).json({status:"success", message: "succesfully retrieved categories", data: result.rows})
        }else{
            res.status(200).json({status:"success", message: "did not find any data"})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({status:"fail", message:"did not retrieve data due to internal error",})
    }
    
}

export const getCategoryById = async (req: Request, res: Response) => {
    const {categoryId} = req.params


    if (!categoryId){

        res.status(400).json({status:"fail", message:"insuficcient parameters",})
        return;
    }

    try{
        let result = await pool.query(queries.categories.getCategoriesByIdQ, [categoryId])
        if (result.rowCount! > 0){
            res.status(200).json({status:"success", message: "succesfully retrieved categories by id", data: result.rows})
        }else{
            res.status(200).json({status:"success", message: "did not find any data"})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({status:"fail", message:"did not retrieve data due to internal error",})
    }

    
}



export const createCategory = async (req: Request, res: Response) => {
    const { categoryName, categoryType} = req.body

    if (!categoryName || !categoryType){
        res.status(400).json({status:"fail", message:"insuficcient parameters",})
        return;
    }

    try{
        let result = await pool.query(queries.categories.createCategoryQ, [req.user?.id, categoryName, categoryType])
        if (result.rowCount! > 0){
            res.status(200).json({status:"success", message: "succesfully created categories", data: result.rows})
        }else{
            res.status(200).json({status:"success", message: "success but did not create "})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({status:"fail", message:"did not create category due to internal error",})
    }
}

export const deleteCategory = async (req: Request, res: Response) => {

    const {categoryId} = req.params
    const unCategorizedId = 1
    console.log('categoryId:', categoryId);  // Log to verify the value
    if (!categoryId){
        res.status(400).json({status:"fail", message:"insuficcient parameters",})
        return;
    }


    try{
        console.log("1")
        let result = await pool.query(queries.categories.findUncategorizedCategory, ["uncategorized", req.user?.id])
        if (result.rowCount! > 0){
            try{
                console.log("2")
                let result2 = await pool.query(queries.expenses.batchUpdateExpensesCategoryQ, [result.rows[0].id, req.user?.id, categoryId])
                // TODO ADD FOR THE INCOME AND THE SAVINGS AS WELL
                if (result2.rowCount! > 0) {





                }

                console.log("3")
                try{
                    let result = await pool.query(queries.categories.deleteCategoryQ, [req.user?.id ,categoryId])
                    if (result.rowCount! > 0){
                        console.log("4")
                        res.status(200).json({status:"success", message: "succesfully deleted categories", data: result.rows})
                    }else{
                        res.status(200).json({status:"success", message: "success but did not delete "})
                    }
                }catch(e){
                    console.log(e)
                    res.status(500).json({status:"fail", message:"did not delete category due to internal error",})
                }
            
            }catch(e){
                console.log(e)
            }
        }
    }catch(e){
        console.log(e)
    }





    
}

export const updateCategory = async (req: Request, res: Response) => {


    
}



export const batchUpdateCategory = async  (req: Request, res: Response) => {

    
}



