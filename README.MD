INSTRUÇAO DE USO:
 
 A api deve ser inicializada utilizando a porta 3000
 caso deseje mudar a porta basta atualizar a variavel de ambiente 'PORT'
 no arquivo .env

 para inicializar o serviço use o comando node Conexao.js 

A api sempre recebe um json no seguinte formato:

{
    "Apelido": "apelido",
    "Nome": "nome",
    "Nascimento": "data",
    "Stack": ["elementos da stack"]  
    }

    a api foi criada utilizando:

    node.js na versao 18.19.1
    dotenv na versão 16.4.5 
    express na versão 4.19.2
    mysql na versao 2.18.1

ROTAS DISPONIVEIS 

ROTA DE POST

'/pessoas'

exemplo : "http://localhost:3000/pessoas"

ROTA DE GET POR ID

'/pessoas/:id'

exemplo "http://localhost:3000/pessoas/2"

ROTA DE GET POR TERMO ESPECIFICO

'pessoas?t=TERMO'

exemplo "http://localhost:3000/pessoas?t=Node"

//ROTA DE PUT

'/pessoas/:id'

exeplo http://localhost:3000/pessoas/2

ROTA DE DELETE

'/pessoas/:id'

exemplo "http://localhost:3000/pessoas/2"

De ultima hora resolvi integrar a API com um front end, ficou bem simples mas acho que pode acrescentar um pouco 
a este projeto, criei outro repositório para isso e aqui esta o link caso queira ver https://github.com/Ubiratandev/api_integrada_front.





