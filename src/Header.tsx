import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-2 px-6 bg-zinc-800/30 backdrop-blur-sm border-b border-zinc-700/50 sticky top-0 z-50">
      <NavLink
        to="/"
        className={({ isActive }) =>
          "cursor-pointer rounded-sm hover:bg-zinc-700/30 hover:text-blue-500 transition-all duration-200 flex flex-col items-center" +
          (isActive ? " text-blue-500" : "")
        }
      >
        <span className="flex items-center">
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
            className="lucide lucide-cog-icon lucide-cog"
          >
            <path d="M11 10.27 7 3.34" />
            <path d="m11 13.73-4 6.93" />
            <path d="M12 22v-2" />
            <path d="M12 2v2" />
            <path d="M14 12h8" />
            <path d="m17 20.66-1-1.73" />
            <path d="m17 3.34-1 1.73" />
            <path d="M2 12h2" />
            <path d="m20.66 17-1.73-1" />
            <path d="m20.66 7-1.73 1" />
            <path d="m3.34 17 1.73-1" />
            <path d="m3.34 7 1.73 1" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="12" r="8" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-terminal-icon lucide-terminal"
          >
            <path d="M12 19h8" />
            <path d="m4 17 6-6-6-6" />
          </svg>
        </span>
      </NavLink>
      <div className="flex items-center gap-2 text-white z-100">
        <NavLink
          to="/learn"
          className={({ isActive }) =>
            "p-1 cursor-pointer rounded-sm hover:bg-zinc-700/30 hover:text-blue-500 transition-all duration-200" +
            (isActive ? " text-blue-500" : "")
          }
          title="Learn about the Assembler"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-graduation-cap-icon lucide-graduation-cap"
          >
            <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
            <path d="M22 10v6" />
            <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
          </svg>
        </NavLink>
      </div>
    </header>
  );
}
