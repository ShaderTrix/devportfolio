# Project media

Drop project images / gifs here, then reference them from src/config.ts:

  image: "/projects/your-file.gif"        # tile background + detail banner
  detailImage: "/projects/your-banner.jpg" # optional: detail banner only

Anything in /public is served from the site root, so a file at
public/projects/foo.gif is referenced as "/projects/foo.gif".

Recommended:
- Tiles read best at roughly 16:10 / landscape. ~800px wide is plenty.
- Keep gifs small (a few MB) so pages stay fast.
