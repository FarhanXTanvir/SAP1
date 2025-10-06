const opcodePattern =
  /\b(LDA|LDB|STA|JMP|JZ|JNZ|SHL|SHR|RCL|RCR|ADD|SUB|INC|DEC|REV|HLT|NOP|CMP|BW_OR|BW_AND|BW_NOT|BW_XOR)\s*(\w+)?\b/;

// possible pattern: mem[12] = 5 or mem[0x0C] = 0b01 or mem[0b01] = 0x0C
const memPattern =
  /\bmem\[(0x[0-9a-fA-F]+|0b[01]+|\d+)\]\s*=\s*(0x[0-9a-fA-F]+|0b[01]+|\d+)\b/;
const commentPattern = /(;.*)/;

export default function highlight(code: string) {
  return code
    .split("\n")
    .map((line) => {
      line = line.trim();
      if (line.startsWith(";")) {
        line = line.replace(
          commentPattern,
          (match) => `<span class="text-gray-500">${match}</span>`
        );
        return line;
      }
      line = line.replace(
        opcodePattern,
        (_, opcode, operand) =>
          `<span class="font-bold text-yellow-300">${opcode}</span> <span class="text-blue-500">${
            operand ?? ""
          }</span>`
      );
      line = line.replace(memPattern, (memStr, addr, val) => {
        const spaces = memStr.match(/\s*=\s*/g) || [];
        return `<span class="text-teal-300">mem[<span class="text-green-500">${addr}</span>]</span><span>${
          spaces.length === 0 ? "=" : spaces.join("=")
        }</span><span class="text-blue-500">${val}</span>`;
      });
      line = line.replace(
        commentPattern,
        (match) => `<span class="text-gray-500">${match}</span>`
      );
      if (
        !opcodePattern.test(line) &&
        !memPattern.test(line) &&
        !commentPattern.test(line)
      ) {
        line = `<span class="text-white/80">${line}</span>`;
      }
      return line;
    })
    .join("\n");
}
