/**
 * In-browser Python runtime via Pyodide (CPython compiled to WebAssembly).
 * Loaded lazily from CDN on first Run, then cached for the session.
 */

type Pyodide = {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (opts: { batched: (s: string) => void }) => void;
  setStderr: (opts: { batched: (s: string) => void }) => void;
};

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<Pyodide>;
  }
}

const PYODIDE_VERSION = "0.26.4";
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let pyodidePromise: Promise<Pyodide> | null = null;

export function loadPython(): Promise<Pyodide> {
  if (!pyodidePromise) {
    pyodidePromise = new Promise<Pyodide>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `${PYODIDE_BASE}pyodide.js`;
      script.onload = () => {
        if (!window.loadPyodide) {
          reject(new Error("Pyodide failed to initialize"));
          return;
        }
        window.loadPyodide({ indexURL: PYODIDE_BASE }).then(resolve, reject);
      };
      script.onerror = () => reject(new Error("Failed to load Pyodide from CDN"));
      document.head.appendChild(script);
    }).catch((err) => {
      pyodidePromise = null; // allow retry (e.g. after connectivity returns)
      throw err;
    });
  }
  return pyodidePromise;
}

export interface RunResult {
  lines: { text: string; isError: boolean }[];
}

export async function runPython(code: string): Promise<RunResult> {
  const py = await loadPython();
  const lines: RunResult["lines"] = [];
  py.setStdout({ batched: (s) => lines.push({ text: s, isError: false }) });
  py.setStderr({ batched: (s) => lines.push({ text: s, isError: true }) });
  try {
    await py.runPythonAsync(code);
  } catch (err) {
    // Python exceptions arrive here with the full traceback in the message
    const msg = err instanceof Error ? err.message : String(err);
    lines.push({ text: msg, isError: true });
  }
  return { lines };
}
