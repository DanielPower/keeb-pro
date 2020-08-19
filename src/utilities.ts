import type { Word } from "./types";

export const toSeconds = (milliseconds: number) =>
  Math.floor(milliseconds / 1000);

export const toMinutes = (milliseconds: number) =>
  Math.floor(milliseconds / 60000);

// TODO Someday maybe I'll find a better way to do all this
export const getRow = (words: string[], element: HTMLElement): Word[] => {
  const row = [];
  const targetWidth = element.getBoundingClientRect().width;
  const container = document.createElement("div");
  container.style.fontSize = "1.5rem";
  container.style.padding = "1rem";
  document.body.appendChild(container);
  while (container.getBoundingClientRect().width <= targetWidth) {
    const word = words.pop();
    row.push(word);
    const wordElement = document.createElement("span");
    wordElement.style.marginRight = "0.5rem";
    wordElement.innerText = word;
    container.appendChild(wordElement);
  }
  row.pop();
  document.body.removeChild(container);

  return row.map((word, index) => ({
    index,
    text: word,
    status: "pending",
  }));
};
