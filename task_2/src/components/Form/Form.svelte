<script lang="ts">
    import { onMount } from 'svelte';
    import Input from '../Input/input.svelte';
    import { fetchRates } from '../../utils/currencyUtils';
    import { convert } from '../../utils/convert';
    import { currencyTranslate } from '../../data/currencyTranslate';

    let rates = {};
    let currencyDesc = {};
    let leftValue = 1; 
    let rightValue = 1;
    let leftCurrency = 'USD';
    let rightCurrency = 'USD';

    onMount(async () => {
        try {
            const { rates: loadedRates, descriptions: loadedDescriptions } = await fetchRates();
            rates = loadedRates;
            currencyDesc = loadedDescriptions;
            rightValue = convert(leftValue, rates[leftCurrency], rates[rightCurrency]);
        } catch (error) {
            console.error("Failed to fetch rates:", error);
        }
    });

    function handleLeftInput(value) {
        leftValue = parseFloat(value);
        if (!isNaN(leftValue)) {
            rightValue = convert(leftValue, rates[leftCurrency], rates[rightCurrency]);
        } else {
            rightValue = '';
        }
    }

    function handleRightInput(value) {
        rightValue = parseFloat(value);
        if (!isNaN(rightValue)) {
            leftValue = convert(rightValue, rates[rightCurrency], rates[leftCurrency]);
        } else {
            leftValue = '';
        }
    }
</script>

<form>

    <Input  value={leftValue} onInput = {handleLeftInput}/>
    <select name='currencies' bind:value={leftCurrency} on:change="{() => handleLeftInput(leftValue)}">
      {#each Object.entries(rates) as [currency]}
        <option value={currency}>{currency} ({currencyTranslate[currencyDesc[currency]]})</option>
      {/each}
    </select>

    <span> = </span>

    <Input  value={rightValue} onInput = {handleRightInput}/>
    <select name='currencies' bind:value={rightCurrency} on:change="{() => handleRightInput(rightValue)}">
      {#each Object.entries(rates) as [currency]}
        <option value={currency}>{currency} ({currencyTranslate[currencyDesc[currency]]})</option>
      {/each}
    </select>
</form>