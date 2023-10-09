import { Request, Response } from "express";
import prisma from "../db";

export const getOneUpdate = async (req : Request, res : Response) =>{
    const update =  await prisma.update.findUnique({
        where : {
            id : req.params.id,
        }
    })
    res.json({ data : { update } });
}

export const getUpdates = async (req : Request, res : Response) =>{
    const products =  await prisma.product.findMany({
        where : {
            BelongsToId : req["user"].id,
        }
        , 
        include : {
            updates : true,
        }
    })
    const updates = products.reduce((allUpdates,product) => {
        return [...allUpdates,...product.updates]
    },[]);
    res.json({ data : { updates } });
}

export const createUpdates = async (req : Request, res : Response) =>{
    const product =  await prisma.product.findUnique({
        where : {
            id : req.body.ProductId,
        },
        include : {
            BelongsTo : true,
        }
    })
    console.log(product);
    
    if(product && product.BelongsTo.id === req["user"].id){
        console.log('rgzrgeg',product.BelongsTo.id,req["user"].id);
        
        const update = await prisma.update.create({
            data : {
                body : req.body.body,
                title : req.body.title,
                updateAt : new Date(),
                ProductId : req.body.ProductId,
            }
        })
        return res.json({ data : { update } });
    }
    else{
        res.status(401);
        res.json({ message : "not authorized"})
    }
}
export const updateUpdates = async (req : Request, res : Response) =>{
    const products =  await prisma.product.findMany({
        where : {
            BelongsToId : req['user'].id,
        },
        include : {
            updates : true,
        }
    })
    const updates = products.reduce((allUpdates,product) => {
        return [...allUpdates,...product.updates]
    },[]);
    
    const match = updates.find(update => update.id === req.params.id); 
    if(!match){
        res.status(401);
        res.json({ message : "not authorized"})
    }
    else{
        const update = await prisma.update.update({
            where : {
                id : match.id,
            },
            data : {
                body : req.body.body,
                title : req.body.title,
                updateAt : new Date(),
            }
        })
        res.json(update)
    }
}

export const delteUpdates = async (req : Request, res : Response) =>{
    const products =  await prisma.product.findMany({
        where : {
            BelongsToId : req['user'].id,
        },
        include : {
            updates : true,
        }
    })
    const updates = products.reduce((allUpdates,product) => {
        return [...allUpdates,...product.updates]
    },[]);
    
    const match = updates.find(update => update.id === req.params.id); 
    if(!match){
        res.status(401);
        res.json({ message : "not authorized"})
    }
    else{
        const update = await prisma.update.delete({
            where : {
                id : match.id,
            }
        })
        res.json(update)
    }
}