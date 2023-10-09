import { Request, Response } from "express";
import prisma from "../db";

export const getAllProducts = async (req : Request, res : Response) =>{
    const user =  await prisma.user.findUnique({
        where : {
            id : req['user'].id
        },
        include : {
            products: true
        }
    })
    res.json({ data : { products : user.products}});
}

export const getOneProduct = async (req : Request, res : Response) =>{
    const product =  await prisma.product.findUnique({
        where : {
            id : req.params.id,
            BelongsToId : req['user'].id,
        }
    })
    res.json({ data : { product}});
}

export const createProduct = async (req : Request, res : Response) =>{
    const product =  await prisma.product.create({
        data : {
            name : req.body.name,
            BelongsToId : req["user"].id,
        }
    })
    res.json({ data : { product}});
}

export const updateProduct = async (req : Request, res : Response) =>{
    const product =  await prisma.product.update({
        where : {
            id : req.params.id,
            BelongsToId : req["user"].id,
        },
        data : {
            name : req.body.name,
        }
    })
    res.json({ data : { product}});
}

export const deleteProduct = async (req : Request, res : Response) =>{
    const product =  await prisma.product.delete({
        where : {
            id : req.params.id,
            BelongsToId : req["user"].id,
        }
    })
    res.json({ data : { product}});
}