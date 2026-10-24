// One progress bar for every download the gallery waits on (scene, lightmap, sounds).

/** Combine several downloads into one 0..1 progress. `part(weight)` registers a download
 *  (weight ~ its size in MB) and returns a callback taking that download's own 0..1. */
export function makeProgress(report) {
  const parts = [];
  const update = () => report(parts.reduce((a, p) => a + p.w * p.f, 0) / parts.reduce((a, p) => a + p.w, 0));
  return function part(weight) {
    const p = { w: weight, f: 0 };
    parts.push(p);
    return (f) => { p.f = Math.min(1, Math.max(p.f, f)); update(); };
  };
}

/** fetch() that reports how much has arrived. Without a Content-Length the bar for this
 *  download just jumps to full when it finishes. */
export async function fetchProgress(url, onProgress = () => {}) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  const total = Number(res.headers.get("content-length")) || 0;
  if (!res.body || !total) {
    const buf = await res.arrayBuffer();
    onProgress(1);
    return buf;
  }
  const reader = res.body.getReader();
  const chunks = [];
  let got = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    got += value.length;
    onProgress(Math.min(0.99, got / total));   // gzip can make the byte counts disagree
  }
  onProgress(1);
  return new Blob(chunks).arrayBuffer();
}
