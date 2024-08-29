import express from 'express'
import mysql from 'mysql'
const app = express();
app.use(express.json());
const users =[];


const conect = mysql.createConnection({
host: "localhost",
user: "test",
password: "Umjacare23!",
database: "PESSOAS"
})

conect.connect((err)=>{
    if(err){
        console.log("erro ao conectar ao banco de dados",err);
        return;
    }
    console.log("conexão bem sucedida")
})

//ROTA GET 
app.get('/pessoas', (req,res)=>{

    const sql = 'SELECT * FROM pessoas';
    conect.query(sql,(error,result)=>{
        if(error){
            console.log(error);
            res.status(500);
            return;
        }
        res.status(200).json(result);
    })

res.json(users)

})

//ROTA POST
app.post('/pessoas',(req,res)=>{

const {Apelido, Nome, Nascimento,Stack, id} = req.body;

const sql = 'INSERT INTO pessoas (Apelido, Nome, Nascimento, Stack) VALUES (?,?,?,?)';
const valores = [Apelido,Nome, Nascimento,JSON.stringify(Stack)];

conect.query(sql,valores,(error,result)=>{

if(error){
    console.log(error);
    res.status(500).send("erro ao inserir os dados");
    return;
}
res.status(201).send("dados inseridos com sucesso")
})
});


//rota get com id
app.get('/pessoas/:id', (req,res)=>{
const sql = 'SELECT * FROM pessoas WHERE id =?';
const id = req.params.id;
conect.query(sql, id, (error,result)=>{
if(error){
    console.log(error);
    res.status(500);
    return;

}
res.status(200).json(result);

})

})

//rota get com termo especifico
app.get('/pessoas?t=termo', (req, res) => {
    const termo = req.query.t; // Captura o parâmetro de consulta 't'
    const sql = `SELECT * FROM pessoas WHERE nome LIKE ? OR apelido LIKE ?`;

    // Usa parâmetros vinculados para evitar injeção SQL
    conexao.query(sql, [`%${termo}%`, `%${termo}%`], (error, result) => {
        if (error) {
            console.error('Erro ao buscar:', error);
            return res.status(500).send('Erro ao buscar registros');
        }

        res.status(200).json(result);
    });
});

//ROTA DE PUT

app.put('/pessoas/:id',(req,res)=>{
const id = req.params.id;
const sql = 'UPDATE pessoas SET Apelido = ?, Nome = ?, Nascimento = ?, Stack = ? WHERE id = ?';
const {Apelido,Nome, Nascimento,Stack}= req.body;
const valores = [Apelido, Nome, Nascimento, JSON.stringify(Stack), id];
conect.query(sql,valores,(error, result)=>{
    if(error){
        res.status(500).send("erro ao atualizar o registro");
        return;
    }
    if(result.affectedRows === 0){
        res.status(404).send("registro não encontrado");
        return;
    }
    res.status(200).send("registro atualizado com sucesso")
    


})

})
app.delete('/pessoas/:id',(req,res)=>{
const id = req.params.id;
const sql ='DELETE FROM pessoas WHERE id =?'
conect.query(sql, id,(error,result)=>{
    if(error){
        console.log("nao deu para deletar",error);
        res.status(500)
        return;
    }
    if(result.affectedRows == 0){
        res.status(404).send("registro nao encontrardo")
        return;
    }
    console.log("deletado com sucesso");
    res.status(200).send("registro deletado");
})
})

app.listen(3000)



