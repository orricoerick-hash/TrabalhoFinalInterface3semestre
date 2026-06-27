class ConversorComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .box { font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9; }
                label { display: block; margin: 10px 0 5px; font-weight: bold; }
                select, button { width: 100%; padding: 10px; margin-top: 5px; border-radius: 5px; border: 1px solid #ccc; }
                button { background-color: #0d6efd; color: white; border: none; cursor: pointer; font-weight: bold; }
                button:hover { background-color: #0b5ed7; }
                .resultado { margin-top: 20px; padding: 15px; border-left: 5px solid #0d6efd; background: #e9ecef; display: none; }
                .erro { color: red; font-weight: bold; margin-top: 10px; display: none; }
                p { margin: 5px 0; }
            </style>
            
            <div class="box">
                <h3>Consulta de Cotação de Moedas</h3>
                <p><small>Esta página faz uma consulta em tempo real utilizando a AwesomeAPI para trazer os valores atualizados do mercado financeiro.</small></p>
                
                <form id="coinForm">
                    <label for="moeda">Selecione a moeda que deseja consultar:</label>
                    <select id="moeda">
                        <option value="USD-BRL">Dólar Americano (USD) para Real</option>
                        <option value="EUR-BRL">Euro (EUR) para Real</option>
                        <option value="BTC-BRL">Bitcoin (BTC) para Real</option>
                    </select>
                    <button type="button" id="btnConsultar">Consultar Valor Atual</button>
                </form>

                <div id="msgErro" class="erro"></div>

                <div id="containerResultado" class="resultado">
                    <h4>Resultado da API:</h4>
                    <p><strong>Moeda:</strong> <span id="resNome"></span></p>
                    <p><strong>Valor de Compra:</strong> R$ <span id="resValor"></span></p>
                    <p><strong>Máxima do Dia:</strong> R$ <span id="resMaxima"></span></p>
                    <p><strong>Última Atualização:</strong> <span id="resData"></span></p>
                </div>
            </div>
        `;
        this.configurarEventos();
    }

    configurarEventos() {
        this.shadowRoot.querySelector("#btnConsultar").addEventListener("click", () => this.buscarCotacao());
    }

    async buscarCotacao() {
        const moeda = this.shadowRoot.querySelector("#moeda").value;
        const container = this.shadowRoot.querySelector("#containerResultado");
        const msgErro = this.shadowRoot.querySelector("#msgErro");

        container.style.display = "none";
        msgErro.style.display = "none";

        // Proteção try/catch exigida pelo trabalho
        try {
            const resposta = await fetch(`https://economia.awesomeapi.com.br/last/${moeda}`);
            
            if (!resposta.ok) {
                throw new Error("Não foi possível obter os dados da API.");
            }

            const dados = await resposta.json();
            const chave = moeda.replace("-", ""); 
            const info = dados[chave];

            this.shadowRoot.querySelector("#resNome").textContent = info.name;
            this.shadowRoot.querySelector("#resValor").textContent = parseFloat(info.bid).toFixed(2);
            this.shadowRoot.querySelector("#resMaxima").textContent = parseFloat(info.high).toFixed(2);
            this.shadowRoot.querySelector("#resData").textContent = info.create_date;

            container.style.display = "block";
        } catch (erro) {
            msgErro.textContent = `Erro: ${erro.message}. Verifique sua conexão ou tente novamente mais tarde.`;
            msgErro.style.display = "block";
        }
    }
}
customElements.define("my-conversor", ConversorComponent);