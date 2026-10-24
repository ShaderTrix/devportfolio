// Looping, muted YouTube clips used as work previews (Techart and Art pages).
// Markup: <span class="tx-yt" data-yt={id} data-start={s} data-end={s}><span class="tx-yt-clip">
// <span class="tx-yt-frame"></span></span></span>; styles in src/styles/editorial.css.

/** The 11-character video id from a youtube.com/watch?v=… or youtu.be/… link. */
export const youtubeId = (url?: string) => url?.match(/(?:[?&]v=|youtu\.be\/)([\w-]{11})/)?.[1];

/** The start time in seconds from a link's t= parameter (t=90s, t=90 or t=1m30s). */
export const youtubeStart = (url?: string) => {
  const t = url?.match(/[?&]t=(?:(\d+)m)?(\d+)s?/);
  return t ? Number(t[1] || 0) * 60 + Number(t[2]) : 0;
};

/** Build each preview's player once it's near the screen, loop its [start, end] range, and
 *  pause it while it's scrolled away (or filtered out). YouTube shows its title bar, logo and
 *  "More videos" for a few seconds whenever a player starts or resumes, so the video only fades
 *  in once that has cleared, and hides again whenever it pauses. */
const REVEAL_DELAY = 3500;   // ms of playing before the video is shown
export function initYoutubePreviews() {
  const clips = [...document.querySelectorAll<HTMLElement>(".tx-yt")];
  if (!clips.length) return;

  const w = window as any;
  let api: Promise<any> | null = null;
  const loadApi = () =>
    (api ??= new Promise((resolve) => {
      w.onYouTubeIframeAPIReady = () => resolve(w.YT);
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.head.append(s);
    }));
  const players = new Map<HTMLElement, any>();
  const visible = new Set<HTMLElement>();

  const create = async (el: HTMLElement) => {
    players.set(el, null);
    const YT = await loadApi();
    const start = Number(el.dataset.start), end = Number(el.dataset.end);
    let reveal: ReturnType<typeof setTimeout>;
    const mount = document.createElement("div");
    el.querySelector(".tx-yt-frame")!.append(mount);
    const player = new YT.Player(mount, {
      host: "https://www.youtube-nocookie.com",
      videoId: el.dataset.yt,
      playerVars: { start, end, autoplay: 1, mute: 1, controls: 0, disablekb: 1, fs: 0, iv_load_policy: 3, playsinline: 1, rel: 0, cc_load_policy: 0 },
      events: {
        onReady: (e: any) => { e.target.mute(); if (visible.has(el)) e.target.playVideo(); else e.target.pauseVideo(); },
        onStateChange: (e: any) => {
          clearTimeout(reveal);
          if (e.data === YT.PlayerState.PLAYING) {
            e.target.unloadModule?.("captions");          // no auto-captions over the preview
            reveal = setTimeout(() => el.classList.add("is-playing"), REVEAL_DELAY);
          } else if (e.data === YT.PlayerState.PAUSED) {
            el.classList.remove("is-playing");
          } else if (e.data === YT.PlayerState.ENDED) {
            e.target.seekTo(start, true);
            e.target.playVideo();
          }
        },
      },
    });
    players.set(el, player);
    // keep it inside the clip: jump back before YouTube's `end` stops it
    setInterval(() => {
      if (player.getPlayerState?.() === YT.PlayerState.PLAYING && player.getCurrentTime() >= end - 0.4) player.seekTo(start, true);
    }, 200);
  };

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const el = e.target as HTMLElement;
      if (e.isIntersecting) visible.add(el); else visible.delete(el);
      if (!players.has(el)) { if (e.isIntersecting) create(el); continue; }
      const p = players.get(el);
      if (e.isIntersecting) p?.playVideo?.(); else p?.pauseVideo?.();
    }
  }, { rootMargin: "200px 0px" });
  clips.forEach((el) => io.observe(el));
}
