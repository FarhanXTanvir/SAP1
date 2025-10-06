import { useState, useEffect } from "react";
import CodeEditor from "../CodeEditor";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<
    { instruction: string; binary: string; hex: string }[]
  >([]);
  const [savedPrograms, setSavedPrograms] = useState<
    { title: string; content: string }[]
  >([]);
  const [anotherProgram, setAnotherProgram] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [newProgram, setNewProgram] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("savedPrograms");
    if (saved) {
      setSavedPrograms(JSON.parse(saved));
    }
  }, []);

  const handleSaveProgram = (program: string | null) => {
    setIsSaving(true);
    setNewProgram(program);
    if (!title || !newProgram) return;
    setSavedPrograms((prev) => [...prev, { title, content: newProgram }]);
    localStorage.setItem(
      "savedPrograms",
      JSON.stringify([...savedPrograms, { title, content: newProgram }])
    );
    setTitle("");
    setIsSaving(false);
  };
  return (
    <div className="grid grid-cols-[1fr_4fr] flex-1 transition-all duration-300">
      <aside className="overflow-auto bg-zinc-800/30 px-3 py-1 shadow-md sticky top-0 z-40">
        <div className="space-y-4" id="saved-programs">
          <h3 className="font-bold text-lg py-1.5">
            Saved <span className="text-red-500">Programs</span>
          </h3>
          <ul className="space-y-1">
            {savedPrograms.length > 0 ? (
              savedPrograms.map((program, index) => (
                <li
                  key={index}
                  className="relative group flex flex-col items-start px-2 py-1 bg-zinc-800 rounded text-gray-100 hover:bg-sky-600/10 transition-all duration-200 cursor-pointer break-all"
                  onClick={() => {
                    setAnotherProgram(program.content);
                  }}
                >
                  <span className="font-bold">{program.title}</span>
                  <span className="text-gray-500 line-clamp-1">
                    {program.content}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSavedPrograms((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                      localStorage.setItem(
                        "savedPrograms",
                        JSON.stringify(
                          savedPrograms.filter((_, i) => i !== index)
                        )
                      );
                    }}
                    className="absolute right-1.5 top-1/2 translate-y-[-50%] invisible group-hover:visible cursor-pointer font-bold rounded shadow-xl transition-colors duration-200 p-1 hover:text-red-400 hover:bg-gray-500/10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-x-icon lucide-x"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </li>
              ))
            ) : (
              <li className="indent-1.5"> No items to show</li>
            )}
          </ul>
        </div>
      </aside>
      <div className="px-4 pt-4 pb-6 overflow-auto shadow-md flex flex-col items-center gap-1">
        <h1 className="text-center text-2xl font-bold">
          <span className="text-blue-500">Assembly</span> Code Editor
        </h1>
        <div className="flex flex-col gap-5.5 w-full px-[10%]">
          <CodeEditor
            changeError={setError}
            changeOutput={setOutput}
            saveProgram={handleSaveProgram}
            anotherProgram={anotherProgram}
            clearAnotherProgram={() => setAnotherProgram(null)}
          />
          {!!error && (
            <div className="border-red-500 border-2 p-2 text-white">
              {error}
            </div>
          )}
          {output.length > 0 && (
            <div className="p-15 space-y-7 border-2 border-white/70 rounded">
              <h2 className="text-3xl font-bold text-green-400 bg-sky-800/10 w-fit p-3 rounded">
                Output
              </h2>
              <div className="text-lg py-2">
                <p className="flex justify-between gap-2 py-2 font-bold">
                  <span>Binary</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        output.map((line) => `${line.binary}`).join(" ")
                      );
                    }}
                    className="cursor-pointer w-fit bg-gray-500 text-white font-medium text-base px-2 rounded focus:bg-white/80 focus:text-black"
                  >
                    Copy Binary
                  </button>
                </p>
                <pre className="p-2 bg-gray-800 rounded text-wrap">
                  {output.map((line) => `${line.binary}`).join(" ")}
                </pre>
              </div>
              <div className="text-lg py-2">
                <p className="flex justify-between gap-2 py-2 font-bold">
                  <span>Hex</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        output.map((line) => `${line.hex}`).join(" ")
                      );
                    }}
                    className="cursor-pointer w-fit bg-gray-500 text-white font-medium text-base px-2 rounded focus:bg-white/80 focus:text-black"
                  >
                    Copy Hex
                  </button>
                </p>
                <pre className="p-2 bg-gray-800 rounded">
                  {output.map((line) => `${line.hex}`).join(" ")}
                </pre>
              </div>
              <table className="text-xl table-auto border-collapse border border-slate-400 w-full font-mono">
                <thead>
                  <tr className="bg-white/90 text-black font-bold">
                    <th className="border border-slate-400 p-2">Address</th>
                    <th className="border border-slate-400 p-2">Instruction</th>
                    <th className="border border-slate-400 p-2">Binary</th>
                    <th className="border border-slate-400 p-2">Hex</th>
                  </tr>
                </thead>
                <tbody>
                  {output.map((line, i) => (
                    <tr key={i} className="text-center">
                      <td className="table-cell border border-slate-400 p-2">
                        {parseInt(`${i}`).toString(16)}
                      </td>
                      <td className="border border-slate-400 p-2">
                        {line.instruction}
                      </td>
                      <td className="border border-slate-400 p-2">
                        {line.binary}
                      </td>
                      <td className="border border-slate-400 p-2">
                        {line.hex}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {isSaving && (
        <div
          className="z-1000 fixed w-[100dvw] h-[100dvh] flex items-center justify-center bg-black/40"
          onClick={() => setIsSaving(false)}
        >
          <div
            className="bg-gray-800 p-6 rounded shadow-lg flex flex-col gap-4 w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="Enter a title for the program..."
              className="p-2 border-1 outline-0 focus:border-teal-200 rounded w-[30dvw]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <div className="flex gap-4 justify-end">
              <button
                className="cursor-pointer bg-white text-black font-bold p-2 rounded hover:bg-teal-200 transition-colors duration-200"
                onClick={() => {
                  handleSaveProgram(newProgram);
                }}
              >
                Done
              </button>
              <button
                className="cursor-pointer border-2 border-white text-white font-bold p-2 rounded hover:bg-red-500/40 hover:text-white/80 transition-colors duration-200"
                onClick={() => setIsSaving(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
