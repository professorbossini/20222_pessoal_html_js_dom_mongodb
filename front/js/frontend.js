const protocolo = 'http://'
const baseURL = 'localhost:3000'
// não deve existir mais aqui
//const filmesEndpoint = '/filmes'
async function obterFilmes() {
  //existe aqui
  const filmesEndpoint = '/filmes'
  const URLCompleta = `${protocolo}${baseURL}${filmesEndpoint}`
  const filmes = (await axios.get(URLCompleta)).data
  let tabela = document.querySelector('.filmes')
  let corpoTabela = tabela.getElementsByTagName('tbody')[0]
  for (let filme of filmes) {
    //insertRow(0) para adicionar sempre na primeira linha
    //se quiser adicionar na última, chame insertRow sem argumentos
    let linha = corpoTabela.insertRow(0)
    let celulaTitulo = linha.insertCell(0)
    let celulaSinopse = linha.insertCell(1)
    celulaTitulo.innerHTML = filme.titulo
    celulaSinopse.innerHTML = filme.sinopse
  }
}

async function cadastrarFilme() {
  //aqui também
  const filmesEndpoint = '/filmes'
  const URLCompleta = `${protocolo}${baseURL}${filmesEndpoint}`
  let tituloInput = document.querySelector('#tituloInput')
  let sinopseInput = document.querySelector('#sinopseInput')
  let titulo = tituloInput.value
  let sinopse = sinopseInput.value
  // somente adiciona se o usuário tiver digitado os dois valores
  if (titulo && sinopse) {
    tituloInput.value = ""
    sinopseInput.value = ""
    const filmes = (await axios.post(URLCompleta, { titulo, sinopse })).data
    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    corpoTabela.innerHTML = ""
    for (let filme of filmes) {
      let linha = corpoTabela.insertRow(0)
      let celulaTitulo = linha.insertCell(0)
      let celulaSinopse = linha.insertCell(1)
      celulaTitulo.innerHTML = filme.titulo
      celulaSinopse.innerHTML = filme.sinopse
    }
    exibirAlerta('.alert-filme', 'Filme cadastrado com sucesso', ['show', 'alert-success'], ['d-none'], 2000)
  }
  //senão, exibe o alerta por pelo menos 2 segundos
  else {
    exibirAlerta('.alert-filme', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none'], 2000)
  }
}

async function cadastrarUsuario(){
  let usuarioCadastroInput = document.querySelector('#usuarioCadastroInput')
  let passwordCadastroInput = document.querySelector('#passwordCadastroInput')
  let usuarioCadastro = usuarioCadastroInput.value
  let passwordCadastro = passwordCadastroInput.value
  if (usuarioCadastro && passwordCadastro) {
    try{
    const cadastroEndpoint = '/signup'
    const URLCompleta = `${protocolo}${baseURL}${cadastroEndpoint}`
      await axios.post(URLCompleta, { login: usuarioCadastro, password: passwordCadastro })
      usuarioCadastroInput.value = ""
      passwordCadastroInput.value = ""
      exibirAlerta('.alert-modal-cadastro', "Usuário cadastrado com sucesso!", ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
      ocultarModal('#modalLogin', 2000)
    }
    catch(error){
      exibirAlerta('.alert-modal-cadastro', "Erro ao cadastrar usuário", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
      ocultarModal('#modalLogin', 2000)
    }
  }
  else{
    exibirAlerta('.alert-modal-cadastro', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
  }
}

//fora de qualquer outra função, pode ser no final, depois de todas
function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout){
  let alert = document.querySelector(seletor)
  alert.innerHTML = innerHTML
  //... é o spread operator
  //quando aplicado a um array, ele "desmembra" o array
  //depois disso, passamos os elementos do array como argumentos para add e remove
  alert.classList.add(...classesToAdd)
  alert.classList.remove(...classesToRemove)
  setTimeout(() => {
    alert.classList.remove('show')
    alert.classList.add('d-none')
  }, timeout)
}

//só para ver que é possível, vamos definir essa função como um arrow function
//esse construção é análoga a
//async function fazerLogin(){}
//há algumas diferenças, mas não vamos entrar em detalhes agora
const fazerLogin = async () => {
  let usuarioLoginInput = document.querySelector('#usuarioLoginInput')
  let passwordLoginInput = document.querySelector('#passwordLoginInput')
  let usuarioLogin = usuarioLoginInput.value
  let passwordLogin = passwordLoginInput.value
  if (usuarioLogin && passwordLogin) {
    try{
      const loginEndpoint = '/login'
      const URLCompleta = `${protocolo}${baseURL}${loginEndpoint}`
      //já já vamos fazer algo com a resposta (pegar o token)
      const response = await axios.post(URLCompleta, { login: usuarioLogin, password: passwordLogin })
      console.log(response.data)
      usuarioLoginInput.value = ""
      passwordLoginInput.value = ""
      exibirAlerta('.alert-modal-login', "Login efetuado com sucesso!", ['show', 'alert-success'], ['d-none', 'alert-danger'],2000)
      ocultarModal('#modalLogin', 2000)
      const loginLink = document.querySelector('#loginLink')
      loginLink.innerHTML = "Logout"
      const cadastrarFilmeButton = document.querySelector('#cadastrarFilmeButton')
      cadastrarFilmeButton.disabled = false
    }
    catch(error){
      console.log(error)
      //daqui a pouco fazemos o tratamento de coisas ruins, ou seja, especificamos o fluxo alternativo de execução
      exibirAlerta('.alert-modal-login', "Erro ao fazer login", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
    }
  }
  else{
    exibirAlerta('.alert-modal-login', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)    
  }
}

function ocultarModal(seletor, timeout){
  setTimeout(() => {
    let modal = bootstrap.Modal.getInstance(document.querySelector(seletor))
    modal.hide()
  }, timeout)
}

