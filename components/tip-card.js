class TipCard extends HTMLElement {
  static get observedAttributes() { return ['title']; }

  connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    this.render();
  }

  attributeChangedCallback() { this.render(); }

  render() {
    if (!this.shadowRoot) return;
    const isSubdir = location.pathname.includes('/css/') || location.pathname.includes('/git/') || location.pathname.includes('/html/') || location.pathname.includes('/performance/');
    const prefix = isSubdir ? '../' : '';
    const title = this.getAttribute('title') || 'Consejo';
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${prefix}assets/lecciones.css">
      <article class="card consejo">
        <h3 class="card-title">${title}</h3>
        <div class="card-content"><slot></slot></div>
      </article>
    `;
  }
}

customElements.define('tip-card', TipCard);


