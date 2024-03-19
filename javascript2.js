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
 * Complete the 'processLogs' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. STRING_ARRAY logs
 *  2. INTEGER maxSpan
 */

function processLogs(logs, maxSpan) {
  const parsedLogs = logs.map((log) => {
    const [id, timestamp, eventType] = log.split(" ");
    return {
      id: parseInt(id),
      timestamp: parseInt(timestamp),
      eventType,
    };
  });

  const groupedLogs = parsedLogs.reduce((acc, log) => {
    if (!acc[log.id]) {
      acc[log.id] = [];
    }
    acc[log.id].push(log);
    return acc;
  }, {});

  const differences = [];
  for (const id in groupedLogs) {
    const group = groupedLogs[id];
    if (group.length >= 2) {
      const signInEvent = group.find((log) => log.eventType === "sign-in");
      const signOutEvent = group.find((log) => log.eventType === "sign-out");
      if (signInEvent && signOutEvent) {
        const difference = signOutEvent.timestamp - signInEvent.timestamp;
        if (difference <= maxSpan) {
          differences.push(signInEvent.id);
        }
      }
    }
  }

  return differences;
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

  const logsCount = parseInt(readLine().trim(), 10);

  let logs = [];

  for (let i = 0; i < logsCount; i++) {
    const logsItem = readLine();
    logs.push(logsItem);
  }

  const maxSpan = parseInt(readLine().trim(), 10);

  const result = processLogs(logs, maxSpan);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
