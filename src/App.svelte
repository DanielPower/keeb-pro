<script lang="ts">
  import { onMount } from "svelte";
  import DisplayBox from "./DisplayBox.svelte";
  import InputBox from "./InputBox.svelte";
  import Timer from "./Timer.svelte";
  import { getRow } from "./utilities";

  const TEST_TIMES = [15000, 30000, 60000, 120000, 300000];

  let currentRow = [];
  let nextRow = [];
  let wordIndex = 0;
  let testTime = 60000;
  let timeElapsed = 0;
  let timeRemaining = testTime;
  let startTime: number;
  let wpm = undefined;
  let correctCharacters = 0;
  let incorrectCharacters = 0;
  let displayBox: HTMLElement;
  let state: "ready" | "running" | "stopped" = "ready";
  let userInput = "";

  const onCompleteWord = (correct: boolean) => {
    const word = currentRow[wordIndex];
    if (correct) {
      correctCharacters += word.text.length + 1;
      word.status = "correct";
    } else {
      incorrectCharacters += word.text.length + 1;
      word.status = "incorrect";
    }
    wordIndex += 1;
    if (wordIndex === currentRow.length) {
      currentRow = nextRow;
      nextRow = getRow(displayBox);
      wordIndex = 0;
    }
  };

  let timerStep = () => {
    if (state === "running") {
      timeElapsed = Date.now() - startTime;
      timeRemaining = testTime - timeElapsed;
      wpm = Math.floor((correctCharacters / 5 / timeElapsed) * 60000);
      if (timeElapsed > testTime) {
        state = "stopped";
        timeElapsed = 0;
        timeRemaining = testTime;
      } else {
        setTimeout(timerStep, 200);
      }
    }
  };

  const startTimer = () => {
    if (state === "ready") {
      state = "running";
      startTime = Date.now();
      timerStep();
    }
  };

  const restartTimer = () => {
    state = "ready";
    timeElapsed = 0;
    startTime = null;
    timeRemaining = testTime;
    currentRow = getRow(displayBox);
    nextRow = getRow(displayBox);
    userInput = "";
    wordIndex = 0;
  };

  const changeTimer = () => {
    console.log(state);
    if (state === "ready") {
      testTime =
        TEST_TIMES[(TEST_TIMES.indexOf(testTime) + 1) % TEST_TIMES.length];
      console.log(testTime);
      timeRemaining = testTime;
    }
  };

  onMount(() => {
    currentRow = getRow(displayBox);
    nextRow = getRow(displayBox);
  });
</script>

<main>
  <!-- TODO do something better than these wrappers -->
  <mainWrapper>
    <h1>Keeb Pro</h1>
  </mainWrapper>
  <mainWrapper>
    <DisplayBox
      bind:element={displayBox}
      wordRows={[currentRow, nextRow]}
      {wordIndex}
    />
  </mainWrapper>
  <mainWrapper>
    <inputPane>
      <inputWrapper>
        <InputBox
          disabled={state === 'stopped'}
          currentWord={(state === 'running' && currentRow[wordIndex].text) || null}
          onKeyUp={startTimer}
          bind:value={userInput}
          {onCompleteWord}
        />
      </inputWrapper>
      <inputWrapper>
        <wpm>{wpm || ''}</wpm>
      </inputWrapper>
      <inputWrapper on:click={changeTimer}>
        <Timer {timeRemaining} />
      </inputWrapper>
      <inputWrapper on:click={restartTimer}>Restart</inputWrapper>
    </inputPane>
  </mainWrapper>
</main>

<style>
  :global(html) {
    background: #282a36;
  }

  :global(body) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  * {
    box-sizing: border-box;
  }

  main {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 50rem;
  }

  h1 {
    color: #7bda7c;
    text-transform: uppercase;
    font-size: 3.5em;
    font-weight: 400;
  }

  inputPane {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }

  inputWrapper {
    margin-right: 1rem;
    width: 10rem;
    height: 4rem;
    background: #44475a;
    border-radius: 0.25rem;
    font-size: 1.5rem;
    padding: 1rem;
    color: #f8f8f2;
  }

  inputWrapper:first-child {
    width: 100%;
  }

  inputWrapper:last-child {
    margin-right: 0;
  }

  mainWrapper {
    margin-bottom: 1rem;
    width: 100%;
  }
</style>
