# AGENTS.md

Personal website of Shivang, hosted on GitHub Pages at https://shivkr6.github.io.
Plain HTML, CSS and vanilla JS. No build step, no npm, no frameworks, no external libraries.

## Structure

```
index.html          Home: intro, links, Experience, Open Source
talks.html          List of talks
style.css           The only stylesheet
components.js       <site-header> and <site-footer> custom elements (nav: Home, Blog, Talks)
fonts/              Figtree font files (self-hosted, OFL licence)
images/             Favicon and images
images/oss/         Open source org logos
blog/
  index.html        Post list, rendered from posts.js
  posts.js          List of posts (const POSTS = [...])
  _template.html    Template for every post
  <slug>.html       One file per post
```

## Rules

- Keep it simple. Don't add dependencies, build tools, frameworks or new CSS/JS files unless asked.
- All paths are relative (`../style.css` from inside `blog/`). Never use root-absolute paths (`/style.css`).
- Shared header/footer changes go in `components.js` only, never in individual pages.
- Every page's `<head>` preloads `fonts/figtree-latin.woff2` (relative path) before `style.css`. Keep this when creating new pages.
- Light mode only. Colours live as CSS variables at the top of `style.css`.
- Don't add classes or inline styles to post content. Reuse the existing classes shown in the snippets below for other sections.
- Use semantic, accessible HTML: one `<h1>` per page, meaningful `alt` text, descriptive link text.
- Preserve the user's wording exactly in all content. Don't reword, fix grammar, shorten or add text unless asked. If something is unclear, ask rather than guess.

## Writing a blog post

When the user gives you text for a new post:

1. **Preserve the text exactly.** Change only the markup.
2. **Copy `blog/_template.html`** to `blog/<slug>.html`. The slug is lowercase, hyphenated and taken from the title, e.g. `my-first-post.html`.
3. **Replace the placeholders:**
   - `{{TITLE}}`: post title (appears twice)
   - `{{SUMMARY}}`: one sentence, under 160 characters, for `<meta name="description">` and the post list. This is the only text you may write yourself, unless the user provides one.
   - `{{DATE}}`: ISO date `YYYY-MM-DD` (use today's date unless the user gives one)
   - `{{DATE_READABLE}}`: e.g. `22 October 2026`
   - `{{CONTENT}}`: the post body, indented 6 spaces to match the template
4. **Use only these tags in `{{CONTENT}}`:**
   `<p>`, `<h2>`, `<h3>`, `<ul>`, `<ol>`, `<li>`, `<a href>`, `<strong>`, `<em>`, `<blockquote>`, `<pre><code>`, `<code>`, `<img src alt>`, `<hr>`.
   No classes, IDs, inline styles, `<div>`/`<span>` wrappers or `<script>`. Don't use `<h1>`; the template already has it.
   Escape `<`, `>` and `&` inside code (`&lt;`, `&gt;`, `&amp;`).
5. **Images** go in `images/` and are referenced as `../images/<file>`, with descriptive `alt` text.
6. **Add an entry at the top of `blog/posts.js`** (newest first):
   ```js
   {
     title: "My first post",
     date: "2026-10-22",
     url: "my-first-post.html",
     summary: "...",
   },
   ```
7. **Check before finishing:**
   - The words in the post match the user's text exactly.
   - No `{{...}}` placeholders are left.
   - The `posts.js` entry's `url` matches the filename, and the file is still valid JS.

### Editing an existing post

Change only what the user asks. Update the `posts.js` entry if the title or summary changes. Don't change the date unless asked.

## Adding experience

Add an entry to the Experience section in `index.html`, newest first:

```html
<article class="entry">
  <div class="entry-head">
    <h3>Role, Company</h3>
    <span class="meta">2024 – Present</span>
  </div>
  <p>One or two lines about what you did.</p>
</article>
```

Use an en dash (`–`) between dates.

## Adding an open source contribution

Each org is one `<article class="org">` in the Open Source section of `index.html`.

- **Logo:** save it as `images/oss/<org>.svg` or `.png` (square, at least 56×56px). Keep `alt=""`, since the org name next to it labels the link. Use `images/oss/placeholder.svg` if no logo is available.
- **PRs:** the first 2 PRs go in the visible `<ul class="prs">`. Every PR after that goes in the `<ul class="prs">` inside `<details>`. If an org has 2 or fewer PRs, leave out `<details>` entirely.
- **New PR for an existing org:** add it at the top of the visible list (newest first), then move the PR that's now third into the top of the `<details>` list. Create the `<details>` block if this is the org's third PR.
- No PR status (merged/open), no description under the org name.

```html
<article class="org">
  <h3 class="org-name">
    <a href="https://github.com/org">
      <img src="images/oss/org.svg" alt="" width="28" height="28">
      Org Name
    </a>
  </h3>
  <ul class="prs">
    <li><a href="https://github.com/org/repo/pull/123">PR title</a> <span class="meta">#123</span></li>
    <li><a href="https://github.com/org/repo/pull/100">PR title</a> <span class="meta">#100</span></li>
  </ul>
  <details>
    <summary>
      <span class="when-closed">Show more</span>
      <span class="when-open">Show less</span>
    </summary>
    <ul class="prs">
      <li><a href="https://github.com/org/repo/pull/90">PR title</a> <span class="meta">#90</span></li>
    </ul>
  </details>
</article>
```

## Adding a talk

Add an entry at the top of `<main>` in `talks.html` (below the `<h1>`), newest first:

```html
<article class="talk">
  <h2>Talk title</h2>
  <p class="meta">Event name · City · <time datetime="2026-03-12">12 March 2026</time></p>
  <p><a href="...">Slides</a> · <a href="...">Video</a> · <a href="...">Repo</a></p>
</article>
```

Include only the links that exist. If there are none, leave out the second `<p>`. For an online event, use `Online` instead of the city.
