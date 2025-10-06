# 🔧 Assembly Code Editor & Assembler

A modern, web-based assembly language editor and assembler built with React, TypeScript, and Vite. This project provides an interactive environment for writing, assembling, and learning assembly language programming with a custom instruction set.

## ✨ Features

- **🖥️ Interactive Code Editor**: Write assembly code with syntax highlighting
- **⚡ Real-time Assembly**: Convert assembly instructions to binary and hexadecimal
- **💾 Program Management**: Save, load, and manage your assembly programs locally
- **📊 Visual Output**: View assembled code in multiple formats (binary, hex, instruction table)
- **📚 Learning Resources**: Comprehensive documentation and tutorials
- **🎨 Modern UI**: Clean, responsive interface built with Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/FarhanXTanvir/SAP1
   cd assembler
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start using the assembler.

### Building for Production

```bash
pnpm build
# or
npm run build
```

## 📖 Usage

### Writing Assembly Code

1. **Navigate to the Home page** to access the code editor
2. **Write your assembly code** using the supported instruction set
3. **Click "Assemble"** to convert your code to machine language
4. **View the output** in binary, hexadecimal, and tabular formats
5. **Save your programs** for later use with custom titles

### Example Program

```assembly
LDA 5        ; Load immediate value 5 into accumulator A
LDB 3        ; Load immediate value 3 into accumulator B
ADD          ; Add B to A
STA 10       ; Store result at memory address 10
HLT          ; Halt program execution
```

### Memory Instructions

You can also initialize memory locations using the `mem[]` syntax:

```assembly
mem[0] = 0x0A    ; Set memory address 0 to hexadecimal 0A
mem[1] = 0b1010  ; Set memory address 1 to binary 1010
mem[2] = 15      ; Set memory address 2 to decimal 15
```

## 🔧 Instruction Set Reference

The assembler supports a comprehensive instruction set with both 4-bit and 5-bit opcodes:

### Data Movement Instructions

| Opcode | Binary | Description                             | Example  |
| ------ | ------ | --------------------------------------- | -------- |
| LDA    | 0000   | Load immediate value into accumulator A | `LDA 5`  |
| LDB    | 0001   | Load immediate value into accumulator B | `LDB 3`  |
| STA    | 0010   | Store accumulator A to memory address   | `STA 10` |

### Control Flow Instructions

| Opcode | Binary | Description                   | Example |
| ------ | ------ | ----------------------------- | ------- |
| JMP    | 0011   | Unconditional jump to address | `JMP 8` |
| JZ     | 0100   | Jump if zero flag is set      | `JZ 5`  |
| JNZ    | 0101   | Jump if zero flag is not set  | `JNZ 7` |

### Shift and Rotate Instructions

| Opcode | Binary | Description                           | Example |
| ------ | ------ | ------------------------------------- | ------- |
| SHL    | 0110   | Shift left by specified amount (0-7)  | `SHL 2` |
| SHR    | 0111   | Shift right by specified amount (0-7) | `SHR 1` |
| ROL    | 1000   | Rotate left by specified amount       | `ROL 3` |
| ROR    | 1001   | Rotate right by specified amount      | `ROR 2` |

### Arithmetic Instructions (5-bit opcodes)

| Opcode | Binary | Description                   | Example |
| ------ | ------ | ----------------------------- | ------- |
| ADD    | 01010  | Add accumulator B to A        | `ADD`   |
| SUB    | 01011  | Subtract accumulator B from A | `SUB`   |
| INC    | 01100  | Increment accumulator A       | `INC`   |
| DEC    | 01101  | Decrement accumulator A       | `DEC`   |
| REV    | 01110  | Reverse bits in accumulator A | `REV`   |

### Control Instructions (5-bit opcodes)

| Opcode | Binary | Description                  | Example |
| ------ | ------ | ---------------------------- | ------- |
| HLT    | 01111  | Halt program execution       | `HLT`   |
| NOP    | 11010  | No operation                 | `NOP`   |
| CMP    | 11011  | Compare accumulators A and B | `CMP`   |

### Bitwise Operations (5-bit opcodes)

| Opcode | Binary | Description                  | Example  |
| ------ | ------ | ---------------------------- | -------- |
| BW_OR  | 11100  | Bitwise OR of A and B        | `BW_OR`  |
| BW_AND | 11101  | Bitwise AND of A and B       | `BW_AND` |
| BW_NOT | 11110  | Bitwise NOT of accumulator A | `BW_NOT` |
| BW_XOR | 11111  | Bitwise XOR of A and B       | `BW_XOR` |

### Operand Formats

The assembler supports multiple operand formats:

- **Decimal**: `LDA 15` (loads decimal 15)
- **Hexadecimal**: `LDA 0xF` (loads hexadecimal F = decimal 15)
- **Binary**: `LDA 0b1111` (loads binary 1111 = decimal 15)

### Constraints

- **Operand Range**: 0-15 (4-bit values)
- **Shift Amounts**: 0-7 for SHL/SHR operations
- **Memory Addresses**: 0-255 (8-bit addressing)

## 🏗️ Project Structure

```
src/
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
├── CodeEditor.tsx       # Assembly code editor component
├── Header.tsx           # Navigation header
├── pages/
│   ├── Home.tsx         # Main editor page
│   └── Learn.tsx        # Documentation and tutorials
├── scripts/
│   └── assembler.ts     # Core assembler logic
└── assets/              # Static assets
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Code Quality**: ESLint with TypeScript support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📝 Development

### Code Style

The project uses ESLint with TypeScript and React-specific rules. Run the linter with:

```bash
pnpm lint
# or
npm run lint
```

### Building and Testing

```bash
# Development build
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with modern web technologies for an optimal developer experience
- Inspired by classic assembly language programming and computer architecture concepts
- Designed for educational purposes and learning assembly language fundamentals

---

**Happy Coding! 🎉**
