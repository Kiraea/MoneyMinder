
import * as argon2 from "argon2";
import {Request, Response} from 'express'
import {pool} from '../index'
import { queries } from "../queries";

export const getUsers = async (req: Request, res: Response) => {

}

export const getUserById = async (req: Request, res: Response) => { 

}

export const createUser = async (req: Request, res: Response) => {
    const {username, password, display_name} = req.body

    const userExists = await pool.query(queries.users.checkUserIfExistsQ, [username]);

    if (userExists.rowCount! > 0){ // ! cause it might be null as typescript states
        res.status(409).json({status: "error", message: "Username already exists" })
    }
    const hashedPassword = argon2.hash(password)

    const addUserResult = await pool.query(queries.users.createUser, [username, password, display_name])

    if (addUserResult.rowCount! > 0){
        res.status(200).json({status: "success", message: "user created", data: addUserResult})
    }else{
        res.status(500).json({status: "error", message: "Cannot create User" })
    }



    




}

export const deleteUser  = async (req: Request, res: Response) => {


}

export const updateUser = async (req: Request, res: Response) => {


}