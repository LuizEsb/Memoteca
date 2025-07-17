import ui from "./ui.js";
import api from "./api.js";
const btnCancelar = document.getElementById("botao-cancelar")
const formularioPensamento = document.getElementById("pensamento-form")

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos()

    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario)
    
    btnCancelar.addEventListener("click", ui.limparForm)
})

async function manipularSubmissaoFormulario(event) {
    event.preventDefault()
    const id = document.getElementById("pensamento-id").value
    const autoria = document.getElementById("pensamento-autoria").value
    const conteudo = document.getElementById("pensamento-conteudo").value

    try {
        await api.salvarPensamento({ conteudo, autoria })
        ui.renderizarPensamentos()
    } catch (error) {
        alert("Erro ao salvar pensamento")
    }
}


