// Looping, muted YouTube clips used as work previews (Techart and Art pages).
// Markup: <span class="tx-yt" data-yt={id} data-start={s} data-end={s} data-fallback={img?}>
// <span class="tx-yt-clip"><span class="tx-yt-frame"></span></span></span>; styles in
// src/styles/editorial.css. Each clip shows a still straight away while YouTube loads: data-fallback
// if given, else /yt-posters/<id>-<start>.webp (a frame grabbed ~3.5 s into the clip, where the video
// fades in, so the swap is close to seamless). The still stays if the video can't play.
// Clicking a clip pauses/plays it (except on the home grid tiles, where the video is the way into the
// project). Paused, it holds the frame it stopped on
// (YouTube draws its title bar and "More videos" over a paused embed; that can't be turned off) and
// play carries on from there. A clip paused this way stays paused when it scrolls back in.

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
const FALLBACK_AFTER = 12000; // ms without playback before the fallback image is shown

/** the still for a clip: its own data-fallback, or the grabbed frame for this id and start time */
const posterOf = (el: HTMLElement) => el.dataset.fallback || `/yt-posters/${el.dataset.yt}-${el.dataset.start}.webp`;
/** put the still up (once); `failed` also drops the player when the video can't play */
function showFallback(el: HTMLElement, failed = false) {
  if (!el.style.backgroundImage) el.style.backgroundImage = `url("${posterOf(el)}")`;
  if (failed) el.classList.add("is-failed");
}
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
  const userPaused = new Set<HTMLElement>();   // paused by a click

  // warm up the connections and fetch the player API now, so the first clip doesn't wait on them
  for (const href of ["https://www.youtube-nocookie.com", "https://www.youtube.com", "https://i.ytimg.com"]) {
    const l = document.createElement("link");
    l.rel = "preconnect"; l.href = href; l.crossOrigin = "";
    document.head.append(l);
  }
  loadApi();

  const create = async (el: HTMLElement) => {
    players.set(el, null);
    // no playback in time (API blocked, very slow network): put the still up behind the player
    const slow = setTimeout(() => { if (!el.classList.contains("is-playing")) showFallback(el); }, FALLBACK_AFTER);
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
        onReady: (e: any) => { e.target.mute(); if (visible.has(el) && !userPaused.has(el)) e.target.playVideo(); else e.target.pauseVideo(); },
        onStateChange: (e: any) => {
          clearTimeout(reveal);
          if (e.data === YT.PlayerState.PLAYING) {
            clearTimeout(slow);
            e.target.unloadModule?.("captions");          // no auto-captions over the preview
            reveal = setTimeout(() => el.classList.add("is-playing"), REVEAL_DELAY);
          } else if (e.data === YT.PlayerState.PAUSED) {
            if (!userPaused.has(el)) el.classList.remove("is-playing");   // the visitor's pause keeps the frame up
          } else if (e.data === YT.PlayerState.ENDED) {
            e.target.seekTo(start, true);
            e.target.playVideo();
          }
        },
        // video removed/private (100) or not embeddable (101, 150): drop the player, keep the still.
        // Other codes can be one-off glitches; the FALLBACK_AFTER timer covers a stuck player.
        onError: (e: any) => {
          if (![100, 101, 150].includes(e.data)) return;
          clearTimeout(slow);
          clearTimeout(reveal);
          showFallback(el, true);
        },
      },
    });
    players.set(el, player);
    // keep it inside the clip: jump back before YouTube's `end` stops it
    setInterval(() => {
      if (player.getPlayerState?.() === YT.PlayerState.PLAYING && player.getCurrentTime() >= end - 0.4) player.seekTo(start, true);
    }, 200);
  };

  // a spinner over each still until its video fades in (styled in editorial.css)
  for (const el of clips) {
    const spin = document.createElement("span");
    spin.className = "tx-yt-spin";
    spin.setAttribute("aria-hidden", "true");
    el.append(spin);
    const toggle = (e: Event) => {
      e.preventDefault();      // clips sit inside links (project, YouTube)
      e.stopPropagation();
      const p = players.get(el);
      if (userPaused.delete(el)) {
        el.classList.remove("is-paused");
        if (visible.has(el)) p?.playVideo?.();
      } else {
        userPaused.add(el);
        el.classList.add("is-paused");
        p?.pauseVideo?.();
      }
    };
    if (!el.closest(".tx-tile")) el.addEventListener("click", toggle);
  }

  // stills load a little before the clip scrolls in, so it's never a black box
  const posters = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { showFallback(e.target as HTMLElement); posters.unobserve(e.target); }
  }, { rootMargin: "800px 0px" });
  clips.forEach((el) => posters.observe(el));

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const el = e.target as HTMLElement;
      if (e.isIntersecting) visible.add(el); else visible.delete(el);
      if (!players.has(el)) { if (e.isIntersecting) create(el); continue; }
      const p = players.get(el);
      if (e.isIntersecting) { if (!userPaused.has(el)) p?.playVideo?.(); } else p?.pauseVideo?.();
    }
  }, { rootMargin: "200px 0px" });
  clips.forEach((el) => io.observe(el));
}
