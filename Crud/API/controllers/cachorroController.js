import cachorroModel from "../models/cachorroModel.js";
import userModel from "../models/userModel.js";

class cachorroController {
  async addcachorro(req, res) {
    const { nome, idade, sexo, raca, cor, descricao } = req.body;
    try {
        await cachorroModel.adicionar_cachorro(nome, idade, sexo, raca, cor, descricao)
        res.status(200).send({mensagem: "cachorro adicionado"})
    } catch (error) {
      res.status(500).send({ mensagem: `Erro ao adicionar um cachorro - ${error}` });
    }
  }
  async getcachorros(req, res){
    try{
      const cachorros = await cachorroModel.get_cachorros()
      res.status(200).send(cachorros)
    }catch(error){
      res.status(404).send({mensagem: `Erro ao listar cachorros - ${error}`})
    }
  }
  async getSeucachorrosAdotados(req, res){
    const email = req.params.email
    console.log("seuscachorros")
    try{
      const adocoes = await userModel.getAdocoes(email)
      if(adocoes.length == 0){
        return res.status(500).send({mensagem: "Você não adotou nenhum cachorro"})
      }
      const listacachorros = []
      for(let adocao of adocoes){
        const dadosDocachorro = await cachorroModel.get_cachorro_por_nome(adocao.cachorro)
        listacachorros.push(dadosDocachorro)
      }
      
      return res.status(200).send(listacachorros)
    }catch(error){
      return res.status(500).send({mensagem: `Erro ao buscar seus cachorros adotados - ${error}`})
    }
  }
  async excluircachorro(req, res){
    const {nomecachorro} = req.body
    console.log(nomecachorro)
    try{
      await cachorroModel.deletecachorro(nomecachorro)
      res.status(200).send({mensagem: "cachorro excluido"})
    }catch(error){
      res.status(404).send({mensagem: `Erro ao deletar cachorro - ${error}`})
    }
  }
  async deletarAdocao(req, res){
    const {nomecachorro} = req.body
    try{
      await cachorroModel.deletarAdocao(nomecachorro)
      res.status(200).send({mensagem: "adocao excluida"})
    }catch(error){
      res.status(404).send({mensagem: `Erro ao deletar adocao - ${error}`})
    }
  }
  async editarcachorro( req, res){
    const {nomeAntigo, novoNome, idade, sexo, raca, cor, descricao} = req.body
    try{
      await cachorroModel.update(nomeAntigo, novoNome, idade, sexo, raca, cor, descricao)
      return res.status(200).send({mensagem: "cachorro atualizado com sucesso!"})
    }catch(error){
      res.status(500).send({mensagem: `Erro ao atualizar cachorro - ${error}`})
    }
  }
}

export default new cachorroController()