<script lang="ts">
  import type { Word } from "./types";
  export let wordRows: Word[][];
  export let wordIndex: number;
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
  }

  word {
    margin-right: 0.5rem;
  }

  .current {
    color: #f8f8f2;
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
  {#each wordRows as wordRow, rowIndex}
    <div>
      {#each wordRow as word}
        <word>
          {#if word.index === wordIndex && rowIndex === 0}
            <span class="current">{word.text}</span>
          {:else if word.status === 'correct'}
            <span class="correct">{word.text}</span>
          {:else if word.status === 'incorrect'}
            <span class="incorrect">{word.text}</span>
          {:else}
            <span class="pending">{word.text}</span>
          {/if}
        </word>
      {/each}
    </div>
  {/each}
</main>
