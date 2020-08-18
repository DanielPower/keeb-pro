import type { Word } from "./types";

export const toSeconds = (milliseconds: number) =>
  Math.floor(milliseconds / 1000);

export const toMinutes = (milliseconds: number) =>
  Math.floor(milliseconds / 60000);

export const getRow = (words: string[]): Word[] => {
  const container = document.createElement("div");
  container.style.fontSize = "1.5rem";
  document.body.appendChild(container);
  let count = 0;
  while (container.getBoundingClientRect().width < 600) {
    container.innerHTML += `${words.pop()} `;
    count += 1;
  }
  document.body.removeChild(container);

  const row: Word[] = [];
  for (let index = 0; index < count; index += 1) {
    row.push({
      index,
      text: words.pop(),
      status: "pending",
    });
  }

  return row;
};
