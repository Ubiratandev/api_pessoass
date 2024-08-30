import conect from "./Conexao.js";

class pessoaControler{

    showPessoas(req,res){
        const sql = 'SELECT * FROM pessoas WHERE id =?';
        const id = req.params.id;
        conect.query(sql, id, (error,result)=>{
        if(error){
            console.log(error);
            res.status(500);
            return;
        
        }
        const pessoa = result[0];
        pessoa.Stack = JSON.parse(pessoa.Stack);
        pessoa.Nascimento = pessoa.Nascimento.toISOString().split('T')[0];
        res.status(200).json(pessoa);
        
        })
        
        };

        showPessoasTermo(req, res) {
        
            const termo = req.query["t"]; // Captura o parâmetro de consulta 't'
            if(termo.length == 0)
            {
                res.status(400).send("BAD REQUEST");
                return;
            }
            
            const sql = 'SELECT * FROM pessoas WHERE Apelido LIKE ? OR Nome LIKE ? OR Stack LIKE ?'
            
            conect.query(sql,[`%${termo}%`, `%${termo}%`,`%${termo}%`] ,(error, result)=>{
                if(error)
                {
                    res.status(500).send("INTERNAL SERVER ERROR")
                    console.log(error)
                    return;
                
                }
                else if(result.length == 0){
                    res.status(200).send([]);
                    return;
                }
            
                
                const pessoa = result;
                pessoa.forEach((element) => {
                    // Ação a ser executada para cada elemento
                    element.Stack = JSON.parse(element.Stack);
                element.Nascimento = element.Nascimento.toISOString().split('T')[0];
                });
                
                
              
                res.status(201).send(pessoa);
            })
          
        }
        
    storePessoas(req,res){

        const {Apelido, Nome, Nascimento,Stack, id} = req.body;
    
          
        
        const sql = 'INSERT INTO pessoas (Apelido, Nome, Nascimento, Stack) VALUES (?,?,?,?)';
        const valores = [Apelido,Nome, Nascimento,JSON.stringify(Stack)];

        if (Apelido == null) {
            res.status(422).send("Apelido nao pode ser nulo.");
            return;
        } else if (Nome == null) {
            res.status(422).send("Nome nao pode ser nulo.");
            return;
        }else if (Nascimento == null)
        {
            res.status(422).send("Nascimento nao pode ser nulo");
            return;
        }
        else if(Apelido.trim() === "")
        {
            res.status(400).send("Atributo nome é obrigatorio");
            return;
        }else if (Nome.trim() === "")
        {
            res.status(400).send("Atributo Nome é obrigatorio");
            return;
        }
        else if(Nascimento.trim() === "")
        {
            res.status(400).send("Atributo Nascimento é obtigatorio");
            return;
        }
        
        conect.query(sql,valores,(error,result)=>{
        
        if(error){
            console.log(error);
            res.status(422).send("erro 422");
            return;
        }
        res.status(201).send("201")
        })
        };

        updatePessoas(req,res){
            const id = req.params.id;
            const sql = 'UPDATE pessoas SET Apelido = ?, Nome = ?, Nascimento = ?, Stack = ? WHERE id = ?';
            const {Apelido,Nome, Nascimento,Stack}= req.body;
            const valores = [Apelido, Nome, Nascimento, JSON.stringify(Stack), id];
            conect.query(sql,valores,(error, result)=>{
                if(error){
                    res.status(500).send("INTERNAL ERROR SERVER");
                    return;
                }

        if (Apelido == null) {
            res.status(422).send("Apelido nao pode ser nulo.");
            return;
        } else if (Nome == null) {
            res.status(422).send("Nome nao pode ser nulo.");
            return;
        }else if (Nascimento == null)
        {
            res.status(422).send("Nascimento nao pode ser nulo");
            return;
        }
        else if(Apelido.trim() === "")
        {
            res.status(422).send("Atributo nome é obrigatorio");
            return;
        }else if (Nome.trim() === "")
        {
            res.status(422).send("Atributo Nome é obrigatorio");
            return;
        }
        else if(Nascimento.trim() === "")
        {
            res.status(422).send("Atributo Nascimento é obtigatorio");
            return;
        }
                if(result.affectedRows === 0){
                    res.status(404).send("registro não encontrado");
                    return;
                }
                res.status(200).send("registro atualizado com sucesso")
                
            
            
            })
            
            }
    deletaPessoas
(req,res){
const id = req.params.id;
const sql ='DELETE FROM pessoas WHERE id =?'
conect.query(sql, id,(error,result)=>{
    if(error){
        res.status(500)
        return;
    }
    if(result.affectedRows == 0){
        res.status(400).send("BAD REQUEST")
        return;
    }
    res.status(202).send([]);
})
}


}
export default new pessoaControler();