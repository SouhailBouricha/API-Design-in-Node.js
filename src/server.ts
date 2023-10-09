import express from "express";
import router from "./router";
import morgan from "morgan";
import cors  from "cors";
import { protect } from "./modules/auth";
import { creatNewUser, signin } from "./handlers/user";

const app = express();


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get("/", (req,res) =>{
    res.status(200);
    res.json({name : "Souhail"})
});

app.use("/api", protect ,router);
app.use("/user" ,creatNewUser);
app.use("/signin" ,signin);


export default app;