<script lang="ts">
  import type { WordList } from "./types";
  export let wordList: WordList;
  export let wordIndex: number;
  console.log(wordList);
</script>

<style>
  main {
    background: #44475a;
    padding: 1rem;
    height: 4.5rem;
    border-radius: 0.25rem;
    overflow: hidden;
    font-size: 1.5rem;
    line-height: 2.5rem;
    text-align: left;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  word {
    margin-right: 0.5rem;
  }

  .current {
    color: f8f8f2;
    background: #44665a;
    border-radius: 0.25rem;
  }

  .pending {
    color: #f8f8f2;
  }

  .correct {
    color: #50fa7b;
  }

  .incorrect {
    color: #ff79c6;
  }
</style>

<main>
  {#each wordList as word, i}
    <word>
      {#if i === wordIndex}
        <span class="current">{word.word}</span>
      {:else if word.status === 'correct'}
        <span class="correct">{word.word}</span>
      {:else if word.status === 'incorrect'}
        <span class="incorrect">{word.word}</span>
      {:else}
        <span class="pending">{word.word}</span>
      {/if}
    </word>
  {/each}
</main>
