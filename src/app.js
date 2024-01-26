import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRouter from './routes/authRouter.js'

 
const app = express();
app.use(express.json({limit:"16kb"}));  // server will accept json and json is limited to 16kb
app.use(express.urlencoded({extended:true,limit:"16kb"})); // data can come in url so its accepting url and do the encoding for space like + or &% etc..
app.use(express.static("public"))  // keep the public assets like image , favicon on server
app.use(cookieParser())  // can store secure cookies in user browser
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:true}))
app.use(
    cors({
        origin:process.env.CORS_ORIGIN
    })
);
app.set("view engine", "ejs")
app.set('views','./views')





// ROUTES USE

app.use('/',authRouter)


export {app}