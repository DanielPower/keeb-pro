<script lang="ts">
  import { tick } from "svelte";
  export let currentWord: string;
  export let onCompleteWord: (correct: boolean) => void;
  export let onKeyUp: () => void;
  export let disabled: boolean;
  export let value: string = "";

  const handleKeyUp = async (event: KeyboardEvent) => {
    onKeyUp();
    if (event.key === " ") {
      await tick();
      const [submission, ...rest] = value.split(" ");
      if (value !== " ") {
        onCompleteWord(submission === currentWord);
      }
      value = rest.join("");
    }
  };
</script>

<input {disabled} bind:value on:keyup={handleKeyUp} />

<style>
  input {
    width: 100%;
    background: none;
    border: none;
    padding: 0;
    color: inherit;
  }
</style>
