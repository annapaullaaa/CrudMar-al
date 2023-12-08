import bancoDeDados from "../database/index.js";

class cachorroModel {
  async adicionar_cachorro(nome, idade, sexo, raca, cor, descricao) {
    const conn = await bancoDeDados.conectar();
    const sql =
      "INSERT INTO cachorros (nome, idade, sexo, raca, cor, descricao) VALUES ($1, $2, $3,$4, $5, $6)";
    return await conn.query(sql, [nome, idade, sexo, raca, cor, descricao]);
  }
  async get_cachorros(){
    const conn = await bancoDeDados.conectar();
    const sql =
      "SELECT * FROM cachorros";
    const cachorros = await conn.query(sql);
    return cachorros.rows
  }
  async get_cachorro_por_nome(nome){
    const conn = await bancoDeDados.conectar();
    const sql =
      "SELECT * FROM cachorros WHERE nome = ($1)";
    const cachorros = await conn.query(sql, [nome]);
    return cachorros.rows[0]
  }
  async deletecachorro(nome){
    const conn = await bancoDeDados.conectar();
    const sql = "DELETE FROM cachorros WHERE nome = ($1)"
    return await conn.query(sql, [nome])
  }
  async deletarAdocao(nomecachorro){
    const conn = await bancoDeDados.conectar();
    const sql = "DELETE FROM adocoes WHERE cachorro = ($1)"
    return await conn.query(sql, [nomecachorro])
  }
  async update(nomeAntigo, novoNome, idade, sexo, raca, cor, descricao){
    const conn = await bancoDeDados.conectar()
    const sql = "UPDATE cachorros SET nome = ($1), idade = ($2), sexo = ($3), raca = ($4), cor = ($5), descricao = ($6) WHERE nome = ($7)"
    return await conn.query(sql, [novoNome, idade, sexo, raca, cor, descricao, nomeAntigo])
  }
}

export default new cachorroModel();
