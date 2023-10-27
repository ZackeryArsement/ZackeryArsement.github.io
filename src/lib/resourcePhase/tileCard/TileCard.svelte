<script>
    export let tileType;
    export let value;
    export let updateTileValue;

    function updateValue(newValue) {
        let updateValue = removeLeadingZeros(newValue);

        localStorage.setItem(tileType, updateValue)
        updateTileValue(tileType, newValue);
    }

    function removeLeadingZeros(numberStr) {
        // Use regular expression to remove leading zeros
        return String(numberStr).replace(/^0+/, '');
    }
</script>
<main>
    <div class='resource'>
        {tileType}
    </div>
    <input class='value' bind:value={value} placeholder=0 type="number" on:change={() => updateValue(value)}/>
</main>

<style>
    main{
        margin-top: 0.5rem;
        border-radius: 12%;
        padding: 1.5px;
        width: 22vw;
        height: 22vw;
        background-color: var(--lightYellow);
        font-weight: 600;
        font-size: 1em;
    }
    .resource{
        margin-bottom: 0.5em;
    }
    .value{
        width: 80%;
        font-size: 1em;
        background-color: var(--lightYellow);
        border-radius: 10%;
        text-align: center;
    }

</style>