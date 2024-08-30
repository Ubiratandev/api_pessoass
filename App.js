import express from "express";
import pessoa_controler from "./Pessoas_controler.js"

const App=express();
App.use(express.json());



//ROTA POST
App.post('/pessoas',pessoa_controler.storePessoas);

//rota get com id
App.get('/pessoas/:id',pessoa_controler.showPessoas)

//rota get com termo especifico
App.get('/pessoas', pessoa_controler.showPessoasTermo);

//ROTA DE PUT

App.put('/pessoas/:id',pessoa_controler.updatePessoas)


App.delete('/pessoas/:id',pessoa_controler.deletaPessoas)

export default App;