class NavComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav>
        <a href="index.html">Apresentação</a> |
        <a href="editor.html">Edidor</a> |
        <a href="prova.html">Prova Online</a> |
        <a href="conversor.html">Conversor API</a> |
        <a href="multiplas-apis.html">Painel Multi-API</a>

      </nav>
    `;
  }
}
customElements.define("my-nav", NavComponent);