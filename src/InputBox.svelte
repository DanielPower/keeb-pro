<script lang="ts">
  import { tick } from "svelte";
  export let currentWord: string;
  export let onCompleteWord: (correct: boolean) => void;
  export let onKeyUp: () => void;
  let userInput: string = "";

  const handleKeyUp = async (event: KeyboardEvent) => {
    onKeyUp();
    if (event.key === " ") {
      await tick();
      const [submission, ...rest] = userInput.split(" ");
      if (userInput !== " ") {
        onCompleteWord(submission === currentWord);
      }
      userInput = rest.join("");
    }
  };
</script>

<style>
  input {
    width: 100%;
    background: none;
    border: none;
    padding: 0;
    color: inherit;
  }
</style>

<input bind:value={userInput} on:keyup={handleKeyUp} />
