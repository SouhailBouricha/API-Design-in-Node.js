import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const handelInputErrors = (req :Request, res : Response, next : NextFunction) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(401);
        res.json({
            errors : errors.array()
        })
    }   
    else{
        next();
    }
};