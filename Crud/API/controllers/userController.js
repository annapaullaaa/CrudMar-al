import cachorroModel from "../models/cachorroModel.js";
import userModel from "../models/userModel.js";

class userController {
  async show(req, res) {
    try {
      const users = await userModel.show();
      return res.status(200).send(users);
    } catch (error) {
      return res
        .status(500)
        .send({ mensagem: `Erro ao listar usuários - ${error}` });
    }
  }
  async create(req, res) {
    const { email, senha } = req.body;
    try {
      const user = await userModel.createUser(email, senha);
      return res.status(200).send(user);
    } catch (error) {
      return res
        .status(500)
        .send({ mensagem: `Erro ao criar usuário - ${error}` });
    }
  }
  async remove(req, res) {
    const email = req.params.email;
    //const user = await userModel.find(email)
    //if (!user)
    //return res.status(404).send({ mensagem: "Usuário não encontrado" });
    await userModel.remove(email);
    res.status(200).send({ mensagem: "Usuário deletado" });
  }
  async adotar(req, res){
    const {nomecachorro, emailDono} = req.body
    console.log(nomecachorro, emailDono)
    try{
      await userModel.fazerAdocao(nomecachorro, emailDono)
      res.status(200).send({mensagem: `cachorro ${nomecachorro} adotado!`})
    }catch(error){
      res.status(500).send({mensagem: `Erro ao adotar - ${error}`})
    }
  }
}

export default new userController();
