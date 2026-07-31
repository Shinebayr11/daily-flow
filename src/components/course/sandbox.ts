/**
 * Shared sandbox helpers for the lesson playground and the stepped exercise lab.
 *
 * Learner code always runs inside `<iframe sandbox="allow-scripts">`, so it can
 * never touch the host page, cookies, or localStorage.
 */

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

/** Load a script tag once and resolve when it is ready. */
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
 * Format a snippet with Prettier (lazy-loaded from a CDN).
 * Throws on invalid syntax — which is useful feedback in itself.
 */
export async function formatCode(source: string): Promise<string> {
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
  return pretty.trimEnd();
}

/** Turn a Prettier failure into a message a learner can act on. */
export function formatErrorMessage(e: unknown): string {
  return e instanceof Error && /unexpected|syntax/i.test(e.message)
    ? "Синтаксын алдаатай тул цэгцэлж чадсангүй"
    : "Цэгцэлж чадсангүй (интернэт холболтоо шалгана уу)";
}

/**
 * Build the full HTML document for the preview iframe.
 *
 * `runId` is embedded so the string always differs between runs — otherwise
 * React skips the update and the iframe never reloads when code is unchanged.
 */
export function buildSandboxDoc(
  mode: "react" | "html",
  userCode: string,
  runId: number,
): string {
  if (mode === "html") {
    return `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>body{font-family:system-ui,sans-serif;padding:16px;margin:0;color:#111}</style>
</head><body><!--${runId}-->${userCode}</body></html>`;
  }

  // React mode: React 18 UMD + Babel standalone, then render <App />.
  // The snippet is compiled manually so BOTH syntax (compile) errors and
  // runtime errors can be surfaced instead of a blank page.
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
  button:disabled{opacity:.5;cursor:not-allowed}
  input,textarea{font:inherit;padding:6px 10px;border-radius:8px;border:1px solid #c7c7d1;margin-right:6px}
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
          useRef = React.useRef, useMemo = React.useMemo,
          useCallback = React.useCallback, useReducer = React.useReducer;
      var App = new Function(
        'React', 'useState', 'useEffect', 'useRef', 'useMemo', 'useCallback', 'useReducer',
        compiled + '\\n; return typeof App !== "undefined" ? App : null;'
      )(React, useState, useEffect, useRef, useMemo, useCallback, useReducer);

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
}
