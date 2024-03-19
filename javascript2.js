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

function processLogs(logs, maxSpan) {
  const parsedLogs = logs.map((log) => {
    // First we create an array of objects to get the attributes
    const [id, timestamp, eventType] = log.split(" "); // Destructuring to get each part of the string "30 10 sign-in"
    return {
      // Each key value is stored
      id: parseInt(id),
      timestamp: parseInt(timestamp),
      eventType,
    };
  }); // At the end the array comes like [{ id:99, timestamp: 1, eventType: 'sign-in'}, {...}]
  console.log("parsedLogs", parsedLogs);

  const groupedLogs = parsedLogs.reduce((acc, log) => {
    // Here we group each log by the id
    if (!acc[log.id]) {
      // First if we dont have the key of the log id
      acc[log.id] = []; // We create the key and add an empty array
    }
    acc[log.id].push(log); // Then we enter the entire log into the arrray (Here each log is an object)
    return acc;
  }, {}); // At the end the object groupedLogs ends up like { "50": [{id: 50, timestamp: 20, eventType: "sign-in"}, {... eventType: 'sign-out'}], "99": ...}

  const differences = []; // Now we create an empty array to store the differences
  for (const id in groupedLogs) {
    // For each key in groupedLogs
    const group = groupedLogs[id]; // Each group is the array containg the pairings sign-in sign-out
    if (group.length >= 2) {
      // If we have the 2 objects sign-in and sign-out
      const signInEvent = group.find((log) => log.eventType === "sign-in"); // We find the events, each log is an object so we find by the eventType key
      const signOutEvent = group.find((log) => log.eventType === "sign-out");
      if (signInEvent && signOutEvent) {
        // If we found both events
        const difference = signOutEvent.timestamp - signInEvent.timestamp; // This is the difference between sign-out and sign-in
        if (difference <= maxSpan) {
          // If the difference is less than or equal to the given span
          differences.push(signInEvent.id); // We populate the differences array with the id (signInEvent.id or SignOutEvent.id are the same)
        }
      }
    }
  }

  return differences; // Finally we return the differences array
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
