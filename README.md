# Paradigm Shift Ventures

Static GitHub Pages site for the Paradigm Shift Ventures holding company.

## Structure

- `index.html` contains the page shell and Tailwind CDN setup.
- `assets/css/styles.css` contains custom visual behavior and small reusable styles.
- `assets/js/app.js` loads data, renders page sections, and handles the theme toggle.
- `assets/favicons/` contains generated favicon and touch-icon assets.
- `data/site.json` contains brand, navigation, page copy, and subsidiaries.

## Add A Subsidiary

Edit `data/site.json` and add a new object to the `subsidiaries` array:

```json
{
  "brandCode": "PSV",
  "name": "PSV Example Company",
  "description": "Short description of the operating company.",
  "status": "Planned subsidiary",
  "url": "https://example.com/",
  "cta": "Open subsidiary"
}
```

Leave `url` empty when a subsidiary profile is not published yet.

## GitHub Pages

No build step is required. Publish the repository root through GitHub Pages. The current public URL is:

`https://ahmed-elmaghalawy.github.io/ParadigmShiftVentures/`
