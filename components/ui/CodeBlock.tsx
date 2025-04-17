import { Check, Copy } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
const MonacoEditor = dynamic<any>(
  () => import("@monaco-editor/react").then((mod) => mod.default),
  { ssr: false }
);

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  mode?: "edit" | "preview";
  onChange?: (value: string) => void;
}

export default function CodeBlock({
  code,
  language = "json",
  title,
  mode = "preview",
  onChange,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [formattedCode, setFormattedCode] = useState(code);

  useEffect(() => {
    // Sync formattedCode on mode, code or language change
    if (mode === "preview") {
      // Pretty-print JSON when in preview
      if (language === "json" && code) {
        try {
          const parsed = JSON.parse(code);
          setFormattedCode(JSON.stringify(parsed, null, 2));
        } catch {
          setFormattedCode(code);
        }
      } else {
        setFormattedCode(code);
      }
    } else {
      // In edit mode, preserve raw code
      setFormattedCode(code);
    }
  }, [code, language, mode]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-md border border-border/50 bg-secondary/30 shadow-sm my-4">
      {title && (
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-2">
          <p className="text-sm font-medium">{title}</p>
        </div>
      )}
      <div className="relative">
        {mode === "edit" ? (
          <MonacoEditor
            height="400px"
            language={language}
            value={formattedCode}
            onChange={(value: string) => {
              const val = value ?? "";
              setFormattedCode(val);
              onChange?.(val);
            }}
            options={{
              automaticLayout: true,
              minimap: { enabled: false },
              tabSize: 2,
            }}
            theme="vs-dark"
          />
        ) : (
          <>
            <pre className="overflow-x-auto p-4 text-sm text-left whitespace-pre
                           [&::-webkit-scrollbar]:h-1.5
                           [&::-webkit-scrollbar-track]:bg-slate-700
                           [&::-webkit-scrollbar-thumb]:bg-purple-500
                           [&::-webkit-scrollbar-thumb]:rounded
                           [&::-webkit-scrollbar-thumb:hover]:bg-purple-400">
              <code className={`language-${language}`}>{formattedCode}</code>
            </pre>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-8 w-8"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">Copy code</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
