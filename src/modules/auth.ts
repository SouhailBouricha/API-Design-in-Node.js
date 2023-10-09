import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";


// interface userformat {
//     id : string,
//     username : string
// }

// export interface IGetUserAuthInfoRequest extends Request {
//     user: string | JwtPayload
// }

export const comparePasswords = (password,hash) =>{
    return bcrypt.compare(password,hash);
}

export const hashPasswords = (password) =>{
    return bcrypt.hash(password,5);
}
export const createJwt = (user) => {
    const token = jwt.sign({
        id : user.id,
        username : user.username
    },
    process.env.JWT_SECRET 
    )
    return token;
};

export const protect = (req : Request, res : Response, next: NextFunction) =>{
    const bearer = req.headers.authorization;
    if(!bearer){
        res.status(401);
        res.json({ message : "not authorized"})
        return;
    }
    const [,token] = bearer.split(" ");
    if(!token){
        res.status(401);
        res.json({ message : "not a valid token"})
        return;    
    }
    try{
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req["user"] = user;
        next();
    }
    catch(e){
        res.status(401);
        res.json({ message : "not a valid token"})
        return;  
    }
};