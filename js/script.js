const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const nomeFuncionario = document.querySelector('#nomeFuncionario')
const funcaoFuncionario = document.querySelector('#funcaoFuncionario')
const salarioFuncionario = document.querySelector('#salarioFuncionario')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

email = ['admin@gmail.com'];
senha = ['123456'];

function mudaTela(){
  telaAlteraSenha = document.getElementById("telaAlteraSenha");
  telaIndex = document.getElementById("telaIndex");
  if(telaAlteraSenha){
    window.location.href = "index.html";
  }
  else if(telaIndex){
    
  }
}

function alterarSenha(){
  const emailNovo = document.getElementById("emailAlterado").value;
  const senhaNova = document.getElementById("senhaAlterada").value;
  
  console.log(emailNovo, senhaNova);
  if(emailNovo != '' && senhaNova != ''){
    email.push(emailNovo);
    senha.push(senhaNova);
  }
  else{
    alert('Preencha todos os campos!');
  }
}


function login(){
  const inputEmail = document.getElementById("email").value;
  const inputSenha = document.getElementById("senha").value;

  console.log(email, senha);
  for(i = 0; i < email.length; i++){
    if(email[i] == inputEmail && senha[i] == inputSenha){
      window.location.href = "cadastroFuncionarios.html";
      break;
    }
    else{
      alert('Email e/ou Senha Inválidos');
      break;
    }
  }
}

function cadastrar(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    nomeFuncionario.value = itens[index].nome
    funcaoFuncionario.value = itens[index].funcao
    salarioFuncionario.value = itens[index].salario
    id = index
  } else {
    nomeFuncionario.value = ''
    funcaoFuncionario.value = ''
    salarioFuncionario.value = ''
  }
  
}


function editItem(index) {

  cadastrar(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (nomeFuncionario.value == '' || funcaoFuncionario.value == '' || salarioFuncionario.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = nomeFuncionario.value
    itens[id].funcao = funcaoFuncionario.value
    itens[id].salario = salarioFuncionario.value
  } else {
    itens.push({'nome': nomeFuncionario.value, 'funcao': funcaoFuncionario.value, 'salario': salarioFuncionario.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()