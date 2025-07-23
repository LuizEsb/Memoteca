const URL_BASE = "http://localhost:3000"

const api = {
    async buscarPensamentos() {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos`) // axios.get no lugar do fetch
            return await response.json() // response.data se fosse axios
        } catch (error) {
            alert("Erro ao buscar pensamentos")
            throw error
        }
    },

    async salvarPensamento(pensamento) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos`, { // await axios.post(`${URL_BASE}/pensamentos`, pensamento) não precisaria informar headers ou body
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            })
            return await response.json() // response.data se fosse axios
        } catch (error) {
            alert("Erro ao salvar pensamento")
            throw error
        }
    },

    async buscarPensamentoPorId(id) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${id}`) // axios.get no lugar do fetch
            return await response.json() // response.data
        } catch (error) {
            alert("Erro ao buscar pensamento")
            throw error
        }
    },

    async editarPensamento(pensamento) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${pensamento.id}`, { // axios.put(`${URL_BASE}/pensamentos/${pensamento.id}`, pensamento) não precisaria informar headers ou body 
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            })
            return await response.json() //response.data
        } catch (error) {
            alert("Erro ao editar pensamento")
            throw error
        }
    },

    async excluirPensamento(id) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${id}`, { // axios.delete(`${URL_BASE}/pensamentos/${pensamento.id}`) sem declarar o method
                method: "DELETE",
            })
        } catch (error) {
            alert("Erro ao excluir pensamento")
            throw error
        }
    },

    async buscarPensamentoPorTermo(termo) {
        try {
            const pensamentos = await this.buscarPensamentos()
        const termoEmMinusculas = termo.toLowerCase()

        const pensamentosFiltrados = pensamentos.filter(pensamento => {
            return (pensamento.conteudo.toLowerCase().includes(termoEmMinusculas) || pensamento.autoria.toLowerCase().includes(termoEmMinusculas))  
        })
        return pensamentosFiltrados
        } catch (error) {
            alert("Erro ao filtrar pensamentos")
            throw error
        }
        
    },

    async atualizarFavorito(id, favorito) {
        try {
            const response = await axios.patch(`${URL_BASE}/pensamentos/${id}`, { favorito })
            return response.data
        } catch (error) {
            alert("Erro ao atualizar favorito")
            throw error
        }
    }
}

export default api;