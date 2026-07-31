"use client";

import { useCallback, useEffect, useState } from "react";
import { Play, RotateCcw, Code2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "./code-editor";
import { buildSandboxDoc, formatCode, formatErrorMessage } from "./sandbox";

interface CodePlaygroundProps {
  /** "react" wraps the snippet with React + Babel; "html" runs it raw. */
  mode: "react" | "html";
  title?: string;
  code: string;
}

/**
 * W3Schools-style "Try it yourself" editor with line numbers and a
 * Prettier-powered format button.
 *
 * The code runs inside a sandboxed <iframe srcDoc>, so it can never touch the
 * host page. React mode expects the snippet to define an `App` component.
 */
export function CodePlayground({ mode, title, code }: CodePlaygroundProps) {
  const [source, setSource] = useState(code);
  const [srcDoc, setSrcDoc] = useState("");
  // Bumped on every Run so the srcDoc string always differs — otherwise React
  // skips the update and the iframe never reloads when the code is unchanged.
  const [runId, setRunId] = useState(0);
  const [formatting, setFormatting] = useState(false);
  const [formatMsg, setFormatMsg] = useState("");

  const run = useCallback(() => setRunId((n) => n + 1), []);

  async function format() {
    setFormatting(true);
    setFormatMsg("");
    try {
      setSource(await formatCode(source));
      setFormatMsg("Цэгцэллээ ✓");
    } catch (e) {
      setFormatMsg(formatErrorMessage(e));
    } finally {
      setFormatting(false);
      setTimeout(() => setFormatMsg(""), 3000);
    }
  }

  // Rebuild the document whenever Run is pressed (runId changes).
  useEffect(() => {
    setSrcDoc(buildSandboxDoc(mode, source, runId));
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
              setRunId((n) => n + 1);
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
        <div className="border-b md:border-b-0 md:border-r">
          <CodeEditor value={source} onChange={setSource} />
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
