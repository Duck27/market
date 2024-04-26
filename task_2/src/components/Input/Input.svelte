<script>
    export let value;
    export let onInput;
  </script>
  
  <input type="number" min="0" bind:value={value} on:input="{e => onInput(e.target.value)}" />