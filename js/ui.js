import api from "./api.js"

const ui = {

    async preencherForm(pensamentoId) {
        const pensamento = await api.buscarPensamentoPorId(pensamentoId)
        document.getElementById("pensamento-id").value = pensamento.id
        document.getElementById("pensamento-conteudo").value = pensamento.conteudo
        document.getElementById("pensamento-autoria").value = pensamento.autoria
        document.getElementById("pensamento-data").value = pensamento.data.toISOString().split("T")[0]
        document.getElementById("form-container").scrollIntoView()
    },

    async renderizarPensamentos(pensamentosFiltrados = null) {
        const mensagemVazia = document.getElementById("mensagem-vazia")
        const listaPensamentos = document.getElementById("lista-pensamentos")
        
        listaPensamentos.innerHTML = ""

        try {
            let pensamentosParaRenderizar

            if(pensamentosFiltrados){
                pensamentosParaRenderizar = pensamentosFiltrados
            } else {
                pensamentosParaRenderizar = await api.buscarPensamentos()
            }

            if (pensamentosParaRenderizar.length == 0) {
                mensagemVazia.style.display = "block"
            } else {
                mensagemVazia.style.display = "none"
                pensamentosParaRenderizar.forEach(ui.adicionarPensamentoNaLista)
            }
        } catch {
            alert("Erro ao renderizar pensamentos")
        }
    },

    adicionarPensamentoNaLista(pensamento) {
        const listaPensamentos = document.getElementById("lista-pensamentos")
        const li = document.createElement("li")
        li.setAttribute("data-id", pensamento.id)
        li.classList.add("li-pensamento")
        

        const iconeAspas = document.createElement("img")
        iconeAspas.src = "assets/imagens/aspas-azuis.png"
        iconeAspas.alt = "Aspas azuis"
        iconeAspas.classList.add("icone-aspas")

        const pensamentoConteudo = document.createElement("div")
        pensamentoConteudo.textContent = pensamento.conteudo
        pensamentoConteudo.classList.add("pensamento-conteudo")

        const pensamentoAutoria = document.createElement("div")
        pensamentoAutoria.textContent = pensamento.autoria
        pensamentoAutoria.classList.add("pensamento-autoria")

        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC"
        }

        const pensamentoData = document.createElement("div")
        const dataFormatada = pensamento.data.toLocaleDateString("pt-BR", options)
        pensamentoData.textContent = dataFormatada
        pensamentoData.classList.add("pensamento-data")

        const btnEditar = document.createElement("button")
        btnEditar.classList.add("botao-editar")
        btnEditar.onclick = () => ui.preencherForm(pensamento.id)

        const iconeEditar = document.createElement("img")
        iconeEditar.src = "assets/imagens/icone-editar.png"
        iconeEditar.alt = "Editar"
        btnEditar.appendChild(iconeEditar)

        const btnExcluir = document.createElement("button")
        btnExcluir.classList.add("botao-excluir")
        btnExcluir.onclick = async () => {
            try {
                await api.excluirPensamento(pensamento.id)
                ui.renderizarPensamentos()
            } catch (error) {
                alert("Erro ao excluir pensamento")
            }
        }

        const iconeExcluir = document.createElement("img")
        iconeExcluir.src = "assets/imagens/icone-excluir.png"
        iconeExcluir.alt = "Excluir"
        btnExcluir.appendChild(iconeExcluir)

        const btnFavorito = document.createElement("button")
        btnFavorito.classList.add("botao-favorito")
        btnFavorito.onclick = async () => {
            try {
                await api.atualizarFavorito(pensamento.id, !pensamento.favorito)
                ui.renderizarPensamentos()
            } catch (error) {
                alert("Erro ao atualizar pensamento")
            }
        }

        const iconeFavorito = document.createElement("img")
        iconeFavorito.src = pensamento.favorito ? 
        "assets/imagens/icone-favorito.png" : 
        "assets/imagens/icone-favorito_outline.png"
        iconeFavorito.alt = "icone de favorito"
        btnFavorito.appendChild(iconeFavorito)

        const icones = document.createElement("div")
        icones.classList.add("icones")
        icones.appendChild(btnFavorito)
        icones.appendChild(btnEditar)
        icones.appendChild(btnExcluir)

        li.appendChild(iconeAspas)
        li.appendChild(pensamentoConteudo)
        li.appendChild(pensamentoAutoria)
        li.appendChild(pensamentoData)

        li.appendChild(icones)
        listaPensamentos.appendChild(li)
    },

    limparForm() {
        document.getElementById("pensamento-form").reset()
        document.getElementById("pensamento-id").value = null
    }
}

export default ui;