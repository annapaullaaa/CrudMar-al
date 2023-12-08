exibircachorros();
  async function addcachorro(){
    var nome = document.getElementById("nome").value;
    var sexo = document.getElementById("sexo").value;
    var idade = document.getElementById("idade").value;
    var raca = document.getElementById("raca").value;
    var cor = document.getElementById("cor").value;
    var decricao = document.getElementById("descricao").value;

    var cachorro = {
      nome: nome,
      sexo: sexo,
      idade: idade,
      raca: raca,
      cor: cor,
      descricao: decricao
    };
    try{
      const r = await fetch('http://localhost:3000/addcachorro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cachorro)
      })
    }catch(error) {
      alert(error.mensagem);
    };

    document.getElementById("nome").value = "";
    document.getElementById("sexo").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("raca").value = "";
    document.getElementById("cor").value = "";
    document.getElementById("descricao").value = "";

    exibircachorros()
    
    const m = document.querySelector("#modal1");
    const modal = bootstrap.Modal.getInstance(m);
    modal.hide();
  }
  async function exibircachorros() {
    try{
      var r = await fetch('http://localhost:3000/cachorros')
      const cachorros = await r.json();
      const caixa = document.querySelector('div.container');
      caixa.innerHTML="";
      cachorros.forEach(cachorro => {
        if(cachorro.adotado == false){
          caixa.innerHTML += `
            <div class="card mb-3" style="width: 18rem;">
              <div class="card-body  d-flex flex-column">
                <h5 class="card-title">${cachorro.nome}</h5>
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Idade
                    <span class="badge bg-primary rounded-pill">${cachorro.idade}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Sexo
                    <span class="badge bg-primary rounded-pill">${cachorro.sexo}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Raça
                    <span class="badge bg-primary rounded-pill">${cachorro.raca}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Cor
                    <span class="badge bg-primary rounded-pill">${cachorro.cor}</span>
                  </li>
                  <li class="list-group-item d-flex flex-column justify-content-between align-items-center">
                    <strong>Descrição:</strong><br>
                    <p>${cachorro.descricao}</p>
                  </li>
                </ul>
                <button type="button" class="btn btn-secondary mb-2 mt-2" onclick="adotar('${cachorro.nome}')">Adote</button>
                <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal2" onclick="editarcachorro('${cachorro.nome}')">Edite</button>
              </div>
            </div>
            `
        }
      })
      if(caixa.innerHTML == ""){
        caixa.innerHTML = "<h1>Não há cachorros para adotar, adicione</h1>"
      }
    }catch(error) {
      alert(error.mensagem);
    }
  }
  async function adotar(nomecachorro) {
    const token = localStorage.getItem('token')
    const emailDono = (JSON.parse(atob(token.split(".")[1]))).email
    try{
      const resp = await fetch('http://localhost:3000/adotarcachorro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({nomecachorro, emailDono})
      })
      const mensagem = await resp.json()
      alert(mensagem.mensagem)
      exibircachorros();
    }catch(error){
      alert(error.mensagem)
    }
  }
  async function editarcachorro(nomecachorro) {
    let nomeAntigo;
    try{
      const res = await fetch('http://localhost:3000/cachorros')
      var listacachorros = await res.json();
      
      for(let i = 0; i < listacachorros.length; i++){
        if(listacachorros[i].nome == nomecachorro){
          nomeAntigo = listacachorros[i].nome
          const nome = document.querySelector('input#nomee').value = listacachorros[i].nome
          const raca = document.querySelector('input#racaa').value = listacachorros[i].raca
          const cor =  document.querySelector('input#corr').value = listacachorros[i].cor
          const idade = document.querySelector('input#idadee').value = listacachorros[i].idade
          const sexo = document.querySelector('input#sexoo').value = listacachorros[i].sexo
          const descricao = document.getElementById("descricaoo").value = listacachorros[i].descricao
          break
        }
      }
    }catch(error){
      console.log(error.mensagem)
    }

    const botaoEnviar = document.querySelector('button#botaoEnviar');
    botaoEnviar.addEventListener('click', async ()=>{
      try {
        var nome = document.getElementById("nomee").value;
        var raca = document.getElementById("racaa").value;
        var cor = document.getElementById("corr").value;
        var idade = document.getElementById("idadee").value;
        var sexo = document.getElementById("sexoo").value;
        var descricao = document.getElementById("descricaoo").value;

        var cachorroEditado = {
          nomeAntigo: nomeAntigo,
          novoNome: nome,
          raca: raca,
          cor: cor,
          idade: idade,
          sexo: sexo,
          descricao: descricao
        };

        var response = await fetch(`http://localhost:3000/atualizarcachorro`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cachorroEditado)
        });
        const mensagem = await response.json()
        alert(mensagem.mensagem)
        location.reload()
      } catch (error) {
        console.error(error.mensagem);
      }
    })
    exibircachorros()
    const m = document.querySelector("#modal2");
    const modal = bootstrap.Modal.getInstance(m);
    modal.hide();
  }
  async function logout(){
    localStorage.clear()
    window.location.href = '../login.html';
  }
  
