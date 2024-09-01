import * as dotenv from 'dotenv';
import mysql, {createConnection} from "mysql";
import App from "./App.js";
dotenv.config()


App.listen(process.env.PORT,()=>{
console.log("servidor on-line")

})


const conect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    
})


conect.connect((err)=>{
    if(err){
        console.log("erro ao conectar ao banco de dados",err);
        return;
    }
    console.log(`conexão bem sucedida, api rodando na porta ${process.env.PORT}`)
})
export default conect;