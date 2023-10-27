<script>
    export let resource;
    export let value;
    export let perTurn
    export let updateCurrentResources;

    function updateValue(newValue) {
        let updateValue = removeLeadingZeros(newValue);
        updateCurrentResources(resource, updateValue);

        if(typeof updateValue !== 'number'){
            updateValue = '0';
        }

        localStorage.setItem(resource, updateValue)
    }

    function removeLeadingZeros(numberStr) {
        // Use regular expression to remove leading zeros
        return String(numberStr).replace(/^0+/, '');
    }
</script>
<main>
    <div id='resource'>
        {resource}
    </div>
    {#if perTurn}
        <div id='value'>
            +{value}
        </div>
    {:else}
        <input id='current' on:change={() => updateValue(value)} bind:value={value} type='number' placeholder=0/>
    {/if}
</main>

<style>
    main{
        margin-top: 0.5rem;
        border-radius: 12%;
        padding: 1.5px;
        width: 18vw;
        height: 18vw;
        background-color: var(--lightYellow);
        font-weight: 600;
        font-size: 1.25em;
    }
    #current{
        width: 80%;
        font-size: 1.25em;
        background-color: var(--lightYellow);
        border-radius: 15%;
        text-align: center;
    }

</style>