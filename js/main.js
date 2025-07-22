import ui from "./ui.js";
import api from "./api.js";


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

    try {
        if (id) {
            await api.editarPensamento({ id, conteudo, autoria })
        } else {
            await api.salvarPensamento({ conteudo, autoria })
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
