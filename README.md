# shivkr6.github.io

Personal website. Plain HTML, CSS and a little vanilla JS. No build step.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Publish

1. Push to `main` in the `shivkr6.github.io` repo.
2. In the repo on GitHub, go to **Settings → Pages**, set **Source** to "Deploy from a branch", and pick `main` / `(root)`.
3. The site goes live at https://shivkr6.github.io.

`.nojekyll` tells GitHub Pages to serve the files as they are, without running Jekyll.

## Adding content

See [AGENTS.md](AGENTS.md) for how to add blog posts, talks, experience and open source contributions. Point your LLM at that file, or paste it into the chat along with your text.

For a new blog post, check that the LLM kept your words exactly before publishing.
