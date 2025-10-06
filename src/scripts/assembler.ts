const opcodes = {
  LDA: "0000",
  LDB: "0001",
  STA: "0010",
  JMP: "0011",
  JZ: "0100",
  JNZ: "0101",
  SHL: "0110",
  SHR: "0111",
  ROL: "1000",
  ROR: "1001",
  ADD: "01010",
  SUB: "01011",
  INC: "01100",
  DEC: "01101",
  REV: "01110",
  HLT: "01111",
  NOP: "11010",
  CMP: "11011",
  BW_OR: "11100",
  BW_AND: "11101",
  BW_NOT: "11110",
  BW_XOR: "11111",
};

const binaryToHex = (binary: string) => {
  const hex = parseInt(binary, 2).toString(16).padStart(2, "0");
  return hex;
};

const decimalToHex = (decimal: number) => {
  const hex = decimal.toString(16).padStart(2, "0");
  return hex;
};

const decimalToBinary = (decimal: number) => {
  const binary = decimal.toString(2).padStart(4, "0");
  return binary;
};

const hexToBinary = (hex: string) => {
  const binary = parseInt(hex, 16).toString(2).padStart(4, "0");
  return binary;
};

const processMemInstruction = (memInstruction: string) => {
  const memRegex = /mem\[(\w+)\]\s*=\s*(\w+)/;
  const [, addr, val] = memInstruction.match(memRegex) || [];

  if (!addr || !val) {
    throw new Error(`Invalid memory instruction: ${memInstruction}`);
  }
  let decimalVal;
  let binaryVal;
  let hexVal;
  let decimalAddr;

  const valRegex = /^(0x[0-9a-fA-F]+|0b[01]+|\d+)$/;
  if (!valRegex.test(addr)) {
    throw new Error(`Invalid memory address format: ${addr}`);
  }
  if (!valRegex.test(val)) {
    throw new Error(`Invalid memory value format: ${val}`);
  }

  // case 1: addr is in decimal
  if (/^\d+$/.test(addr)) {
    if (parseInt(addr) > 15) {
      throw new Error(`Memory address out of range (0-15): ${addr}`);
    }
    decimalAddr = parseInt(addr);
  }

  // case 2: addr is in hex
  else if (/^0x[0-9a-fA-F]+$/.test(addr)) {
    if (parseInt(addr.slice(2), 16) > 15) {
      throw new Error(`Memory address out of range (0-15): ${addr}`);
    }
    const hexAddr = addr.slice(2);
    decimalAddr = parseInt(hexAddr, 16);
  }

  // case 3: addr is in binary
  else if (/^0b[01]+$/.test(addr)) {
    if (parseInt(addr.slice(2), 2) > 15) {
      throw new Error(`Memory address out of range (0-15): ${addr}`);
    }
    const binaryAddr = addr.slice(2);
    decimalAddr = parseInt(binaryAddr, 2);
  } else {
    throw new Error(`Invalid address format: ${addr}`);
  }

  // case 1: value is in decimal
  if (/^\d+$/.test(val)) {
    if (parseInt(val) > 255) {
      throw new Error(`Memory value out of range (0-255): ${val}`);
    }
    decimalVal = parseInt(val.padStart(2, "0"));
    binaryVal = decimalToBinary(decimalVal).padStart(8, "0");
    hexVal = decimalToHex(decimalVal);
  }
  // case 2: value is in hex
  else if (/^0x[0-9a-fA-F]+$/.test(val)) {
    if (parseInt(val.slice(2), 16) > 255) {
      throw new Error(`Memory value out of range (0-255): ${val}`);
    }
    hexVal = val.slice(2).padStart(2, "0"); // Remove the 0x prefix
    binaryVal = hexToBinary(hexVal).padStart(8, "0"); // Convert hex to binary
    console.log({ hexVal, binaryVal });
  }
  // case 3: value is in binary
  else if (/^0b[01]+$/.test(val)) {
    if (parseInt(val.slice(2), 2) > 255) {
      throw new Error(`Memory value out of range (0-255): ${val}`);
    }
    binaryVal = val.slice(2).padStart(8, "0"); // Remove the 0b prefix
    hexVal = binaryToHex(binaryVal); // Convert binary to hex
  } else {
    throw new Error(`Invalid value format: ${val}`);
  }
  return {
    memInstruction: {
      instruction: memInstruction,
      binary: binaryVal,
      hex: hexVal,
    },
    address: decimalAddr,
  };
};

export default function assemble(program: string) {
  const ram = new Array(16).fill({
    instruction: "",
    binary: "00000000",
    hex: "00",
  });
  const instructions = [];
  const memory = [];
  let error = "";
  const validItems = program
    .split("\n")
    .map((item) => item.split(";")[0].trim())
    .filter((instr) => instr !== "" && !instr.startsWith(";"));

  for (let index = 0; index < validItems.length; index++) {
    const item = validItems[index];

    if (item.startsWith("mem")) {
      try {
        const { memInstruction, address } = processMemInstruction(item);
        memory.push({ memInstruction, address });
      } catch (err) {
        error = `Error processing memory instruction at line ${index + 1}: ${
          err instanceof Error ? err.message : String(err)
        }`;
        break;
      }
      continue;
    } else {
      const [opcode, operand] = item.split(" ") as [
        keyof typeof opcodes,
        string
      ];

      if (!(opcode in opcodes)) {
        error = `Invalid opcode: ${opcode} at line ${index + 1}`;
        break;
      }
      let opcodeBinary, operandBinary;
      opcodeBinary = opcodes[opcode.trim() as keyof typeof opcodes];
      if (opcodeBinary.length === 4) {
        if (!operand) {
          error = `Missing operand for opcode: ${opcode} at line ${index + 1}`;
          break;
        } else if (!/^(0x[0-9a-fA-F]+|0b[01]+|\d+)$/.test(operand)) {
          error = `Invalid operand format: ${operand} at line ${index + 1}`;
          break;
        }

        operandBinary = (
          operand.startsWith("0x")
            ? hexToBinary(operand.slice(2))
            : operand.startsWith("0b")
            ? operand.slice(2) // Remove 0b prefix
            : decimalToBinary(parseInt(operand))
        ).padStart(4, "0"); // Ensures 4-bit representation
        if (/^(SHL|SHR|RCL|RCR)$/.test(opcode)) {
          if (parseInt(operandBinary, 2) > 7) {
            error = `Shift amount out of range (0-7): ${operand} at line ${
              index + 1
            }`;
            break;
          }
        }
      } else if (opcodeBinary.length === 5) {
        if (operand) {
          error = `Unexpected operand for opcode: ${opcode} at line ${
            index + 1
          }`;
          break;
        }
        operandBinary = "000" + opcodeBinary[0]; // Used first bit of opcode as operand. Actually opcode is 5 bits. 1 Bit is borrowed from operand to make it 5 bits
        opcodeBinary = opcodeBinary.slice(1); // Use only last 4 bits of opcode
      } else {
        error = `Invalid opcode length for: ${opcode} at line ${index + 1}`;
        break;
      }

      // Operand Formats: 5 (This is decimal), 0x5 (This is hex) and 0b01 (This is binary)
      if (operandBinary.length > 4) {
        error = `Operand out of range (0-15): ${operand} at line ${index + 1}`;
        break;
      }
      const binaryInstruction = `${opcodeBinary}${operandBinary}`;
      instructions.push({
        instruction: item,
        binary: binaryInstruction,
        hex: binaryToHex(binaryInstruction).padStart(2, "0"),
      });
    }
  }

  instructions.forEach((line, index) => {
    ram[index] = {
      instruction: line.instruction,
      binary: line.binary,
      hex: line.hex,
    };
  });
  memory.forEach((line) => {
    ram[line.address] = line.memInstruction;
  });

  return { ram, error };
}
