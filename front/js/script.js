const protocolo = 'http://'
const baseURL = 'localhost:3000'
const filmesEndpoint = '/filmes'
async function obterFilmes() {
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
  }
  //senão, exibe o alerta por até 2 segundos
  else {
    let alert = document.querySelector('.alert')
    alert.classList.add('show')
    alert.classList.remove('d-none')
    setTimeout(() => {
      alert.classList.remove('show')
      alert.classList.add('d-none')
    }, 2000)
  }
}

