import ui from "./ui.js";
import api from "./api.js";

function removerEspacos(string) {
    return string.replaceAll(/\s+/g, "")
}

const regexConteudo = /^[A-Za-z\s]{10,}$/
const regexAutoria = /^[A-za-z]{3,15}$/

function validarConteudo(conteudo) {
    return regexConteudo.test(conteudo)
}

function validarAutoria(autoria) {
    return regexAutoria.test(autoria)
}

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos()

    const btnCancelar = document.getElementById("botao-cancelar")
    const formularioPensamento = document.getElementById("pensamento-form")
    const inputBusca = document.getElementById("campo-busca")

    inputBusca.addEventListener("input", manipularBusca)
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario)
    btnCancelar.addEventListener("click", ui.limparForm)
})

async function manipularSubmissaoFormulario(event) {
    event.preventDefault()
    const id = document.getElementById("pensamento-id").value
    const autoria = document.getElementById("pensamento-autoria").value
    const conteudo = document.getElementById("pensamento-conteudo").value
    const data = document.getElementById("pensamento-data").value

    const conteudoSemEspacos = removerEspacos(conteudo)
    const autoriaSemEspacos = removerEspacos(autoria)

    if (!validarConteudo(conteudoSemEspacos)) {
        alert("Só são permitidas letras e espaços. Pensamentos devem ter no mínimo 10 caracteres!")
        return
    }

    if (!validarAutoria(autoriaSemEspacos)) {
        alert("Só é permitida a inclusão de letras na autoria. A autoria deve conter de 3 a 15 letras")
        return
    }

    if (!validarData(data)) {
        alert("Não é permitido o cadastro de datas futuras. Selecione outra data")
        return
    }

    try {
        if (id) {
            await api.editarPensamento({ id, conteudo, autoria, data })
        } else {
            await api.salvarPensamento({ conteudo, autoria, data })
        }
        ui.renderizarPensamentos()
    } catch (error) {
        alert("Erro ao salvar pensamento")
    }
}

async function manipularBusca() {
    const termoBusca = document.getElementById("campo-busca").value
    try {
        const pensamentosFiltrados = await api.buscarPensamentoPorTermo(termoBusca)
        ui.renderizarPensamentos(pensamentosFiltrados)
    } catch (error) {
        alert("Erro ao realizar busca")
    }
}

function validarData(data) {
    const dataAtual = new Date()
    const dataInserida = new Date(data)
    return dataInserida <= dataAtual
}
