// Shared header and footer, used on every page as <site-header> and <site-footer>.
// Load with a plain (non-deferred) <script> in <head> so the header renders without a flash.
(function () {
  // Site root = the folder containing this file. Makes nav links work at any depth,
  // from disk (file://) and on GitHub Pages.
  const ROOT = new URL(".", document.currentScript.src);

  const IS_FILE = location.protocol === "file:";
  const HOME_URL = new URL(IS_FILE ? "index.html" : "./", ROOT);

  const NAV = [
    { label: "Home", href: IS_FILE ? "index.html" : "./", home: true },
    { label: "Blog", href: IS_FILE ? "blog/index.html" : "blog/" },
    { label: "Talks", href: "talks.html" },
  ];

  // Normalise a URL so ".../blog/" and ".../blog/index.html" compare equal.
  const clean = (url) => {
    const u = new URL(url, location.href);
    return (u.origin + u.pathname).replace(/index\.html$/, "");
  };

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      const here = clean(location.href);

      const links = NAV.map(({ label, href, home }) => {
        const url = new URL(href, ROOT);
        const target = clean(url);
        let current = "";
        if (target === here) {
          current = ' aria-current="page"';
        } else if (!home && here.startsWith(target)) {
          // e.g. a blog post highlights "Blog"
          current = ' aria-current="true"';
        }
        return `<a href="${url.href}"${current}>${label}</a>`;
      }).join("");

      this.innerHTML = `
        <a class="skip-link" href="#main">Skip to content</a>
        <header class="site-header">
          <a class="site-name" href="${HOME_URL.href}">Shivang</a>
          <nav aria-label="Main">${links}</nav>
        </header>`;
    }
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <footer class="site-footer">
          <p>&copy; ${new Date().getFullYear()} Shivang</p>
        </footer>`;
    }
  }

  customElements.define("site-header", SiteHeader);
  customElements.define("site-footer", SiteFooter);

  // Open external links in a new tab and drop trailing index.html on HTTP(S).
  document.addEventListener("DOMContentLoaded", () => {
    for (const a of document.querySelectorAll("a[href]")) {
      if ((a.protocol === "http:" || a.protocol === "https:") && a.origin !== location.origin) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      } else if (!IS_FILE && a.origin === location.origin && a.pathname.endsWith("/index.html")) {
        a.pathname = a.pathname.slice(0, -"index.html".length);
      }
    }
  });
})();
