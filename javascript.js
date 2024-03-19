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

function groupTransactions(transactions) {
  // First we create an empty object to keep the counts
  const counts = {};

  // For each transaction we create the key tx or add one if already created
  transactions.forEach((tx) => {
    counts[tx] = (counts[tx] || 0) + 1; // If counts has the key tx add 1, otherwise start in 0 and add 1
  });
  // Here we have an object with tx as the keys and the counts as the values
  // Ex. { prune: 2, banana: 1 }
  // I transform the object counts into an array for the return and order it
  const countsArray = Object.entries(counts).map(
    ([tx, count]) => `${tx} ${count}` // This array receives each object entry in a string so the array ends up like ["prune 2", "banana 1"]
  );

  countsArray.sort((a, b) => {
    // Now it's time to order the array
    const countA = parseInt(a.split(" ")[1]); // We get the counts from the array items: "prune 2" gets the 2
    const countB = parseInt(b.split(" ")[1]);
    if (countA === countB) {
      // First if the counts are the same
      const itemA = a.split(" ")[0]; // We get the tx names, same as with the counts: "prune 2" gets prune
      const itemB = b.split(" ")[0];
      return itemA.localeCompare(itemB); // We compare alphabetically with locale, 1 indicates that itemB comes before itemA
    }
    return countB - countA; // We compare counts, positive numbers means countB comes before countA
  });
  return countsArray; // Finally we return the sorted array
}

function main() {
  const ws = process.stdout;

  const transactionsCount = parseInt(readLine().trim(), 10);

  let transactions = [];

  for (let i = 0; i < transactionsCount; i++) {
    const transactionsItem = readLine();
    transactions.push(transactionsItem);
  }

  const result = groupTransactions(transactions);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
