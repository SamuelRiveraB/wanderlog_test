"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");
  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'aPlusB' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING_ARRAY transactions as parameter.
 */

function aPlusB(lines) {
  const results = [lines.length];

  for (let i = 0; i < lines.length; i++) {
    const digits = lines[i].split(" ").map(Number);
    results.push(digits[0] + digits[1]);
  }
  return results;
  // Write your code here
  //
  // WARNING: Please do not use GitHub Copilot, ChatGPT, or other AI assistants
  //          when solving this problem!
  //
  // We use these tools in our coding too, but in our interviews, we also don't
  // allow using these, and want to see how we do without them.
  //
}

function main() {
  const ws = process.stdout;

  const linesCount = parseInt(readLine().trim(), 10);
  let lines = [];

  for (let i = 0; i < linesCount; i++) {
    const line = readLine();
    lines.push(line);
  }

  const result = aPlusB(lines);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
