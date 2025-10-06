import { useState, useEffect } from "react";

export default function Learn() {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sections = [
    { id: "introduction", title: "Introduction", icon: "📚" },
    { id: "getting-started", title: "Getting Started", icon: "🚀" },
    { id: "instruction-set", title: "Instruction Set", icon: "🔧" },
    { id: "data-movement", title: "Data Movement", icon: "📦" },
    { id: "arithmetic", title: "Arithmetic Operations", icon: "🧮" },
    { id: "control-flow", title: "Control Flow", icon: "🔀" },
    { id: "bitwise", title: "Bitwise Operations", icon: "⚡" },
    { id: "examples", title: "Code Examples", icon: "💻" },
    { id: "advanced", title: "Advanced Concepts", icon: "🎓" },
    { id: "troubleshooting", title: "Troubleshooting", icon: "🔍" },
  ];

  return (
    <div className="flex flex-1 min-h-0">
      {/* Sidebar */}
      <aside className="w-72 bg-zinc-800/30 border-r border-zinc-700 overflow-y-auto sticky top-0 h-screen">
        <div className="p-6">
          <h2 className="text-xl font-bold text-blue-400 mb-6">
            📖 Learning Guide
          </h2>
          <nav>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                      activeSection === section.id
                        ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-400"
                        : "text-gray-300 hover:bg-zinc-700/50 hover:text-white"
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span className="font-medium">{section.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introduction */}
          <section id="introduction" className="scroll-mt-8">
            <h1 className="text-4xl font-bold text-blue-400 mb-6">
              Assembly Language Tutorial
            </h1>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 mb-6">
                Welcome to the comprehensive guide for our custom assembly
                language! This tutorial will take you from basic concepts to
                advanced programming techniques in our 8-bit assembly
                environment.
              </p>

              <div className="bg-zinc-800/50 border border-zinc-600 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-green-400 mb-3">
                  🎯 What You'll Learn
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Assembly language fundamentals</li>
                  <li>• Complete instruction set reference</li>
                  <li>• Programming patterns and best practices</li>
                  <li>• Real-world examples and exercises</li>
                  <li>• Debugging and optimization techniques</li>
                </ul>
              </div>

              <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">
                  💡 Prerequisites
                </h3>
                <p className="text-gray-300">
                  Basic understanding of computer programming concepts. No prior
                  assembly experience required!
                </p>
              </div>
            </div>
          </section>

          {/* Getting Started */}
          <section id="getting-started" className="scroll-mt-8">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">
              🚀 Getting Started
            </h2>

            <div className="space-y-6">
              <div className="bg-zinc-800/50 border border-zinc-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Architecture Overview
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Registers:
                    </h4>
                    <ul className="space-y-1">
                      <li>
                        • <span className="text-blue-400">Accumulator A</span> -
                        Primary data register
                      </li>
                      <li>
                        • <span className="text-blue-400">Accumulator B</span> -
                        Secondary data register
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Memory:</h4>
                    <ul className="space-y-1">
                      <li>
                        •{" "}
                        <span className="text-blue-400">8-bit addressing</span>{" "}
                        (0-255)
                      </li>
                      <li>
                        • <span className="text-blue-400">4-bit data</span>{" "}
                        (0-15)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-800/50 border border-zinc-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Your First Program
                </h3>
                <div className="bg-black/50 rounded-lg p-4 font-mono">
                  <pre className="text-green-300">
                    {`LDA 5        ; Load 5 into accumulator A
LDB 3        ; Load 3 into accumulator B
ADD          ; Add B to A (result in A)
STA 10       ; Store result at address 10
HLT          ; Halt execution`}
                  </pre>
                </div>
                <p className="text-gray-300 mt-4">
                  This program adds two numbers (5 + 3) and stores the result in
                  memory address 10.
                </p>
              </div>
            </div>
          </section>

          {/* Instruction Set Overview */}
          <section id="instruction-set" className="scroll-mt-8">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">
              🔧 Instruction Set Overview
            </h2>

            <div className="space-y-6">
              <p className="text-lg text-gray-300">
                Our assembly language features a comprehensive instruction set
                with both 4-bit and 5-bit opcodes, supporting various operations
                from basic data movement to complex bitwise manipulations.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-zinc-800/50 border border-zinc-600 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">
                    4-bit Instructions
                  </h3>
                  <p className="text-gray-300 mb-3">Require operands (0-15):</p>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Data movement (LDA, LDB, STA)</li>
                    <li>• Control flow (JMP, JZ, JNZ)</li>
                    <li>• Shift operations (SHL, SHR, ROL, ROR)</li>
                  </ul>
                </div>

                <div className="bg-zinc-800/50 border border-zinc-600 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">
                    5-bit Instructions
                  </h3>
                  <p className="text-gray-300 mb-3">No operands required:</p>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Arithmetic (ADD, SUB, INC, DEC)</li>
                    <li>• Bitwise (BW_AND, BW_OR, BW_XOR, BW_NOT)</li>
                    <li>• Control (HLT, NOP, CMP)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">
                  ⚠️ Important Notes
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Operand values must be in range 0-15 (4-bit)</li>
                  <li>• Shift amounts for SHL/SHR must be 0-7</li>
                  <li>• Memory addresses can be 0-255 (8-bit)</li>
                  <li>• Use decimal, hex (0x), or binary (0b) formats</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Movement */}
          <section id="data-movement" className="scroll-mt-8">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">
              📦 Data Movement Instructions
            </h2>

            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-zinc-600 rounded-lg overflow-hidden">
                  <thead className="bg-zinc-700">
                    <tr>
                      <th className="border border-zinc-600 px-4 py-3 text-left">
                        Instruction
                      </th>
                      <th className="border border-zinc-600 px-4 py-3 text-left">
                        Binary
                      </th>
                      <th className="border border-zinc-600 px-4 py-3 text-left">
                        Description
                      </th>
                      <th className="border border-zinc-600 px-4 py-3 text-left">
                        Example
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-green-400">
                        LDA
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono">
                        0000
                      </td>
                      <td className="border border-zinc-600 px-4 py-3">
                        Load immediate value into accumulator A
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-blue-300">
                        LDA 0x0F
                      </td>
                    </tr>
                    <tr className="bg-zinc-800/30">
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-green-400">
                        LDB
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono">
                        0001
                      </td>
                      <td className="border border-zinc-600 px-4 py-3">
                        Load immediate value into accumulator B
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-blue-300">
                        LDB 0b1010
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-green-400">
                        STA
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono">
                        0010
                      </td>
                      <td className="border border-zinc-600 px-4 py-3">
                        Store accumulator A to memory address
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-blue-300">
                        STA 15
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-zinc-800/50 border border-zinc-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Data Movement Examples
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Loading Different Number Formats:
                    </h4>
                    <div className="bg-black/50 rounded-lg p-4 font-mono">
                      <pre className="text-green-300">
                        {`LDA 15       ; Load decimal 15
LDA 0xF      ; Load hexadecimal F (same as 15)
LDA 0b1111   ; Load binary 1111 (same as 15)`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Moving Data Between Registers and Memory:
                    </h4>
                    <div className="bg-black/50 rounded-lg p-4 font-mono">
                      <pre className="text-green-300">
                        {`LDA 8        ; Load 8 into A
STA 5        ; Store A (8) to memory address 5
LDB 3        ; Load 3 into B
; Now A=8, B=3, mem[5]=8`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Arithmetic Operations */}
          <section id="arithmetic" className="scroll-mt-8">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">
              🧮 Arithmetic Operations
            </h2>

            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-zinc-600 rounded-lg overflow-hidden">
                  <thead className="bg-zinc-700">
                    <tr>
                      <th className="border border-zinc-600 px-4 py-3 text-left">
                        Instruction
                      </th>
                      <th className="border border-zinc-600 px-4 py-3 text-left">
                        Binary
                      </th>
                      <th className="border border-zinc-600 px-4 py-3 text-left">
                        Description
                      </th>
                      <th className="border border-zinc-600 px-4 py-3 text-left">
                        Example
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-green-400">
                        ADD
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono">
                        01010
                      </td>
                      <td className="border border-zinc-600 px-4 py-3">
                        Add B to A (result in A)
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-blue-300">
                        ADD
                      </td>
                    </tr>
                    <tr className="bg-zinc-800/30">
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-green-400">
                        SUB
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono">
                        01011
                      </td>
                      <td className="border border-zinc-600 px-4 py-3">
                        Subtract B from A (result in A)
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-blue-300">
                        SUB
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-green-400">
                        INC
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono">
                        01100
                      </td>
                      <td className="border border-zinc-600 px-4 py-3">
                        Increment accumulator A by 1
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-blue-300">
                        INC
                      </td>
                    </tr>
                    <tr className="bg-zinc-800/30">
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-green-400">
                        DEC
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono">
                        01101
                      </td>
                      <td className="border border-zinc-600 px-4 py-3">
                        Decrement accumulator A by 1
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-blue-300">
                        DEC
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-zinc-800/50 border border-zinc-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Arithmetic Examples
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Basic Calculator:
                    </h4>
                    <div className="bg-black/50 rounded-lg p-4 font-mono">
                      <pre className="text-green-300">
                        {`; Calculate (7 + 3) - 2
LDA 7        ; A = 7
LDB 3        ; B = 3
ADD          ; A = A + B = 10
LDB 2        ; B = 2
SUB          ; A = A - B = 8
STA 0        ; Store result at address 0`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Counter Loop:
                    </h4>
                    <div className="bg-black/50 rounded-lg p-4 font-mono">
                      <pre className="text-green-300">
                        {`; Count from 0 to 5
LDA 0        ; Initialize counter
INC          ; Increment counter
CMP          ; Compare with something
; ... loop logic here`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Control Flow */}
          <section id="control-flow" className="scroll-mt-8">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">
              🔀 Control Flow Instructions
            </h2>

            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-zinc-600 rounded-lg overflow-hidden">
                  <thead className="bg-zinc-700">
                    <tr>
                      <th className="border border-zinc-600 px-4 py-3 text-left">
                        Instruction
                      </th>
                      <th className="border border-zinc-600 px-4 py-3 text-left">
                        Binary
                      </th>
                      <th className="border border-zinc-600 px-4 py-3 text-left">
                        Description
                      </th>
                      <th className="border border-zinc-600 px-4 py-3 text-left">
                        Example
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-green-400">
                        JMP
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono">
                        0011
                      </td>
                      <td className="border border-zinc-600 px-4 py-3">
                        Unconditional jump to address
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-blue-300">
                        JMP 8
                      </td>
                    </tr>
                    <tr className="bg-zinc-800/30">
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-green-400">
                        JZ
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono">
                        0100
                      </td>
                      <td className="border border-zinc-600 px-4 py-3">
                        Jump if zero flag is set
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-blue-300">
                        JZ 5
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-green-400">
                        JNZ
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono">
                        0101
                      </td>
                      <td className="border border-zinc-600 px-4 py-3">
                        Jump if zero flag is not set
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-blue-300">
                        JNZ 7
                      </td>
                    </tr>
                    <tr className="bg-zinc-800/30">
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-green-400">
                        CMP
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono">
                        11011
                      </td>
                      <td className="border border-zinc-600 px-4 py-3">
                        Compare A and B (sets flags)
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-blue-300">
                        CMP
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-green-400">
                        HLT
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono">
                        01111
                      </td>
                      <td className="border border-zinc-600 px-4 py-3">
                        Halt program execution
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-blue-300">
                        HLT
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-zinc-800/50 border border-zinc-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Control Flow Examples
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Simple Loop:
                    </h4>
                    <div className="bg-black/50 rounded-lg p-4 font-mono">
                      <pre className="text-green-300">
                        {`; Loop 5 times
LDA 5        ; Counter = 5
DEC          ; Decrement counter
JNZ 1        ; Jump back to DEC if not zero
HLT          ; Exit when counter reaches 0`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Conditional Branch:
                    </h4>
                    <div className="bg-black/50 rounded-lg p-4 font-mono">
                      <pre className="text-green-300">
                        {`; Branch based on comparison
LDA 10       ; Load value to test
LDB 5        ; Load comparison value
CMP          ; Compare A and B
JZ 8         ; Jump to address 8 if equal
; ... code for not equal case
JMP 10       ; Skip equal case
; Address 8: code for equal case
HLT          ; End program`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bitwise Operations */}
          <section id="bitwise" className="scroll-mt-8">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">
              ⚡ Bitwise Operations
            </h2>

            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-zinc-600 rounded-lg overflow-hidden">
                  <thead className="bg-zinc-700">
                    <tr>
                      <th className="border border-zinc-600 px-4 py-3 text-left">
                        Instruction
                      </th>
                      <th className="border border-zinc-600 px-4 py-3 text-left">
                        Binary
                      </th>
                      <th className="border border-zinc-600 px-4 py-3 text-left">
                        Description
                      </th>
                      <th className="border border-zinc-600 px-4 py-3 text-left">
                        Example
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-green-400">
                        BW_AND
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono">
                        11101
                      </td>
                      <td className="border border-zinc-600 px-4 py-3">
                        Bitwise AND of A and B
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-blue-300">
                        BW_AND
                      </td>
                    </tr>
                    <tr className="bg-zinc-800/30">
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-green-400">
                        BW_OR
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono">
                        11100
                      </td>
                      <td className="border border-zinc-600 px-4 py-3">
                        Bitwise OR of A and B
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-blue-300">
                        BW_OR
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-green-400">
                        BW_XOR
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono">
                        11111
                      </td>
                      <td className="border border-zinc-600 px-4 py-3">
                        Bitwise XOR of A and B
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-blue-300">
                        BW_XOR
                      </td>
                    </tr>
                    <tr className="bg-zinc-800/30">
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-green-400">
                        BW_NOT
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono">
                        11110
                      </td>
                      <td className="border border-zinc-600 px-4 py-3">
                        Bitwise NOT of A
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-blue-300">
                        BW_NOT
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-green-400">
                        SHL
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono">
                        0110
                      </td>
                      <td className="border border-zinc-600 px-4 py-3">
                        Shift left by n positions
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-blue-300">
                        SHL 2
                      </td>
                    </tr>
                    <tr className="bg-zinc-800/30">
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-green-400">
                        SHR
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono">
                        0111
                      </td>
                      <td className="border border-zinc-600 px-4 py-3">
                        Shift right by n positions
                      </td>
                      <td className="border border-zinc-600 px-4 py-3 font-mono text-blue-300">
                        SHR 1
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-zinc-800/50 border border-zinc-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Bitwise Examples
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Bit Masking:
                    </h4>
                    <div className="bg-black/50 rounded-lg p-4 font-mono">
                      <pre className="text-green-300">
                        {`; Extract lower 2 bits from value
LDA 0b1101   ; A = 1101 (13)
LDB 0b0011   ; B = 0011 (mask for lower 2 bits)
BW_AND       ; A = A & B = 0001 (1)`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Bit Manipulation:
                    </h4>
                    <div className="bg-black/50 rounded-lg p-4 font-mono">
                      <pre className="text-green-300">
                        {`; Set specific bits
LDA 0b1010   ; A = 1010
LDB 0b0101   ; B = 0101
BW_OR        ; A = A | B = 1111 (set all bits)

; Toggle bits
LDA 0b1010   ; A = 1010
LDB 0b1100   ; B = 1100
BW_XOR       ; A = A ^ B = 0110 (toggle)`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Multiplication/Division by Powers of 2:
                    </h4>
                    <div className="bg-black/50 rounded-lg p-4 font-mono">
                      <pre className="text-green-300">
                        {`; Multiply by 4 (shift left by 2)
LDA 3        ; A = 3
SHL 2        ; A = 3 << 2 = 12

; Divide by 2 (shift right by 1)
LDA 8        ; A = 8
SHR 1        ; A = 8 >> 1 = 4`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Code Examples */}
          <section id="examples" className="scroll-mt-8">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">
              💻 Complete Code Examples
            </h2>

            <div className="space-y-6">
              <div className="bg-zinc-800/50 border border-zinc-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Example 1: Fibonacci Sequence
                </h3>
                <div className="bg-black/50 rounded-lg p-4 font-mono">
                  <pre className="text-green-300">
                    {`; Calculate first 5 Fibonacci numbers
; F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)

mem[0] = 0       ; F(0) = 0
mem[1] = 1       ; F(1) = 1

LDA 0            ; Load F(0)
STA 10           ; Store at address 10
LDA 1            ; Load F(1)
STA 11           ; Store at address 11

; Calculate F(2) = F(1) + F(0)
LDA 1            ; A = F(1) = 1
LDB 0            ; B = F(0) = 0
ADD              ; A = F(2) = 1
STA 12           ; Store F(2)

; Calculate F(3) = F(2) + F(1)
LDB 1            ; B = F(1) = 1
ADD              ; A = F(3) = 2
STA 13           ; Store F(3)

; Calculate F(4) = F(3) + F(2)
LDB 1            ; B = F(2) = 1
ADD              ; A = F(4) = 3
STA 14           ; Store F(4)

HLT              ; End program`}
                  </pre>
                </div>
                <p className="text-gray-300 mt-4">
                  This program calculates the first 5 Fibonacci numbers and
                  stores them in memory addresses 10-14.
                </p>
              </div>

              <div className="bg-zinc-800/50 border border-zinc-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Example 2: Greatest Common Divisor (GCD)
                </h3>
                <div className="bg-black/50 rounded-lg p-4 font-mono">
                  <pre className="text-green-300">
                    {`; Find GCD of two numbers using Euclidean algorithm
; GCD(12, 8) = 4

LDA 12           ; A = first number
LDB 8            ; B = second number

; Loop: while B != 0
CMP              ; Compare A and B
JZ 8             ; If B=0, jump to end (GCD is in A)

; temp = A mod B (simplified: A = A - B if A >= B)
SUB              ; A = A - B
CMP              ; Check if A < 0 (underflow)
; In real implementation, would need proper modulo
JMP 2            ; Continue loop

; Address 8: GCD result is in A
STA 15           ; Store GCD result
HLT              ; End program`}
                  </pre>
                </div>
                <p className="text-gray-300 mt-4">
                  This is a simplified GCD algorithm. A complete implementation
                  would require proper modulo operations.
                </p>
              </div>

              <div className="bg-zinc-800/50 border border-zinc-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Example 3: Binary Pattern Generator
                </h3>
                <div className="bg-black/50 rounded-lg p-4 font-mono">
                  <pre className="text-green-300">
                    {`; Generate alternating bit patterns
; Store patterns: 0101, 1010, 0011, 1100

LDA 0b0101       ; A = 0101 (5)
STA 10           ; Store pattern 1

BW_NOT           ; A = ~A = 1010 (10)
STA 11           ; Store pattern 2

LDA 0b0011       ; A = 0011 (3)
STA 12           ; Store pattern 3

BW_NOT           ; A = ~A = 1100 (12)
STA 13           ; Store pattern 4

; Create rotating pattern
LDA 0b1000       ; Start with 1000
STA 14           ; Store original
ROR 1            ; Rotate right: 0100
STA 15           ; Store rotated

HLT              ; End program`}
                  </pre>
                </div>
                <p className="text-gray-300 mt-4">
                  This program demonstrates bit manipulation and pattern
                  generation techniques.
                </p>
              </div>
            </div>
          </section>

          {/* Advanced Concepts */}
          <section id="advanced" className="scroll-mt-8">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">
              🎓 Advanced Concepts
            </h2>

            <div className="space-y-6">
              <div className="bg-zinc-800/50 border border-zinc-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Memory Management
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Efficient memory usage is crucial in assembly programming.
                    Here are key strategies:
                  </p>
                  <ul className="space-y-2 text-gray-300 ml-6">
                    <li>
                      • <strong>Stack Simulation:</strong> Use consecutive
                      memory addresses as a stack
                    </li>
                    <li>
                      • <strong>Data Structures:</strong> Implement arrays and
                      tables in memory
                    </li>
                    <li>
                      • <strong>Memory Pools:</strong> Organize memory by data
                      type and usage
                    </li>
                  </ul>

                  <div className="bg-black/50 rounded-lg p-4 font-mono">
                    <pre className="text-green-300">
                      {`; Stack implementation example
; Stack pointer at address 0, stack starts at address 50

mem[0] = 50      ; Initialize stack pointer

; Push value 7 onto stack
LDA 0            ; Load stack pointer
LDB 7            ; Value to push
STA 1            ; Store SP temporarily
LDA 1            ; Get SP value
STA              ; Store value at SP address
LDA 0            ; Load SP
INC              ; Increment SP
STA 0            ; Update SP`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-800/50 border border-zinc-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Optimization Techniques
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Register Allocation:
                    </h4>
                    <div className="bg-black/50 rounded-lg p-4 font-mono">
                      <pre className="text-green-300">
                        {`; Keep frequently used values in registers
; Use A for main computation, B for constants

LDB 10           ; Keep constant in B
LDA 5            ; Main value in A
ADD              ; A = A + B
; Continue using A for calculations
INC              ; A = A + 1
; B still contains 10 for reuse`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-800/50 border border-zinc-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Code Organization
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Structure your assembly programs for maintainability:
                  </p>
                  <ul className="space-y-2 text-gray-300 ml-6">
                    <li>
                      • <strong>Comments:</strong> Document every section and
                      complex operation
                    </li>
                    <li>
                      • <strong>Subroutines:</strong> Simulate function calls
                      with jumps
                    </li>
                    <li>
                      • <strong>Constants:</strong> Define constants at the
                      beginning
                    </li>
                    <li>
                      • <strong>Memory Map:</strong> Plan memory layout before
                      coding
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Troubleshooting */}
          <section id="troubleshooting" className="scroll-mt-8">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">
              🔍 Troubleshooting Guide
            </h2>

            <div className="space-y-6">
              <div className="bg-red-900/20 border border-red-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-red-400 mb-4">
                  Common Error Messages
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      ❌ "Operand out of range (0-15)"
                    </h4>
                    <p className="text-gray-300 mb-2">
                      <strong>Cause:</strong> Using a value larger than 15 for
                      instruction operands
                    </p>
                    <p className="text-gray-300 mb-2">
                      <strong>Solution:</strong> Use values 0-15 only, or break
                      large values into multiple operations
                    </p>
                    <div className="bg-black/50 rounded-lg p-3 font-mono">
                      <pre className="text-red-300">
                        LDA 20 ; ❌ Error: 20 &gt; 15
                      </pre>
                      <pre className="text-green-300">
                        LDA 15 ; ✅ Correct: 15 ≤ 15
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      ❌ "Shift amount out of range (0-7)"
                    </h4>
                    <p className="text-gray-300 mb-2">
                      <strong>Cause:</strong> Shift operations only support 0-7
                      positions
                    </p>
                    <p className="text-gray-300 mb-2">
                      <strong>Solution:</strong> Use shift amounts between 0-7
                    </p>
                    <div className="bg-black/50 rounded-lg p-3 font-mono">
                      <pre className="text-red-300">
                        SHL 8 ; ❌ Error: 8 &gt; 7
                      </pre>
                      <pre className="text-green-300">
                        SHL 3 ; ✅ Correct: 3 ≤ 7
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      ❌ "Unexpected operand for opcode"
                    </h4>
                    <p className="text-gray-300 mb-2">
                      <strong>Cause:</strong> Providing operands to 5-bit
                      instructions that don't need them
                    </p>
                    <p className="text-gray-300 mb-2">
                      <strong>Solution:</strong> Remove operands from arithmetic
                      and bitwise instructions
                    </p>
                    <div className="bg-black/50 rounded-lg p-3 font-mono">
                      <pre className="text-red-300">
                        ADD 5 ; ❌ Error: ADD doesn't take operands
                      </pre>
                      <pre className="text-green-300">
                        ADD ; ✅ Correct: No operand needed
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-yellow-400 mb-4">
                  ⚠️ Common Programming Mistakes
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Infinite Loops
                    </h4>
                    <div className="bg-black/50 rounded-lg p-3 font-mono">
                      <pre className="text-red-300">{`; ❌ Infinite loop - counter never changes
JMP 0     ; Jumps to itself forever`}</pre>
                      <pre className="text-green-300">{`; ✅ Proper loop with exit condition
LDA 5     ; Counter
DEC       ; Decrement
JNZ 1     ; Jump back if not zero`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Register Overwriting
                    </h4>
                    <div className="bg-black/50 rounded-lg p-3 font-mono">
                      <pre className="text-red-300">{`; ❌ Losing important data
LDA 10    ; Important value
LDA 5     ; Overwrites previous value!`}</pre>
                      <pre className="text-green-300">{`; ✅ Preserve data in memory
LDA 10    ; Important value
STA 15    ; Save it first
LDA 5     ; Now safe to load new value`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Missing HLT Instruction
                    </h4>
                    <div className="bg-black/50 rounded-lg p-3 font-mono">
                      <pre className="text-red-300">{`; ❌ Program continues executing random memory
LDA 5
ADD
; Missing HLT - undefined behavior`}</pre>
                      <pre className="text-green-300">{`; ✅ Proper program termination
LDA 5
ADD
HLT       ; Always end with HLT`}</pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">
                  💡 Debugging Tips
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    • <strong>Use the output table:</strong> Check instruction
                    addresses and binary values
                  </li>
                  <li>
                    • <strong>Step through execution:</strong> Manually trace
                    through each instruction
                  </li>
                  <li>
                    • <strong>Check memory layout:</strong> Verify data is
                    stored where expected
                  </li>
                  <li>
                    • <strong>Add debug prints:</strong> Use STA to store
                    intermediate values
                  </li>
                  <li>
                    • <strong>Start simple:</strong> Test small programs before
                    building complex ones
                  </li>
                  <li>
                    • <strong>Comment extensively:</strong> Document your logic
                    for easier debugging
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-zinc-700 pt-8 pb-4 text-center">
            <p className="text-gray-400">
              🎉 Congratulations! You've completed the Assembly Language
              Tutorial.
              <br />
              Start coding in the{" "}
              <a
                href="/"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Home
              </a>{" "}
              page!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
