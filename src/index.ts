import * as dotenv from "dotenv";
dotenv.config();
import app from "./server";

app.listen(process.env.PORT,() => console.log("server http://localhost:3000 listen on 3000"))