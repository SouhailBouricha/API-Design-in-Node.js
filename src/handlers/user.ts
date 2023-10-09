import { Request, Response } from "express";
import prisma from "../db";
import { comparePasswords, createJwt, hashPasswords } from "../modules/auth";

export const creatNewUser = async (req : Request, res : Response) =>{
    const user = await prisma.user.create({
        data : {
            username : req.body.username,
            password : await hashPasswords(req.body.password)
        }
    });
    const token = createJwt(user);
    res.json({ token });
};

export const signin = async (req : Request, res : Response) => {
    const user = await prisma.user.findUnique({
        where : {
            username : req.body.username,
        }
    })
    const isValid = await comparePasswords(req.body.password, user.password);
    if(!isValid){
        res.status(401);
        res.json({ message : "not authorized"})
        return;
    }
    const token = createJwt(user);
    res.json({ token });
};