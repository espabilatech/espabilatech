const codeBlockCSS = `
  .code-block-container {
    border-radius: 8px;
    background: #222;
    color: #f8f8f2;
    font-family: 'Fira Mono', 'Consolas', monospace;
    margin: 1.5em 0;
    box-shadow: 0 2px 8px #0002;
  }
  .code-header {
    background: #111;
    color: #ffcc00;
    padding: 0.5em 1em;
    border-radius: 8px 8px 0 0;
    font-size: 0.95em;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .copy-btn {
    background: #444;
    color: #ffcc00;
    border: none;
    border-radius: 4px;
    padding: 0.2em 0.7em;
    cursor: pointer;
    font-size: 0.9em;
    margin-left: 1em;
  }
  .tabs {
    display: flex;
    background: #191919;
    border-radius: 0 0 0 0;
  }
  .tab {
    flex: 1;
    padding: 0.5em 1em;
    cursor: pointer;
    background: #191919;
    color: #ffcc00;
    border: none;
    font-weight: bold;
    font-size: 1em;
    border-bottom: 2px solid transparent;
    transition: border 0.2s;
  }
  .tab.active {
    background: #222;
    border-bottom: 2px solid #ffcc00;
  }
  .tab-content {
    display: none;
  }
  .tab-content.active {
    display: block;
  }
  pre {
    margin: 0;
    padding: 1em;
    overflow-x: auto;
    background: #222;
    border-radius: 0 0 8px 8px;
  }
  .result-container {
    background: #fff;
    color: #222;
    border-radius: 0 0 8px 8px;
    padding: 1em;
    min-height: 2em;
  }
  iframe.demo {
    width: 100%;
    min-height: 120px;
    border: none;
    border-radius: 0 0 8px 8px;
    background: #fff;
  }
`;
let codeBlockSheet = null;
if ('adoptedStyleSheets' in Document.prototype) {
  codeBlockSheet = new CSSStyleSheet();
  codeBlockSheet.replaceSync(codeBlockCSS);
}

class CodeBlock extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'language', 'code', 'show-result', 'no-result'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || '';
    const language = (this.getAttribute('language') || '').toLowerCase();
    const code = this.getAttribute('code') || '';
    // Determine if result tab should be shown
    let showResult = true;
    if (this.hasAttribute('no-result')) {
      showResult = false;
    } else if (this.hasAttribute('show-result')) {
      const val = this.getAttribute('show-result');
      if (val === 'false' || val === '0' || val === 'no') showResult = false;
    }
    // Usar adoptedStyleSheets si está disponible
    if (codeBlockSheet && 'adoptedStyleSheets' in this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [codeBlockSheet];
      this.shadowRoot.innerHTML = `
        <div class="code-block-container">
          <div class="code-header">
            <span>${title}${language ? ' (' + language + ')' : ''}</span>
            <button class="copy-btn">Copiar</button>
          </div>
          ${showResult ? `
          <div class="tabs">
            <button class="tab tab-code active">Código</button>
            <button class="tab tab-result">Resultado</button>
          </div>
          <div class="tab-content tab-content-code active">
            <pre><code></code></pre>
          </div>
          <div class="tab-content tab-content-result">
            <div class="result-container"></div>
          </div>
          ` : `
          <div class="tab-content tab-content-code active no-tabs">
            <pre><code></code></pre>
          </div>
          `}
        </div>
      `;
    } else {
      // Fallback: style inline (para navegadores antiguos)
      this.shadowRoot.innerHTML = `
        <style>${codeBlockCSS}</style>
        <div class="code-block-container">
          <div class="code-header">
            <span>${title}${language ? ' (' + language + ')' : ''}</span>
            <button class="copy-btn">Copiar</button>
          </div>
          ${showResult ? `
          <div class="tabs">
            <button class="tab tab-code active">Código</button>
            <button class="tab tab-result">Resultado</button>
          </div>
          <div class="tab-content tab-content-code active">
            <pre><code></code></pre>
          </div>
          <div class="tab-content tab-content-result">
            <div class="result-container"></div>
          </div>
          ` : `
          <div class="tab-content tab-content-code active no-tabs">
            <pre><code></code></pre>
          </div>
          `}
        </div>
      `;
    }
    // Set code as textContent to avoid HTML interpretation
    this.shadowRoot.querySelector('code').textContent = code;
    // Render result if present
    let resultContainer = null;
    if (showResult) {
      resultContainer = this.shadowRoot.querySelector('.result-container');
      if (language === 'html') {
        resultContainer.innerHTML = code.replace(/\n/g, '\n');
      } else if (language === 'html+css') {
        // Espera que el code tiene una sección <style> o /* CSS */ y HTML
        let html = code;
        let css = '';
        // Extraer CSS si está entre <style>...</style>
        const styleMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
        if (styleMatch) {
          css = styleMatch[1];
          html = code.replace(styleMatch[0], '');
        } else {
          // O buscar /* CSS */ ...
          const cssCommentMatch = code.match(/\/\*\s*CSS\s*\*\/(.*)/is);
          if (cssCommentMatch) {
            css = cssCommentMatch[1];
            html = code.replace(/\/\*\s*CSS\s*\*\/[\s\S]*/, '');
          }
        }
        // Crear el contenido del iframe
        const doc = `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}</body></html>`;
        const iframe = document.createElement('iframe');
        iframe.className = 'demo';
        iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
        resultContainer.innerHTML = '';
        resultContainer.appendChild(iframe);
        // Escribir el contenido en el iframe
        setTimeout(() => {
          iframe.contentWindow.document.open();
          iframe.contentWindow.document.write(doc);
          iframe.contentWindow.document.close();
        }, 10);
      } else {
        resultContainer.textContent = code;
      }
    }
    // Tab switching logic
    const tabCode = this.shadowRoot.querySelector('.tab-code');
    const contentCode = this.shadowRoot.querySelector('.tab-content-code');
    let tabResult = null, contentResult = null;
    if (showResult) {
      tabResult = this.shadowRoot.querySelector('.tab-result');
      contentResult = this.shadowRoot.querySelector('.tab-content-result');
    }
    tabCode.onclick = () => {
      tabCode.classList.add('active');
      if (showResult && tabResult && contentResult) {
        tabResult.classList.remove('active');
        contentResult.classList.remove('active');
      }
      contentCode.classList.add('active');
    };
    if (showResult && tabResult && contentResult) {
      tabResult.onclick = () => {
        tabResult.classList.add('active');
        tabCode.classList.remove('active');
        contentResult.classList.add('active');
        contentCode.classList.remove('active');
      };
    }
    // Copy button
    this.shadowRoot.querySelector('.copy-btn').onclick = () => {
      navigator.clipboard.writeText(code);
      this.shadowRoot.querySelector('.copy-btn').textContent = '¡Copiado!';
      setTimeout(() => {
        this.shadowRoot.querySelector('.copy-btn').textContent = 'Copiar';
      }, 1200);
    };
  }
}
customElements.define('code-block', CodeBlock);
