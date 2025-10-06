import { useState, useEffect } from "react";
import assemble from "./scripts/assembler";
import highlight from "./highlight";
import cn from "./cn";

export default function CodeEditor({
  changeOutput,
  changeError,
  anotherProgram,
  saveProgram,
  clearAnotherProgram,
}: {
  changeOutput: (
    output: { instruction: string; binary: string; hex: string }[]
  ) => void;
  changeError: (error: string | null) => void;
  saveProgram: (program: string) => void;
  anotherProgram: string | null;
  clearAnotherProgram: () => void;
}) {
  const [program, setProgram] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (anotherProgram) {
      setProgram(anotherProgram);
      clearAnotherProgram();
    }
  }, [anotherProgram, clearAnotherProgram]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeOutput([]);
    changeError(null);
    if (program.trim() === "") {
      return;
    }
    try {
      const { ram, error } = assemble(program);
      if (error) {
        changeError(error);
        console.error("Error assembling program:", error);
        return;
      }
      changeOutput(ram);
    } catch (error) {
      changeError("An unexpected error occurred during assembly.");
      console.error("Error assembling program:", error);
    }
  };

  const handleDownload = () => {
    if (program.trim() === "") return;
    const timeoutId = setTimeout(() => {
      const blob = new Blob([program], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "program.asm";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 200);
    return () => clearTimeout(timeoutId);
  };

  return (
    <form
      action=""
      className="flex flex-col gap-2 items-end justify-center text-lg"
      onSubmit={handleSubmit}
    >
      <div className="flex ml-auto gap-3">
        <button
          type="button"
          className="cursor-pointer p-1 rounded-sm hover:bg-zinc-700/30 hover:text-blue-500 transition-all duration-200"
          onClick={() => {
            if (!program) return;
            saveProgram(program);
          }}
          title="Save the program"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-check-icon lucide-check"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </button>
        <button
          type="submit"
          className="cursor-pointer p-1 rounded-sm hover:bg-zinc-700/30 hover:text-green-500 transition-all duration-200"
          title="Run the program"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-play-icon lucide-play"
          >
            <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
          </svg>
        </button>
        <button
          type="button"
          className="cursor-pointer p-1 rounded-sm hover:bg-zinc-700/30 hover:text-blue-400 transition-all duration-200"
          onClick={handleDownload}
          title="Download the program"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-download-icon lucide-download"
          >
            <path d="M12 15V3" />
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path d="m7 10 5 5 5-5" />
          </svg>
        </button>
        <button
          type="reset"
          className="cursor-pointer p-1 rounded-sm hover:bg-zinc-700/30 hover:text-blue-500 transition-all duration-300 focus:rotate-180"
          onClick={() => {
            const timeoutId = setTimeout(() => {
              setProgram("");
              changeOutput([]);
              changeError(null);
            }, 200);
            return () => clearTimeout(timeoutId);
          }}
          title="Clear the editor"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-refresh-cw-icon lucide-refresh-cw"
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
        </button>
      </div>
      <div className="relative w-full h-[62dvh]">
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(program);
          }}
          className="absolute right-0 top-0 cursor-pointer backdrop-filter backdrop-blur-sm bg-zinc-500 border-gray-400 text-white text-sm px-2 py-0.5 rounded rounded-br-sm rounded-tl-sm hover:bg-zinc-500/40 focus:bg-white/80 focus:text-black focus:border-gray-500 z-1000 outline-none transition-all duration-150"
        >
          Copy Code
        </button>
        <div
          className={cn(
            "absolute overflow-y-auto w-full h-[62dvh] font-mono border-[0.225rem] rounded bg-fuchsia-950/10 transition-all duration-100",
            {
              "border-teal-200": !isFocused,
              "border-teal-400/90": isFocused,
            }
          )}
        >
          <textarea
            name="code"
            placeholder="Start typing your code..."
            className={cn(
              "absolute inset-x-0 min-h-full z-10 px-5 pt-7 pb-4.5 resize-none field-sizing-content break-all text-wrap caret-white bg-transparent border-0 outline-none",
              {
                "text-transparent": program.length > 0,
              }
            )}
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            autoFocus
          />
          <pre
            dangerouslySetInnerHTML={{ __html: highlight(program) }}
            className="absolute inset-x-0 px-5 pt-7 pb-4.5 break-all text-wrap z-0 min-h-full bg-transparent border-0 outline-none"
          />
        </div>
      </div>
    </form>
  );
}
