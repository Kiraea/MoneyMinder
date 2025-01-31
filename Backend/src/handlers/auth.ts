import {NextFunction, Request, Response} from 'express'
import { IUser } from '../types/express'




export const login = async (req: Request,res: Response) => {
    if (req.user){
        const user: IUser = req.user
        res.status(200).json({status: "success", message: "sucesfully login", data: user.display_name})
    }else{

        res.status(500).json({status: "failed", message: "unable to login"})
    }
}

export const checkSessionToken = async (req: Request,res: Response) => {
    if (req.user){
        const user: IUser = req.user
        res.status(200).json({status: "success", message: "sucesfully login"})
    }else{
        res.status(500).json({status: "failed", message: "unable to login"})
    }
}

export const deleteSessionToken = async (req: Request,res: Response, next: NextFunction) => {
    req.logout(function(err) {
        if (err)  
        { 
            return next(err); 
        }
        req.session.destroy((destroyErr)=> {
            return next(destroyErr)
        });
        res.clearCookie('connect.sid');


        res.status(200).json({status: "success", message: "sucesfully logout"})

      });

}

export const googleLogin = async (req: Request,res: Response) => {
    if (req.user){
        const user: IUser = req.user
        res.redirect('http://localhost:5173/home');
    }else{

        res.status(500).json({status: "failed", message: "authentication failed"})
    }
}

export const githubLogin = async (req: Request,res: Response) => {
    if (req.user){
        const user: IUser = req.user
        res.redirect('http://localhost:5173/home');
    }else{

        res.status(500).json({status: "failed", message: "authentication failed"})
    }
}

