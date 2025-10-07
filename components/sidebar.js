class SideBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <aside class="sidebar">
        <div class="sidebar-header">
          <h2 class="sidebar-title">Retros de Programación</h2>
        </div>
        <nav class="sidebar-nav">
          <details class="nav-group">
            <summary class="nav-group-title">Primeros pasos<span class="chevron"></span></summary>
            <ul class="nav-items">
              <li class="nav-item"><span class="completion-indicator"></span><a href="curso-html.html" class="nav-link">¿Qué son los retros?</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="primeros-pasos.html" class="nav-link">¿Cómo usar este curso?</a></li>
            </ul>
          </details>
          <details class="nav-group">
            <summary class="nav-group-title">Control de versiones<span class="chevron"></span></summary>
            <ul class="nav-items">
              <li class="nav-item"><span class="completion-indicator"></span><a href="git-github-html.html" class="nav-link">¿Qué es Git y GitHub?</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="git-init-clone.html" class="nav-link">Crear y clonar repositorios</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="git-status-add-commit.html" class="nav-link">Status, add y commit</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="git-remote-push-pull.html" class="nav-link">Remote, push y pull</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="git-fetch.html" class="nav-link">Fetch</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="git-branch-merge.html" class="nav-link">Branch, checkout y merge</a></li>
            </ul>
          </details>
          <details class="nav-group">
            <summary class="nav-group-title">Fundamentos de la Web<span class="chevron"></span></summary>
            <ul class="nav-items">
              <li class="nav-item"><span class="completion-indicator"></span><a href="introduccion-html.html" class="nav-link">¿Qué es HTML?</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="estructura-etiquetas-html.html" class="nav-link">Estructura básica y etiquetas</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="listas-organizacion-html.html" class="nav-link">Listas y organización</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="enlaces-seo-html.html" class="nav-link">Enlaces y SEO</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="imagenes-multimedia-html.html" class="nav-link">Imágenes y multimedia</a></li>
            </ul>
          </details>
          <details class="nav-group">
            <summary class="nav-group-title">Rendimiento y métricas<span class="chevron"></span></summary>
            <ul class="nav-items">
              <li class="nav-item"><span class="completion-indicator"></span><a href="rendimiento-html.html" class="nav-link">Visión general de rendimiento</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="dom-cssom-render.html" class="nav-link">DOM, CSSOM y renderizado</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="layers-compositing.html" class="nav-link">Layers y compositing</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="web-metrics.html" class="nav-link">Métricas web y LCP</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="pitfalls-rendimiento.html" class="nav-link">Errores comunes de rendimiento</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="optimizacion-estilos-scripts.html" class="nav-link">Optimización de estilos y scripts</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="css-costoso.html" class="nav-link">Cambios CSS más costosos</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="ejercicio-medir-lcp.html" class="nav-link">Ejercicio: medir LCP</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="ejercicio-dom-reflow.html" class="nav-link">Ejercicio: DOM y reflow</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="ejercicio-layers.html" class="nav-link">Ejercicio: layers y animaciones</a></li>
            </ul>
          </details>
          <details class="nav-group">
            <summary class="nav-group-title">Formularios y datos<span class="chevron"></span></summary>
            <ul class="nav-items">
              <li class="nav-item"><span class="completion-indicator"></span><a href="formularios-html.html" class="nav-link">Formularios</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="tablas-html.html" class="nav-link">Tablas</a></li>
            </ul>
          </details>
          <details class="nav-group">
            <summary class="nav-group-title">CSS desde cero<span class="chevron"></span></summary>
            <ul class="nav-items">
              <li class="nav-item"><span class="completion-indicator"></span><a href="css-basico-html.html" class="nav-link">CSS básico</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="css-avanzado-selectores-especificidad.html" class="nav-link">CSS avanzado: selectores y especificidad</a></li>
            </ul>
          </details>
          <details class="nav-group">
            <summary class="nav-group-title">Accesibilidad y buenas prácticas<span class="chevron"></span></summary>
            <ul class="nav-items">
              <li class="nav-item"><span class="completion-indicator"></span><a href="semantica-accesibilidad-html.html" class="nav-link">Semántica y accesibilidad</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="buenas-practicas.html" class="nav-link">Buenas prácticas de código</a></li>
            </ul>
          </details>
          <details class="nav-group">
            <summary class="nav-group-title">Proyecto guiado<span class="chevron"></span></summary>
            <ul class="nav-items">
              <li class="nav-item"><span class="completion-indicator"></span><a href="proyecto-final-html.html" class="nav-link">Tu primera web personal</a></li>
            </ul>
          </details>
          <details class="nav-group">
            <summary class="nav-group-title">Extras y Juegos<span class="chevron"></span></summary>
            <ul class="nav-items">
              <li class="nav-item"><span class="completion-indicator"></span><a href="juego-css.html" class="nav-link">Juego: Propiedades CSS</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="juego-html-bloque-inline.html" class="nav-link">Juego: Bloque vs Inline</a></li>
              <li class="nav-item"><span class="completion-indicator"></span><a href="recursos.html" class="nav-link">Recursos y comunidad</a></li>
            </ul>
          </details>
        </nav>
      </aside>
    `;
    // Marcar como activo el enlace correspondiente a la página actual
    const links = this.querySelectorAll('.nav-link');
    const current = window.location.pathname.split('/').pop();
    let activeDetails = null;
    links.forEach(link => {
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
        // Buscar el details padre y abrirlo
        const details = link.closest('details');
        if (details) {
          activeDetails = details;
        }
      }
    });
    // Cerrar todos los details y abrir solo el del módulo actual
    this.querySelectorAll('.nav-group').forEach(d => d.removeAttribute('open'));
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
    this.querySelectorAll('.nav-item').forEach(item => {
      const link = item.querySelector('.nav-link');
      const indicator = item.querySelector('.completion-indicator');
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
  }
}
customElements.define('side-bar', SideBar);
