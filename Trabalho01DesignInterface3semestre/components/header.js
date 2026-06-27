class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <h1>Trabalhos de Interface Web
        <h1>Editor de Cartões</h1>
        <h1>Prova Online</h1>
        <h1>Conversor API</h1>
        <h1>Painel Multi-API</h1>
      </header>
    `;
  }
}
customElements.define("my-header", HeaderComponent);