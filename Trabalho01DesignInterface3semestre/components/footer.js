class FooterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <p>© 2026 - Trabalho JS</p>
        <p>Acadêmico Erick Freitas Orrico</p>
        <p>Disciplina Design de Interação - 2026 - IFRS</p>
      </footer>
    `;
  }
}
customElements.define("my-footer", FooterComponent);