class ExerciseCard extends HTMLElement {
  static get observedAttributes() { return ['title', 'description']; }

  connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    this.render();
  }

  attributeChangedCallback() { this.render(); }

  render() {
    if (!this.shadowRoot) return;
    const isSubdir = location.pathname.includes('/css/') || location.pathname.includes('/git/') || location.pathname.includes('/html/') || location.pathname.includes('/performance/');
    const prefix = isSubdir ? '../' : '';
    const title = this.getAttribute('title') || 'Ejercicio práctico';
    const description = this.getAttribute('description') || '';
    const hasProjected = (this.innerHTML || '').trim().length > 0;
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${prefix}assets/lecciones.css">
      <article class="exercise-card">
        <div class="exercise-header">${title}</div>
        <div class="exercise-content">
          ${hasProjected ? '<slot></slot>' : (description ? `<p class=\"exercise-description\">${description}</p>` : '')}
        </div>
      </article>
    `;
  }
}

customElements.define('exercise-card', ExerciseCard);


