<script lang="ts">
  import { toSeconds } from "./utilities";
  export let timeRemaining: number;
</script>

<timer>
  {Math.floor(toSeconds(timeRemaining) / 60)}:{(toSeconds(timeRemaining) % 60)
    .toString()
    .padStart(2, '0')}
</timer>
