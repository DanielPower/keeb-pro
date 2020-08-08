export type WordStatus = "correct" | "incorrect" | "pending";

export type WordList = Array<{
  word: string;
  status: WordStatus;
}>;
