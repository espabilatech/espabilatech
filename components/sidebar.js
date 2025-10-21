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
    // Normalizar rutas de enlaces según el nivel actual (raíz o subcarpeta)
      this.shadowRoot.querySelectorAll('.nav-link').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (!/^(?:https?:|mailto:|#|\/|\.\.\/)/.test(href)) {
        a.setAttribute('href', prefix + href);
      }
    });
    // Marcar como activo el enlace correspondiente a la página actual
    const links = this.shadowRoot.querySelectorAll('.nav-link');
    const current = window.location.pathname.split('/').pop();
    let activeDetails = null;
    links.forEach(link => {
      const linkFile = new URL(link.href, window.location.href).pathname.split('/').pop();
      if (linkFile === current) {
        link.classList.add('active');
        // Buscar el details padre y abrirlo
          const details = link.closest('details');
        if (details) {
          activeDetails = details;
        }
      }
    });
    // Cerrar todos los details y abrir solo el del módulo actual
    this.shadowRoot.querySelectorAll('.nav-group').forEach(d => d.removeAttribute('open'));
    if (activeDetails) activeDetails.setAttribute('open', '');

    // Completion indicator logic
    const COMPLETED_KEY = 'espabilatech-completed';
    function getCompleted() {
      try {
        return JSON.parse(localStorage.getItem(COMPLETED_KEY) || '{}');
      } catch { return {}; }
    }
    function setCompleted(obj) {
      localStorage.setItem(COMPLETED_KEY, JSON.stringify(obj));
    }
    const completed = getCompleted();
    this.shadowRoot.querySelectorAll('.nav-item').forEach(item => {
      const link = item.querySelector('.nav-link');
          document.body.classList.remove('sidebar-open');
      if (!link || !indicator) return;
      // Set state via class
      indicator.classList.toggle('completed', !!completed[link.href]);
      indicator.title = completed[link.href] ? 'Completado' : 'Marcar como completado';
      // Toggle on click
      indicator.addEventListener('click', e => {
        e.stopPropagation();
        completed[link.href] = !completed[link.href];
        setCompleted(completed);
        indicator.classList.toggle('completed', !!completed[link.href]);
        indicator.title = completed[link.href] ? 'Completado' : 'Marcar como completado';
      });
    });

    // Close mobile sidebar when clicking a nav link
    this.shadowRoot.querySelectorAll('.nav-link').forEach(a => {
      a.addEventListener('click', () => {
        // close on mobile/tablet to reveal content
        document.body.classList.remove('sidebar-open');
      });
    });

    // Sync body.sidebar-open with internal .open on <aside> (shadow DOM cannot style body directly)
    const aside = this.shadowRoot.querySelector('.sidebar');
    function setAsideOpen(open) {
      if (!aside) return;
      if (open) aside.classList.add('open'); else aside.classList.remove('open');
    }
    // Initial sync
    setAsideOpen(document.body.classList.contains('sidebar-open'));
    // Observe body class changes
    const bodyObserver = new MutationObserver(() => setAsideOpen(document.body.classList.contains('sidebar-open')));
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    // Cleanup when element removed
    const ro = new MutationObserver(records => {
      if (!document.body.contains(this)) {
        bodyObserver.disconnect();
        ro.disconnect();
      }
    });
    ro.observe(document.documentElement, { childList: true, subtree: true });
  }
}
customElements.define('side-bar', SideBar);
