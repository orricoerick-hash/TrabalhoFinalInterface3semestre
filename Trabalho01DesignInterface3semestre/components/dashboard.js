class DashboardComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        this.carregarDadosMultiplos();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .grid { font-family: Arial, sans-serif; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
                .card { border: 1px solid #ccc; border-radius: 8px; padding: 15px; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                .card h3 { color: #0d6efd; margin-top: 0; }
                .badge { background: #198754; color: white; padding: 5px 10px; border-radius: 4px; font-size: 12px; }
                .loading { font-style: italic; color: #555; }
                .erro-box { color: red; font-weight: bold; }
            </style>
            
            <h2>Painel Informativo Combinado</h2>
            <p>Esta página carrega dados de 3 fontes globais de informação simultaneamente usando <code>Promise.all</code>.</p>
            <hr>
            
            <div id="painel" class="grid">
                <div class="card" id="api1"><p class="loading">Carregando dados do país...</p></div>
                <div class="card" id="api2"><p class="loading">Carregando notícias do espaço...</p></div>
                <div class="card" id="api3"><p class="loading">Carregando dados de teste corporativo...</p></div>
            </div>
        `;
    }

    async carregarDadosMultiplos() {
        const c1 = this.shadowRoot.querySelector("#api1");
        const c2 = this.shadowRoot.querySelector("#api2");
        const c3 = this.shadowRoot.querySelector("#api3");

        // 3 Endpoints extremamente confiáveis e que não bloqueiam CORS:
        // 1. Open-Meteo (Previsão do tempo pública - Sem autenticação)
        // 2. HTTPBin (Retorna dados de teste estáveis)
        // 3. JSONPlaceholder (Post fictício corporativo)
        const urlTempo = "https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&current_weather=true";
        const urlTeste = "https://httpbin.org/get";
        const urlPost = "https://jsonplaceholder.typicode.com/posts/1";

        try {
            // Executa as 3 requisições simultaneamente usando Promise.all (Requisito do trabalho)
            const [resTempo, resTeste, resPost] = await Promise.all([
                fetch(urlTempo).then(r => { if(!r.ok) throw new Error("Erro no Tempo"); return r.json(); }),
                fetch(urlTeste).then(r => { if(!r.ok) throw new Error("Erro no Teste"); return r.json(); }),
                fetch(urlPost).then(r => { if(!r.ok) throw new Error("Erro no Post"); return r.json(); })
            ]);

            // 1. Renderizando API 1 - Open-Meteo
            c1.innerHTML = `
    <div class="card h-100 border-0 shadow-sm">
        <div class="card-body text-center">
            <div class="fs-1 mb-2">🌤️</div>
            <h3 class="card-title h5 text-dark">Previsão do Tempo</h3>
            <hr class="border-secondary opacity-25">
            <p class="card-text"><strong>Temperatura:</strong> ${resTempo.current_weather.temperature}°C</p>
            <p class="card-text text-muted small">Velocidade do vento: ${resTempo.current_weather.windspeed} km/h</p>
            <span class="badge bg-success mt-2">Fonte: Open-Meteo API</span>
        </div>
    </div>
`;

c2.innerHTML = `
    <div class="card h-100 border-0 shadow-sm">
        <div class="card-body text-center">
            <div class="fs-1 mb-2">🔌</div>
            <h3 class="card-title h5 text-dark">Diagnóstico de Rede</h3>
            <hr class="border-secondary opacity-25">
            <p class="card-text"><strong>Seu IP de Origem:</strong></p>
            <p class="font-monospace text-primary bg-light py-1 rounded small">${resTeste.origin}</p>
            <span class="badge bg-success mt-2">Fonte: HTTPBin Org</span>
        </div>
    </div>
`;

c3.innerHTML = `
    <div class="card h-100 border-0 shadow-sm">
        <div class="card-body text-center">
            <div class="fs-1 mb-2">📋</div>
            <h3 class="card-title h5 text-dark">Post Corporativo</h3>
            <hr class="border-secondary opacity-25">
            <p class="card-text fw-bold text-truncate">${resPost.title}</p>
            <p class="card-text text-muted small">${resPost.body.substring(0, 70)}...</p>
            <span class="badge bg-success mt-2">Fonte: JSONPlaceholder</span>
        </div>
    </div>
`;

        } catch (erro) {
            // Se houver qualquer falha, exibe no console para sabermos o que foi
            console.error("Detalhes da falha na sincronização:", erro);

            const erroHTML = `<p style="color: red; font-weight: bold;">⚠️ Ops! Falha ao sincronizar as informações do painel. Verifique a sua ligação à internet.</p>`;
            c1.innerHTML = erroHTML;
            c2.innerHTML = erroHTML;
            c3.innerHTML = erroHTML;
        }
    }

}

customElements.define("my-dashboard", DashboardComponent);