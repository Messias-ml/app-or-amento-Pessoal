
class Bd {

constructor() {
	let id = localStorage.getItem('id')// ele vai pegar o valor dentro da chave id no localStorage
	if (id === null) {//se o valor a ser recebido for null quer dizer que não existe id la dentro do localStorage.
		localStorage.setItem('id', 0)
	}
}

getProximoId(){
	let proximoId = localStorage.getItem('id')
	return parseInt(proximoId) + 1
}
	gravar(captura) {
		let id = this.getProximoId()//aqui pegamos o valor do return e passamos para a variavel id
		//o this serve para acessarmos o metodos contido no bd que é uma class
	localStorage.setItem(id, JSON.stringify(captura))
	localStorage.setItem('id', id)// ou seja, na chave id também será dinamico, a cada item colocado
	// será adicionado +1 na chave id.
	
    }
recarregarDespesas(){
	let id = localStorage.getItem('id') //acessei a chave id, e atribui o valor da chave a variavel ID, ou seja, atribui
	//quantos itens tem na aplicação, pq os id vai aumentando de acordo com os itens inseridos..
	let despesas = []
	 for (var i = 1; i <= id; i++) {
		let despesa = JSON.parse(localStorage.getItem(i))//passei para objeto literal e tirei da string,
		//a cada item vai (1,2,3,4) vai ser adicionado a despesa.
		
		if (despesa === null) {continue}//ou seja, se eu excluir algum item, ele vai repetir o laço.
			//continue serve para ele repetir o laço novamente. ou seja, não entrará despesa em despesas.
		despesa.id = i
		console.log(despesa)
		despesas.push(despesa)// passo o valor de despesa do laço de repetição para despesa.

	 }
return despesas

}

pesquisar(despesa){
let despesas = despesa
let despesasFiltradas = this.recarregarDespesas()//peguei as despesas inseridas no localStorage
console.log(despesasFiltradas)
//ano
if (despesas.ano != '') {
 despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesas.ano)//ja que o filter não atua sobre o objeto
 //em questão, temos que atribui a ele o valor atualizado.
}

//mes
if (despesas.mes != '') {
 despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesas.mes)//eu estou atribuindo a despesa filtrada, somente
 //as despesas que se enquadrarão na pesquisa.
 }

//dia
if (despesas.dia != '') {
 despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesas.dia)
 }
//tipo
if (despesas.tipo != '') {
 despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesas.tipo)
 }
// descrição
if (despesas.descrição != '') {
 despesasFiltradas = despesasFiltradas.filter(d => d.descrição == despesas.descrição)
 }
//valor
if (despesas.valor != '') {
 despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesas.valor)
 }
 return despesasFiltradas

}

remover(id){
	localStorage.removeItem(id)

}
}
let bd = new Bd()
function cadastroDespesa(){
let ano = document.getElementById('ano')
let mes = document.getElementById('mes')
let dia = document.getElementById('dia')
let tipo = document.getElementById('tipo')
let descricao = document.getElementById('descricao')
let valor = document.getElementById('valor')
let captura = {
	ano: ano.value,
	mes: mes.value,
	dia: dia.value,
	tipo: tipo.value,
	descricao: descricao.value,
	valor: valor.value,
	validarDados() {
		for (let i in this) {// vou absorver os indices de this
			if (this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
	}

if (captura.validarDados()) {
	bd.gravar(captura)
	$('#registroModal').modal('show')
	document.getElementById('titulo').innerHTML = 'Registro inserido'
	document.getElementById('texto').innerHTML = 'Despesa foi cadastrado com sucesso.'
	document.getElementById('corClass').className = 'modal-header text-success'
	document.getElementById('botao').className = 'btn btn-success'

ano.value = 'ano'
mes.value = 'mes'
dia.value = ''
tipo.value = ''
descricao.value = ''
valor.value = ''

}else 
	{
	$('#registroModal').modal('show')
	document.getElementById('titulo').innerHTML = 'Favor preencher todos os campos'
	document.getElementById('texto').innerHTML = 'Há campos que ainda não foram preenchidos, favor preencher.'
	document.getElementById('corClass').className = 'modal-header text-danger'
	document.getElementById('botao').className = 'btn btn-danger'
	}
}
//função que vai ser carregada no body de consulta.html, com a intenção de inserir os valores dentro de consulta.html
function carregarListaDespesa(despesas = [], filtro = false){//aqui eu pus filtro == false para caso eu não filtre nada apareça
	//a lista, recarrega as despesas, porem se for verdadeiro eu não recarrego as despesas. 
	if (despesas.length == 0 && filtro == false) {
	despesas = bd.recarregarDespesas()//criei despesas como array e atribui a ele o retorno do metodo recarregarDespesas
}
let valorTotal = 0
let linhaTabela = document.getElementById('tabela')
linhaTabela.innerHTML = ''
despesas.forEach(function(des){
// criando a linha tr da tabela.
let linha = linhaTabela.insertRow()
//criando a coluna da tabela td. vou criar 4 pois so tem 4 na tabela. 
linha.insertCell().innerHTML = `${des.dia}/${des.mes}/${des.ano}`
	switch(des.tipo){
		case '1': des.tipo = 'Alimentação'
			break
		case '2': des.tipo = 'Educação'
			break
		case '3': des.tipo = 'Lazer'
			break
		case '4': des.tipo = 'Saúde'
			break
		case '5': des.tipo = 'Transporte'
			break
		
	}
linha.insertCell().innerHTML = des.tipo
linha.insertCell().innerHTML = des.descricao
linha.insertCell().innerHTML = des.valor
let btn = document.createElement("button")
btn.className = 'btn btn-danger'
btn.innerHTML = '<i class="fas fa-times"></i>'
btn.id = `id_despesas_${des.id}`
btn.onclick = function(){
	let id = this.id.replace('id_despesas_', '')

	bd.remover(id)
	window.location.reload()
}
linha.insertCell().append(btn)
valorTotal += parseFloat(des.valor)
})
let stringValor = `<hr> O valor total da sua despesa é: <input type="text" class="form-control" placeholder="${valorTotal.toFixed(2)}"  disabled="disabled">`
document.getElementById('valorTotal').innerHTML = stringValor
}

function pesquisarDespesas(){
	
let despesa = {
	ano: ano.value,
	mes: mes.value,
	dia: dia.value,
	tipo: tipo.value,
	descricao: descricao.value,
	valor: valor.value,}
despesas = bd.pesquisar(despesa)
carregarListaDespesa(despesas, true)// passei como parametro o true para caso eu passe algum filtro existente ele apague os outros,
//e me mostre o filtro que solicitei apenas.
}
