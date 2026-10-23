// Retro green-phosphor terminal drawn live onto the CRT's screen via a CanvasTexture.
// idle  -> ambient loop (hex dump, flicker, "click to access")
// boot  -> typed logon sequence, then the menu
// menu / page -> portfolio content, mouse + keyboard driven
import * as THREE from "three";

const SIZE = 1024;
const MARGIN_X = 92, MARGIN_TOP = 104, MARGIN_BOTTOM = 96;   // keep clear of the CRT's curved bezel
const FONT_PX = 34, LINE_H = 44;
const GREEN = "#62ff95", DIM = "#1f7a45", BG = "#020c06";
const TYPE_BOOT = 70, TYPE_PAGE = 420;                       // characters per second
const FONT = `${FONT_PX}px "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace`;

export class TerminalScreen {
  constructor(data) {
    this.data = data;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.canvas.height = SIZE;
    this.ctx = this.canvas.getContext("2d");
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.flipY = false;                  // glTF UV convention: v=0 is the canvas top
    this.scan = makeScanlines();
    this.ctx.font = FONT;
    this.charW = this.ctx.measureText("M").width;
    this.cols = Math.floor((SIZE - 2 * MARGIN_X) / this.charW);
    this.rows = Math.floor((SIZE - MARGIN_TOP - MARGIN_BOTTOM) / LINE_H);
    this.onExit = () => {};
    this.hex = Array.from({ length: 40 }, randomHexLine);
    this.idle();
  }

  /** Map the canvas onto the screen mesh's UV rectangle. */
  fitToUVs(u0, v0, u1, v1) {
    // the CRT's UVs run bottom-up, so the canvas is flipped vertically onto them
    this.uv = { u0, v0, u1, v1 };
    this.texture.repeat.set(1 / (u1 - u0), -1 / (v1 - v0));
    this.texture.offset.set(-u0 / (u1 - u0), v1 / (v1 - v0));
  }

  // ------------------------------------------------------------ states
  idle() {
    this.state = "idle";
    this.lines = [];
  }

  boot() {
    const d = this.data;
    const user = d.name.split(" ")[0].toUpperCase();
    this.setLines([
      { text: "SHADERTRIX UNIFIED OPERATING SYSTEM" },
      { text: `COPYRIGHT ${new Date().getFullYear()} SHADERTRIX` },
      { text: "-NODE 01-" },
      { text: "" },
      { text: `> LOGON ${user}` },
      { text: "ENTER PASSWORD NOW" },
      { text: "> ********" },
      { text: "" },
      { text: "ACCESS GRANTED.", pause: 0.5 },
    ], TYPE_BOOT, () => this.menu());
    this.state = "boot";
  }

  menu() {
    const d = this.data;
    const items = [
      ["ABOUT", () => this.page("about")],
      ["EXPERIENCE", () => this.page("experience")],
      ["PROJECTS", () => this.page("projects")],
      ["SKILLS", () => this.page("skills")],
      ["CONTACT", () => this.page("contact")],
      d.resumeUrl && ["DOWNLOAD CV", () => open(d.resumeUrl, "_blank", "noopener")],
      ["LOG OFF", () => this.onExit()],
    ].filter(Boolean);
    this.setLines([
      { text: `WELCOME, VISITOR.` },
      { text: `${d.name.toUpperCase()} // ${d.role.toUpperCase()}` },
      { text: "" },
      ...items.map(([label, action], i) => ({ text: `[${i + 1}] ${label}`, action })),
      { text: "" },
      { text: "SELECT WITH MOUSE, ARROWS OR NUMBER KEYS." , dim: true },
    ], TYPE_PAGE * 0.5);
    this.state = "menu";
  }

  page(key) {
    const d = this.data;
    const back = { text: "[ BACK ]", action: () => this.menu() };
    const title = (t) => [{ text: `> ${t}` }, { text: "" }];
    const wrapped = (s, indent = "") => wrap(s, this.cols - indent.length).map((t) => ({ text: indent + t }));
    let body = [];
    if (key === "about") {
      body = [...title("ABOUT"), ...wrapped(d.about)];
    } else if (key === "experience") {
      body = title("EXPERIENCE");
      for (const job of d.experience) {
        body.push({ text: `${job.company.toUpperCase()} - ${job.title}` }, { text: `  ${job.dateRange}`, dim: true });
        body.push(...wrapped(job.description, "  "));
        for (const h of job.highlights) body.push(...wrap(h, this.cols - 4).map((t, i) => ({ text: (i ? "    " : "  - ") + t })));
        body.push({ text: "" });
      }
    } else if (key === "projects") {
      body = title("PROJECTS");
      for (const p of d.projects) {
        body.push({ text: p.name.toUpperCase() });
        body.push(...wrapped(p.tagline, "  "));
        if (p.link) body.push({ text: "  [ SOURCE ]", action: () => open(p.link, "_blank", "noopener") });
        if (p.demoLink) body.push({ text: "  [ WATCH DEMO ]", action: () => open(p.demoLink, "_blank", "noopener") });
        body.push({ text: "" });
      }
    } else if (key === "skills") {
      body = [...title("SKILLS"), ...wrapped(d.skills.join("  /  "))];
    } else if (key === "contact") {
      body = title("CONTACT");
      for (const c of d.contact) body.push({ text: `[ ${c.label.toUpperCase()} ]  ${c.value}`, action: () => open(c.href, c.href.startsWith("mailto:") ? "_self" : "_blank", "noopener") });
    }
    this.setLines([back, { text: "" }, ...body, back], TYPE_PAGE);
    this.state = "page";
  }

  back() {
    if (this.state === "page") this.menu();
    else if (this.state === "menu" || this.state === "boot") this.onExit();
  }

  // ------------------------------------------------------------ typing model
  setLines(lines, cps, done) {
    this.lines = lines.map((l) => ({ ...l }));   // pages reuse line objects (e.g. BACK twice)
    this.typed = 0;
    this.cps = cps;
    this.done = done;
    this.scroll = 0;
    this.hover = this.lines.findIndex((l) => l.action);
    let total = 0;
    for (const l of this.lines) { l.start = total; total += l.text.length + 1 + Math.round((l.pause || 0) * cps); }
    this.total = total;
  }

  get typing() { return this.state !== "idle" && this.typed < this.total; }

  // ------------------------------------------------------------ input (uv from a raycast on the screen mesh)
  uvToRow(uv) {
    if (!uv || !this.uv) return -1;
    const y = ((this.uv.v1 - uv.y) / (this.uv.v1 - this.uv.v0)) * SIZE;
    const row = Math.floor((y - MARGIN_TOP) / LINE_H) + this.scroll;
    return row >= 0 && row < this.lines.length ? row : -1;
  }
  pointer(uv) {
    const row = this.uvToRow(uv);
    if (row >= 0 && this.lines[row].action && !this.typing) this.hover = row;
    return row >= 0 && !!this.lines[row]?.action;
  }
  click(uv) {
    if (this.typing) { this.typed = this.total; return; }      // click to skip typing
    const row = this.uvToRow(uv);
    if (row >= 0 && this.lines[row].action) this.lines[row].action();
  }
  wheel(dy) { this.scrollBy(Math.sign(dy) * 2); }
  scrollBy(n) {
    const max = Math.max(0, this.lines.length - this.rows);
    this.scroll = Math.min(max, Math.max(0, this.scroll + n));
  }
  key(e) {
    if (this.state === "idle") return false;
    const k = e.key;
    if (this.typing && (k === "Enter" || k === " ")) { this.typed = this.total; return true; }
    const opts = this.lines.map((l, i) => (l.action ? i : -1)).filter((i) => i >= 0);
    if (k === "ArrowDown" || k === "ArrowUp") {
      const at = opts.indexOf(this.hover);
      const next = opts[(at + (k === "ArrowDown" ? 1 : -1) + opts.length) % opts.length];
      if (next !== undefined) {
        this.hover = next;
        if (next < this.scroll) this.scroll = next;
        if (next >= this.scroll + this.rows) this.scroll = next - this.rows + 1;
      }
      return true;
    }
    if (k === "PageDown") { this.scrollBy(this.rows - 2); return true; }
    if (k === "PageUp") { this.scrollBy(-(this.rows - 2)); return true; }
    if (k === "Enter" && this.lines[this.hover]?.action) { this.lines[this.hover].action(); return true; }
    if (k === "Escape" || k === "Backspace") { this.back(); return true; }
    if (this.state === "menu" && /^[1-9]$/.test(k)) {
      const opt = opts[Number(k) - 1];
      if (opt !== undefined) this.lines[opt].action();
      return true;
    }
    return false;
  }

  // ------------------------------------------------------------ frame
  update(dt, t) {
    if (this.typing) {
      this.typed = Math.min(this.total, this.typed + this.cps * dt);
      // follow the cursor while text types out
      const row = this.lines.findIndex((l) => this.typed < l.start + l.text.length + 1);
      if (row >= this.scroll + this.rows) this.scroll = row - this.rows + 1;
    }
    // also fires when typing was skipped (click / Enter)
    if (!this.typing && this.done) { const d = this.done; this.done = null; d(); }
    this.draw(t);
    this.texture.needsUpdate = true;
  }

  draw(t) {
    const c = this.ctx;
    const flicker = 0.93 + 0.05 * Math.sin(t * 61.0) * Math.sin(t * 7.3) + (Math.random() < 0.01 ? -0.12 : 0);
    c.globalAlpha = 1;
    c.fillStyle = BG;
    c.fillRect(0, 0, SIZE, SIZE);
    // phosphor bloom in the middle of the tube
    const g = c.createRadialGradient(SIZE / 2, SIZE / 2, 50, SIZE / 2, SIZE / 2, SIZE * 0.72);
    g.addColorStop(0, "rgba(40,140,80,0.22)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, SIZE, SIZE);

    c.font = FONT;
    c.textBaseline = "top";
    c.globalAlpha = flicker;
    c.shadowColor = GREEN;
    c.shadowBlur = 10;
    if (this.state === "idle") this.drawIdle(t);
    else this.drawLines(t);
    c.shadowBlur = 0;

    // rolling refresh band + scanlines
    const bandY = ((t * 0.18) % 1.3 - 0.15) * SIZE;
    const band = c.createLinearGradient(0, bandY - 90, 0, bandY + 90);
    band.addColorStop(0, "rgba(120,255,170,0)");
    band.addColorStop(0.5, "rgba(120,255,170,0.06)");
    band.addColorStop(1, "rgba(120,255,170,0)");
    c.globalAlpha = 1;
    c.fillStyle = band;
    c.fillRect(0, bandY - 90, SIZE, 180);
    c.drawImage(this.scan, 0, 0);
  }

  drawIdle(t) {
    const c = this.ctx;
    // faint memory dump drifting upward behind the prompt
    c.fillStyle = DIM;
    const drift = (t * 22) % LINE_H;
    const first = Math.floor(t * 22 / LINE_H);
    for (let r = 0; r < this.rows + 2; r++) {
      const line = this.hex[(first + r) % this.hex.length];
      c.globalAlpha = 0.35;
      c.fillText(line.slice(0, this.cols), MARGIN_X, MARGIN_TOP + r * LINE_H - drift);
    }
    if (Math.random() < 0.02) this.hex[Math.floor(Math.random() * this.hex.length)] = randomHexLine();
    // header + prompt
    c.globalAlpha = 1;
    c.fillStyle = BG;
    c.fillRect(MARGIN_X - 10, MARGIN_TOP - 10, SIZE - 2 * MARGIN_X + 20, LINE_H * 2 + 14);
    c.fillStyle = GREEN;
    c.fillText("SHADERTRIX TERMINAL V1.0", MARGIN_X, MARGIN_TOP);
    c.fillText(`${this.data.name.toUpperCase()} // ONLINE`, MARGIN_X, MARGIN_TOP + LINE_H);
    const msg = "> CLICK TO ACCESS TERMINAL";
    const y = SIZE / 2 + LINE_H;
    const pulse = 0.55 + 0.45 * Math.sin(t * 2.2);
    c.fillStyle = BG;
    c.fillRect(MARGIN_X - 10, y - 8, (msg.length + 2) * this.charW + 20, LINE_H + 12);
    c.globalAlpha = 0.6 + 0.4 * pulse;
    c.fillStyle = GREEN;
    c.fillText(msg, MARGIN_X, y);
    if (Math.floor(t * 2) % 2 === 0) c.fillRect(MARGIN_X + (msg.length + 1) * this.charW, y + 2, this.charW * 0.8, FONT_PX);
    c.globalAlpha = 1;
  }

  drawLines(t) {
    const c = this.ctx;
    const end = Math.min(this.lines.length, this.scroll + this.rows);
    let cursor = null;
    for (let i = this.scroll; i < end; i++) {
      const l = this.lines[i];
      const shown = Math.max(0, Math.min(l.text.length, Math.floor(this.typed - l.start)));
      if (shown <= 0 && this.typed < l.start) break;
      const x = MARGIN_X, y = MARGIN_TOP + (i - this.scroll) * LINE_H;
      const text = l.text.slice(0, shown);
      if (i === this.hover && l.action && !this.typing) {
        // Fallout-style inverse-video selection
        c.fillStyle = GREEN;
        c.fillRect(x - 6, y - 3, l.text.length * this.charW + 12, LINE_H - 2);
        c.shadowBlur = 0;
        c.fillStyle = BG;
        c.fillText(text, x, y);
        c.shadowBlur = 10;
      } else {
        c.fillStyle = l.dim ? DIM : GREEN;
        c.fillText(text, x, y);
      }
      if (shown < l.text.length || (this.typing && this.typed < l.start + l.text.length + 1)) cursor = [x + shown * this.charW, y];
    }
    if (!this.typing && !cursor) {
      const last = Math.min(this.lines.length, this.scroll + this.rows);
      cursor = [MARGIN_X, MARGIN_TOP + (last - this.scroll) * LINE_H];
      if (cursor[1] > SIZE - MARGIN_BOTTOM - LINE_H) cursor = null;
    }
    if (cursor && Math.floor(t * 2.5) % 2 === 0) {
      c.fillStyle = GREEN;
      c.fillRect(cursor[0], cursor[1] + 2, this.charW * 0.8, FONT_PX);
    }
    // scroll hint
    if (this.lines.length > this.rows && !this.typing) {
      c.fillStyle = DIM;
      const more = this.scroll + this.rows < this.lines.length ? "v MORE (SCROLL)" : "^ TOP (SCROLL)";
      c.fillText(more, SIZE - MARGIN_X - more.length * this.charW, SIZE - MARGIN_BOTTOM + 6);
    }
  }
}

function wrap(text, cols) {
  const out = [];
  for (const para of String(text).split("\n")) {
    let line = "";
    for (const word of para.split(/\s+/)) {
      if (!word) continue;
      if ((line + " " + word).trim().length > cols) { if (line) out.push(line); line = word; }
      else line = (line + " " + word).trim();
    }
    out.push(line);
  }
  return out;
}

function randomHexLine() {
  const glyphs = "!@#$%^&*()[]{}<>?/\\|;:'\",.-_=+";
  const hex = () => "0x" + Math.floor(0xf000 + Math.random() * 0xfff).toString(16).toUpperCase();
  const junk = (n) => Array.from({ length: n }, () => glyphs[Math.floor(Math.random() * glyphs.length)]).join("");
  return `${hex()} ${junk(12)} ${hex()} ${junk(12)}`;
}

function makeScanlines() {
  const s = document.createElement("canvas");
  s.width = s.height = SIZE;
  const c = s.getContext("2d");
  c.fillStyle = "rgba(0,0,0,0.28)";
  for (let y = 0; y < SIZE; y += 4) c.fillRect(0, y, SIZE, 2);
  // darken toward the tube edges
  const v = c.createRadialGradient(SIZE / 2, SIZE / 2, SIZE * 0.35, SIZE / 2, SIZE / 2, SIZE * 0.75);
  v.addColorStop(0, "rgba(0,0,0,0)");
  v.addColorStop(1, "rgba(0,0,0,0.55)");
  c.fillStyle = v;
  c.fillRect(0, 0, SIZE, SIZE);
  return s;
}
