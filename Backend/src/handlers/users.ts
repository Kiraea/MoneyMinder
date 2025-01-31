
import * as argon2 from "argon2";
import {Request, Response} from 'express'
import {pool} from '../index'
import { queries } from "../queries";
import { IUser } from "../types/express";

export const getUsers = async (req: Request, res: Response) => {

}

export const getUserById = async (req: Request, res: Response) => { 

}

export const createUser = async (req: Request, res: Response) => {

    console.log("createuser hit")
    const {username, password, displayName} = req.body
    console.log(username, password, displayName)
    const userExists = await pool.query(queries.users.checkUserIfExistByUsernameQ, [username]);

    if (userExists.rowCount! > 0){ // ! cause it might be null as typescript states
        res.status(409).json({status: "error", message: "Username already exists" })
    }
    console.log("after")
    const hashedPassword = await argon2.hash(password)

    const addUserResult = await pool.query(queries.users.createUser, [username, hashedPassword, displayName])

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

export const getPublicDetails =  async (req: Request,  res: Response) => {
    if (req.user){
        const user: IUser = req.user
        res.status(200).json({status: "success", message: "sent public details", data: {displayName: user.display_name, provider: user.provider}})
    }
}

