"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Play, RotateCcw, Code2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodePlaygroundProps {
  /** "react" wraps the snippet with React + Babel; "html" runs it raw. */
  mode: "react" | "html";
  title?: string;
  code: string;
}

/** Minimal shape of the Prettier standalone API we use. */
interface PrettierGlobal {
  format: (
    source: string,
    options: { parser: string; plugins: unknown[]; semi?: boolean },
  ) => Promise<string>;
}
declare global {
  interface Window {
    prettier?: PrettierGlobal;
    prettierPlugins?: Record<string, unknown>;
  }
}

/** Load a script tag once and resolve when ready. */
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-pg="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.dataset.pg = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("load failed"));
    document.head.appendChild(s);
  });
}

/**
 * W3Schools-style "Try it yourself" editor with line numbers and a
 * Prettier-powered format button.
 *
 * The code runs inside a sandboxed <iframe srcDoc>, so it can never touch the
 * host page. React mode loads React + Babel from a CDN inside that iframe and
 * expects the snippet to define an `App` component.
 */
export function CodePlayground({ mode, title, code }: CodePlaygroundProps) {
  const [source, setSource] = useState(code);
  const [srcDoc, setSrcDoc] = useState("");
  // Bumped on every Run so the srcDoc string always differs — otherwise React
  // skips the update and the iframe never reloads when the code is unchanged.
  const [runId, setRunId] = useState(0);
  const [formatting, setFormatting] = useState(false);
  const [formatMsg, setFormatMsg] = useState("");
  const taRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  // Line numbers for the gutter, recomputed as the user types.
  const lineCount = useMemo(() => source.split("\n").length, [source]);

  /** Keep the gutter aligned while the textarea scrolls. */
  function syncScroll() {
    if (gutterRef.current && taRef.current) {
      gutterRef.current.scrollTop = taRef.current.scrollTop;
    }
  }

  const buildDoc = useCallback(
    (userCode: string) => {
      if (mode === "html") {
        return `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>body{font-family:system-ui,sans-serif;padding:16px;margin:0;color:#111}</style>
</head><body>${userCode}</body></html>`;
      }

      // React mode: React 18 UMD + Babel standalone, then render <App />.
      // The snippet is compiled manually so BOTH syntax (compile) errors and
      // runtime errors can be surfaced to the learner instead of a blank page.
      //
      // Learners naturally write `import ... from "react"` / `export default`
      // because that's what the lessons show. The sandbox runs a plain script
      // (not an ES module), so those lines are stripped before compiling —
      // React and the hooks are already provided as globals below.
      const sanitized = userCode
        .replace(/^\s*import[\s\S]*?from\s+["'][^"']+["'];?\s*$/gm, "")
        .replace(/^\s*import\s+["'][^"']+["'];?\s*$/gm, "")
        .replace(/^\s*export\s+default\s+/gm, "")
        .replace(/^\s*export\s+/gm, "")
        .replace(/^\s*["']use client["'];?\s*$/gm, "");
      const encoded = JSON.stringify(sanitized);
      return `<!DOCTYPE html><html><head><meta charset="utf-8">
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<style>
  body{font-family:system-ui,sans-serif;padding:16px;margin:0;color:#111}
  button{font:inherit;padding:6px 12px;border-radius:8px;border:1px solid #c7c7d1;background:#4f46e5;color:#fff;cursor:pointer}
  input{font:inherit;padding:6px 10px;border-radius:8px;border:1px solid #c7c7d1;margin-right:6px}
  .err{background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px;
       color:#b91c1c;white-space:pre-wrap;font-family:ui-monospace,monospace;font-size:12.5px}
  .err b{display:block;margin-bottom:6px;font-family:system-ui,sans-serif;font-size:13px}
</style>
</head><body>
<div id="root"></div>
<script>
  var USER_CODE = ${encoded};
  var RUN_ID = ${runId};   // тухайн ажиллуулалтыг ялгах дугаар
  function showError(title, msg) {
    document.getElementById('root').innerHTML =
      '<div class="err"><b>⚠ ' + title + '</b>' +
      String(msg).replace(/&/g,'&amp;').replace(/</g,'&lt;') + '</div>';
  }
  window.onerror = function (m) { showError('Ажиллах үеийн алдаа', m); return true; };

  // CDN script-үүд синхрон ачаалагддаг тул энд аль хэдийн бэлэн байна.
  (function run() {
    if (!window.Babel || !window.React || !window.ReactDOM) {
      showError('Ачаалж чадсангүй',
        'React/Babel-ийг интернэтээс татаж чадсангүй.\\nХолболтоо шалгаад хуудсаа сэргээнэ үү.');
      return;
    }
    var compiled;
    try {
      compiled = Babel.transform(USER_CODE, { presets: ['react'] }).code;
    } catch (e) {
      showError('Синтаксын алдаа (код буруу бичигдсэн)', e.message);
      return;
    }
    try {
      var useState = React.useState, useEffect = React.useEffect,
          useRef = React.useRef, useMemo = React.useMemo;
      var App = new Function(
        'React', 'useState', 'useEffect', 'useRef', 'useMemo',
        compiled + '\\n; return typeof App !== "undefined" ? App : null;'
      )(React, useState, useEffect, useRef, useMemo);

      if (!App) {
        showError('App олдсонгүй',
          'Кодондоо "function App() { ... }" гэсэн component заавал байх ёстой.');
        return;
      }
      ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
    } catch (e) {
      showError('Ажиллах үеийн алдаа', e.message);
    }
  })();
</script>
</body></html>`;
    },
    [mode, runId],
  );

  const run = useCallback(() => setRunId((n) => n + 1), []);

  /** Format the snippet with Prettier (lazy-loaded from a CDN). */
  async function format() {
    setFormatting(true);
    setFormatMsg("");
    try {
      // Prettier 3 standalone + the parsers it needs for JS/JSX.
      await loadScript("https://unpkg.com/prettier@3.3.3/standalone.js");
      await loadScript("https://unpkg.com/prettier@3.3.3/plugins/babel.js");
      await loadScript("https://unpkg.com/prettier@3.3.3/plugins/estree.js");

      const prettier = window.prettier;
      const plugins = window.prettierPlugins;
      if (!prettier || !plugins) throw new Error("Prettier ачаалагдсангүй");

      const pretty = await prettier.format(source, {
        parser: "babel",
        plugins: [plugins.babel, plugins.estree],
        semi: true,
      });
      setSource(pretty.trimEnd());
      setFormatMsg("Цэгцэллээ ✓");
    } catch (e) {
      // Prettier fails on invalid syntax — that's useful feedback in itself.
      setFormatMsg(
        e instanceof Error && /unexpected|syntax/i.test(e.message)
          ? "Синтаксын алдаатай тул цэгцэлж чадсангүй"
          : "Цэгцэлж чадсангүй (интернэт холболтоо шалгана уу)",
      );
    } finally {
      setFormatting(false);
      setTimeout(() => setFormatMsg(""), 3000);
    }
  }

  // Rebuild the document whenever Run is pressed (runId changes).
  useEffect(() => {
    setSrcDoc(buildDoc(source));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runId]);

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-muted/40 px-3 py-2">
        <span className="flex items-center gap-1.5 text-sm font-medium">
          <Code2 className="h-4 w-4 text-primary" />
          {title ?? "Өөрөө туршиж үз"}
        </span>
        <div className="flex items-center gap-1.5">
          {formatMsg && (
            <span className="mr-1 text-xs text-muted-foreground">{formatMsg}</span>
          )}
          <Button size="sm" variant="ghost" onClick={format} disabled={formatting}>
            <Wand2 className="mr-1 h-3.5 w-3.5" />
            {formatting ? "Цэгцэлж…" : "Цэгцлэх"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setSource(code);
              setRunId((n) => n + 1); // анхны кодыг дахин ажиллуулна
            }}
          >
            <RotateCcw className="mr-1 h-3.5 w-3.5" /> Буцаах
          </Button>
          <Button size="sm" onClick={run}>
            <Play className="mr-1 h-3.5 w-3.5" /> Ажиллуулах
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2">
        {/* Editor with a line-number gutter */}
        <div className="relative flex border-b bg-muted/20 md:border-b-0 md:border-r">
          <div
            ref={gutterRef}
            aria-hidden
            className="max-h-[420px] shrink-0 select-none overflow-hidden border-r bg-muted/40 px-2 py-3 text-right font-mono text-[13px] leading-relaxed text-muted-foreground/70"
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <textarea
            ref={taRef}
            value={source}
            onChange={(e) => setSource(e.target.value)}
            onScroll={syncScroll}
            spellCheck={false}
            rows={14}
            className="max-h-[420px] min-h-[280px] flex-1 resize-y bg-transparent p-3 pl-2 font-mono text-[13px] leading-relaxed outline-none"
          />
        </div>

        {/* Live preview (sandboxed) */}
        <iframe
          srcDoc={srcDoc}
          title="preview"
          sandbox="allow-scripts"
          className="min-h-[280px] w-full bg-white"
        />
      </div>

      <p className="border-t bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground">
        Кодоо засаад “Ажиллуулах” дар · “Цэгцлэх” нь Prettier-ээр форматлана ·
        Энд <code className="font-mono">import</code>/
        <code className="font-mono">export</code> бичих шаардлагагүй (автоматаар
        хасагдана).
      </p>
    </div>
  );
}
