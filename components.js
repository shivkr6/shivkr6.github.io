// Shared header and footer, used on every page as <site-header> and <site-footer>.
// Load with a plain (non-deferred) <script> in <head> so the header renders without a flash.
(function () {
  // Site root = the folder containing this file. Makes nav links work at any depth,
  // from disk (file://) and on GitHub Pages.
  const ROOT = new URL(".", document.currentScript.src);

  const NAV = [
    { label: "Home", href: "index.html" },
    { label: "Blog", href: "blog/index.html" },
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

      const links = NAV.map(({ label, href }) => {
        const url = new URL(href, ROOT);
        const target = clean(url);
        let current = "";
        if (target === here) {
          current = ' aria-current="page"';
        } else if (href !== "index.html" && here.startsWith(target)) {
          // e.g. a blog post highlights "Blog"
          current = ' aria-current="true"';
        }
        return `<a href="${url.href}"${current}>${label}</a>`;
      }).join("");

      this.innerHTML = `
        <a class="skip-link" href="#main">Skip to content</a>
        <header class="site-header">
          <a class="site-name" href="${new URL("index.html", ROOT).href}">Shivang</a>
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

  // Open external links in a new tab across all pages (including JS-rendered lists).
  document.addEventListener("DOMContentLoaded", () => {
    for (const a of document.querySelectorAll('a[href^="http://"], a[href^="https://"]')) {
      if (a.origin !== location.origin) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
    }
  });
})();
