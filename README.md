# Scentry website

A plain HTML, CSS, and JavaScript site. No installs, no build step.

## The three things you will ever do

1. **Change words, links, numbers:** open `content.js` and edit. It is the only text file you need.
2. **Add photos:** drop image files into the `photos` folder using the names below.
3. **Publish:** upload the folder to GitHub Pages (steps below).

To preview on your computer, double-click `index.html`.

## First edits to make

Open `content.js` and look for lines marked CONFIRM. They are my best guesses about the product, the four progress steps, and the FAQ answers. Fix anything that is not true yet.

Then fill in `brand`:
- `email`: a contact email (use a team or program address, not a student's personal one). Leave `""` to hide it.
- `surveyUrl`: link to your Google Form survey. Leave `""` to hide the button.
- `incubator`: already set to Incubator EDU. Add their web address in `url` to link it.

When you have real survey results, add them under `discovery.stats` and `discovery.quotes`. Do not publish numbers you have not collected.

## Photos

Names are lowercase. JPG, PNG, JPEG, and WEBP all work.

| Where it shows | File |
| --- | --- |
| Product or prototype photo | `photos/product.jpg` |
| A team member | `photos/team/<name>.jpg`, for example `photos/team/alex.jpg` (lowercase, spaces become dashes) |

`photos/brand-banner.png` is the camo logo image you sent. It is not shown on the site; it is kept here for link previews or social posts.

## About students' names and photos

Only publish a student's name or photo with a parent's OK. First names only is common. The team section stays hidden-ready: leave `members: []` and set `settings.showPlaceholders` to `false`, and the section disappears.

## Editing rules for content.js

- Text goes inside "quote marks". Keep the comma at the end of each line.
- A quote mark inside text needs a backslash first: `\"like this\"`.
- Lines starting with `//` are notes. The site ignores them.
- A red "content.js has a problem" box means a comma, quote, or bracket went missing. Undo your last edit.
- Set `settings.showPlaceholders` to `false` before you share the link, so dashed "add a photo" boxes disappear.

## Publishing on GitHub Pages

1. Make a new **Public** repository, for example `scentry`.
2. Click Add file, then Upload files, and drag in everything inside this folder (not the folder itself). Commit.
3. Settings, then Pages. Source: Deploy from a branch. Branch: `main`, folder `/ (root)`. Save.
4. After a minute the site is live at `https://<account>.github.io/scentry/`.

One GitHub account can only have one site named `<account>.github.io`. If you already use that name for another site, give this one its own repository name as above.

To let others edit, go to Settings, then Collaborators. Anyone you add can open `content.js` on github.com, click the pencil, edit, and commit. Every change is saved, so mistakes are easy to undo.

## Files

- `content.js`: all text (edit this)
- `photos/`: images (add to this)
- `index.html`, `styles.css`, `script.js`, `camo.svg`: the site itself
- `fonts/`: fonts hosted with the site
- `404.html`: page for a bad link
