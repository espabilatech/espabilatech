class SideBar extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const isSubdir = location.pathname.includes('/css/') || location.pathname.includes('/git/') || location.pathname.includes('/html/') || location.pathname.includes('/performance/');
    const prefix = isSubdir ? '../' : '';
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${prefix}assets/sidebar.css">
      <link rel="stylesheet" href="${prefix}assets/lecciones.css">
      <aside class="sidebar">
        <div class="sidebar-header">
          <h2 class="sidebar-title">Curso HTML y CSS</h2>
        </div>
        <nav class="sidebar-nav">
          <details class="nav-group">
            <summary class="nav-group-title">Primeros pasos<span class="chevron"></span></summary>
            <ul class="nav-items">
              <li class="nav-item"><span class="completion-indicator"></span><a href="curso-html.html" class="nav-link">¿Qué son los retros?</a></li>
            </ul>
          </details>
          <details class="nav-group">
            <summary class="nav-group-title">Fundamentos de la Web<span class="chevron"></span></summary>
            <ul class="nav-items">
              <li class="nav-item"><span class="completion-indicator"></span><a href="git/git-github-html.html" class="nav-link">¿Qué es Git y GitHub?</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="html/introduccion-html.html" class="nav-link">¿Qué es HTML?</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="html/estructura-etiquetas-html.html" class="nav-link">Estructura básica y etiquetas</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="css/css-basico-html.html" class="nav-link">CSS básico</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="html/enlaces-seo-html.html" class="nav-link">Enlaces y SEO</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="html/imagenes-multimedia-html.html" class="nav-link">Imágenes y multimedia</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="html/listas-organizacion-html.html" class="nav-link">Listas y organización</a></li>
            </ul>
          </details>
          <details class="nav-group">
            <summary class="nav-group-title">Formularios y datos<span class="chevron"></span></summary>
            <ul class="nav-items">
              <li class="nav-item"><span class="completion-indicator"></span><a href="html/formularios-html.html" class="nav-link">Formularios</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="html/tablas-html.html" class="nav-link">Tablas</a></li>
            </ul>
          </details>
          <details class="nav-group">
            <summary class="nav-group-title">CSS desde cero<span class="chevron"></span></summary>
            <ul class="nav-items">
              <li class="nav-item"><span class="completion-indicator"></span><a href="css/css-avanzado-selectores-especificidad.html" class="nav-link">CSS avanzado: selectores y especificidad</a></li>
            </ul>
          </details>
          <details class="nav-group">
            <summary class="nav-group-title">Extras y Juegos<span class="chevron"></span></summary>
            <ul class="nav-items">
              <li class="nav-item"><span class="completion-indicator"></span><a href="css/juego-css.html" class="nav-link">Juego: Propiedades CSS</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="html/juego-html-bloque-inline.html" class="nav-link">Juego: Bloque vs Inline</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="recursos.html" class="nav-link">Recursos y comunidad</a></li>
            </ul>
          </details>
        </nav>
      </aside>
    `;
    this.shadowRoot.querySelectorAll('.nav-link').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (!/^(?:https?:|mailto:|#|\/|\.\.\/)/.test(href)) {
        a.setAttribute('href', prefix + href);
      }
    });
    const links = this.shadowRoot.querySelectorAll('.nav-link');
    const current = window.location.pathname.split('/').pop();
    let activeDetails = null;
    links.forEach(link => {
      const linkFile = new URL(link.href, window.location.href).pathname.split('/').pop();
      if (linkFile === current) {
        link.classList.add('active');
        const details = link.closest('details');
        if (details) activeDetails = details;
      }
    });
    this.shadowRoot.querySelectorAll('.nav-group').forEach(d => d.removeAttribute('open'));
    if (activeDetails) activeDetails.setAttribute('open', '');
    const COMPLETED_KEY = 'espabilatech-completed';
    function getCompleted() {
      try { return JSON.parse(localStorage.getItem(COMPLETED_KEY) || '{}'); } catch { return {}; }
    }
    function setCompleted(obj) { localStorage.setItem(COMPLETED_KEY, JSON.stringify(obj)); }
    const completed = getCompleted();
    this.shadowRoot.querySelectorAll('.nav-item').forEach(item => {
      const link = item.querySelector('.nav-link');
      const indicator = item.querySelector('.completion-indicator');
      if (!link || !indicator) return;
      indicator.classList.toggle('completed', !!completed[link.href]);
      indicator.title = completed[link.href] ? 'Completado' : 'Marcar como completado';
      indicator.addEventListener('click', e => {
        e.stopPropagation();
        completed[link.href] = !completed[link.href];
        setCompleted(completed);
        indicator.classList.toggle('completed', !!completed[link.href]);
        indicator.title = completed[link.href] ? 'Completado' : 'Marcar como completado';
      });
    });
    this.shadowRoot.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', () => document.body.classList.remove('sidebar-open')));
    const aside = this.shadowRoot.querySelector('.sidebar');
    function setAsideOpen(open) { if (!aside) return; if (open) aside.classList.add('open'); else aside.classList.remove('open'); }
    setAsideOpen(document.body.classList.contains('sidebar-open'));
    const bodyObserver = new MutationObserver(() => setAsideOpen(document.body.classList.contains('sidebar-open')));
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    const ro = new MutationObserver(records => { if (!document.body.contains(this)) { bodyObserver.disconnect(); ro.disconnect(); } });
    ro.observe(document.documentElement, { childList: true, subtree: true });
  }
}
customElements.define('side-bar', SideBar);
