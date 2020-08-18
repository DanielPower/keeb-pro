export type WordStatus = "correct" | "incorrect" | "pending";

export type Word = {
  index: number;
  text: string;
  status: WordStatus;
};
