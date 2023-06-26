import Koa from "koa";
import KoaLogger from "koa-logger";
import { koaBody } from "koa-body";
import dotenv from "dotenv"

dotenv.config()
const port = process.env.PORT || 80


const app = new Koa();

import cors from '@koa/cors'

const corsOptions ={ origin:'http://localhost:3000', credentials:true, optionSuccessStatus:200 }
app.use(cors(corsOptions)); //previo a añadir el router

import router from "./router.js";


app.use(KoaLogger());
app.use(koaBody());

app.use(router.routes());


app.listen(port, () => {
    console.log('escuchando en port :'+port);
  });