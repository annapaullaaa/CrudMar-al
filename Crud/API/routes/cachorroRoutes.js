import { Router } from "express";
import cachorroController from "../controllers/cachorroController.js";

const routes = new Router()

routes
    .post('/addcachorro', cachorroController.addcachorro)
    .get('/cachorros', cachorroController.getcachorros)
    .get('/meuscachorrosAdotados/:email', cachorroController.getSeucachorrosAdotados)
    .delete('/deletarcachorro', cachorroController.excluircachorro)
    .delete('/deletarAdocao', cachorroController.deletarAdocao)
    .put('/atualizarcachorro', cachorroController.editarcachorro)
export default routes