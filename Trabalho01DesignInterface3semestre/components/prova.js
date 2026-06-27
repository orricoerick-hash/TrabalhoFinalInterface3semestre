// 1. Inicializa a variável vazia. Ela será preenchida pelos dados obtidos via FETCH
let questoes = []; 

// 🔹 COMPONENTE
class ProvaComponent extends HTMLElement { 

  constructor() { 
    super(); 
    this.attachShadow({ mode: "open" }); 
  }

  // Método automático do Web Component.
  // Ele agora foi transformado em 'async' para esperar o carregamento do arquivo JSON antes de desenhar a tela
  async connectedCallback() {
    await this.carregarQuestoes(); // Busca os dados do JSON
    this.render();                 // Desenha o componente na tela
  }

  // 2. FUNÇÃO FETCH: Acessa o arquivo JSON e joga os dados na variável
  async carregarQuestoes() {
    try {
      // Faz a requisição para o arquivo JSON local
      const resposta = await fetch("questoes.json"); 
      
      // Converte a resposta recebida em um Array JavaScript válido
      questoes = await resposta.json(); 
    } catch (erro) {
      console.error("Erro ao carregar o arquivo JSON das questões:", erro);
    }
  }

  render() {  
    this.shadowRoot.innerHTML = ` 
      <style>
        .container {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: auto;
        }
        .questao {
          margin-bottom: 15px;
        }
        button {
          margin-top: 10px;
          padding: 10px;
          cursor: pointer;
        }
      </style>

      <div class="container">
        <h2>Prova Online</h2>
        <form id="form"></form> 
        <button id="corrigir">Corrigir</button>
        <button id="refazer">Refazer</button>
        <div id="resultado"></div>
      </div>
    `;

    this.mostrarQuestoes();
    this.eventos();
  }

  mostrarQuestoes() {
    const form = this.shadowRoot.querySelector("#form"); 

    questoes.forEach((q, i) => {  
      const div = document.createElement("div"); 
      div.classList.add("questao"); 

      let html = `<p><strong>${i + 1}. ${q.pergunta}</strong></p>`;  

      q.alternativas.forEach((alt, j) => { 
        html += `
          <label>
            <input type="radio" name="q${i}" value="${j}">  
            ${alt}
          </label><br>
        `;
      });   

      div.innerHTML = html; 
      form.appendChild(div); 
    });
  }

  eventos() {
    this.shadowRoot.querySelector("#corrigir")
      .addEventListener("click", () => {  

        let nota = 0; 
        let resultado = "";

        questoes.forEach((q, i) => {
          const resp = this.shadowRoot.querySelector(
            `input[name="q${i}"]:checked`
          );

          const valor = resp ? Number(resp.value) : -1;  

          if (valor === q.correta) nota++;  
          
          resultado += `  
            <p>
              ${q.pergunta}<br>
              Sua resposta: <span style="color: ${valor === q.correta ? 'green' : 'red'}">${q.alternativas[valor] || "Nenhuma"}</span><br>
              Correta: <span style="color: green">${q.alternativas[q.correta]}</span>
            </p>
          `;
        });

        resultado = `<h3>Nota: ${nota} de ${questoes.length}</h3>` + resultado;
        this.shadowRoot.querySelector("#resultado").innerHTML = resultado;
      });

    this.shadowRoot.querySelector("#refazer") 
      .addEventListener("click", () => {
        this.shadowRoot.querySelector("#form").innerHTML = "";
        this.shadowRoot.querySelector("#resultado").innerHTML = "";
        this.mostrarQuestoes(); 
      });
  }
}

customElements.define("my-prova", ProvaComponent);