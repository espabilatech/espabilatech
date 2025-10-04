class SideBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <aside class="sidebar">
        <div class="sidebar-header">
          <h2 class="sidebar-title">Retros de Programación</h2>
        </div>
        <nav class="sidebar-nav">
          <div class="nav-group">
            <h3 class="nav-group-title">Introducción</h3>
            <ul class="nav-items">
              <li class="nav-item">
                <a href="curso-html.html" class="nav-link">¿Qué son los retros?</a>
              </li>
            </ul>
          </div>
          <div class="nav-group">
            <h3 class="nav-group-title">Fundamentos</h3>
            <ul class="nav-items">
              <li class="nav-item"><a href="dia01.html" class="nav-link">¿Qué es HTML?</a></li>
              <li class="nav-item"><a href="dia02.html" class="nav-link">Etiquetas básicas</a></li>
              <li class="nav-item"><a href="dia03.html" class="nav-link">Enlaces y SEO</a></li>
              <li class="nav-item"><a href="dia04.html" class="nav-link">Imágenes y multimedia</a></li>
              <li class="nav-item"><a href="dia05.html" class="nav-link">Listas y organización</a></li>
              <li class="nav-item"><a href="dia06.html" class="nav-link">Formularios</a></li>
              <li class="nav-item"><a href="dia07.html" class="nav-link">Tablas</a></li>
              <li class="nav-item"><a href="dia08.html" class="nav-link">CSS básico</a></li>
              <li class="nav-item"><a href="dia09.html" class="nav-link">Semántica y accesibilidad</a></li>
              <li class="nav-item"><a href="dia10.html" class="nav-link">Proyecto final</a></li>
              <li class="nav-item"><a href="dia11.html" class="nav-link">Git y GitHub</a></li>
            </ul>
          </div>
        </nav>
      </aside>
    `;
    // Marcar como activo el enlace correspondiente a la página actual
    const links = this.querySelectorAll('.nav-link');
    const current = window.location.pathname.split('/').pop();
    links.forEach(link => {
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });
  }
}
customElements.define('side-bar', SideBar);
