<script>
    import { onMount } from "svelte";

    export let tileType;
    export let value;
    export let updateTileValue;
    export let government;
    export let currentTiles;
    export let currentToggleTiles;
    export let toggle;

    let monarchyType;

    function updateValue(inputType, inputValue) {
        let updateValue = removeLeadingZeros(inputValue);

        if(!inputValue || !updateValue){
            updateValue = '0'
        }

        updateTileValue(inputType, updateValue);
        localStorage.setItem(inputType, updateValue)

        if(inputType === "Desert"){
            updateTileValue('DsrtGold', updateValue);
            localStorage.setItem('DsrtGold', updateValue)
            updateTileValue('DsrtTech', '0');
            localStorage.setItem('DsrtTech', '0')
        } else if(inputType === 'Mountain'){
            updateTileValue('MntnIron', updateValue);
            localStorage.setItem('MntnIron', updateValue)
            updateTileValue('MntnGold', '0');
            localStorage.setItem('MntnGold', '0')
        } else if(inputType === 'Swamp'){
            updateTileValue('SwmpFood', updateValue);
            localStorage.setItem('SwmpFood', updateValue)
            updateTileValue('SwmpWood', '0');
            localStorage.setItem('SwmpWood', '0')
        } else if(inputType === 'Ocean'){
            updateTileValue('OcnFood', updateValue);
            localStorage.setItem('OcnFood', updateValue)
            updateTileValue('OcnTech', '0');
            localStorage.setItem('OcnTech', '0')
        }
    }

    function removeLeadingZeros(numberStr) {
        // Use regular expression to remove leading zeros
        return String(numberStr).replace(/^0+/, '');
    }

    const addTileType = (inputType) => {
        let parentTile;
        let siblingTile;
        let siblingCount;
        let inputValue;

        if(tileType.includes("Dsrt")){
            parentTile = currentTiles.Desert;

            if(tileType.includes("Gold")){
                siblingTile = 'DsrtTech';
            } else {
                siblingTile = 'DsrtGold';
            }
        } else if(tileType.includes("Mntn")){
            parentTile = currentTiles.Mountain;

            if(tileType.includes("Gold")){
                siblingTile = 'MntnIron';
            } else {
                siblingTile = 'MntnGold';
            }
        } else if(tileType.includes("Swmp")){
            parentTile = currentTiles.Swamp;

            if(tileType.includes("Food")){
                siblingTile = 'SwmpWood';
            } else {
                siblingTile = 'SwmpFood';
            }
        } else if(tileType.includes("Ocn")){
            parentTile = currentTiles.Ocean;

            if(tileType.includes("Food")){
                siblingTile = 'OcnTech';
            } else {
                siblingTile = 'OcnFood';
            }
        }

        if(parseInt(currentToggleTiles[tileType]) < parseInt(parentTile)){
            inputValue = String(parseInt(value) + 1);
            updateValue(inputType, inputValue);

            if(parseInt(currentToggleTiles[siblingTile]) > 0){
                siblingCount =  String(parseInt(currentToggleTiles[siblingTile]) - 1)
                updateValue(siblingTile, siblingCount);
            }
        }
    }

    onMount(() => {
        monarchyType = null;

        if(government.includes('Monarchy')){
            if(government === 'Monarchy Dst' && tileType.includes("Dsrt")) {
                monarchyType = 'D'
            } else if (government === 'Monarchy Swp' && tileType.includes("Swmp")) {
                monarchyType = 'S'
            } else if (government === 'Monarchy Mtn' && tileType.includes("Mntn")) {
                monarchyType = 'M'
            }
        }
    })
</script>
<main>
    <div class='resource'>
        {tileType}
    </div>

    {#if toggle==='true'}
        <input class='value' bind:value={value} placeholder="" type="number" on:click={() => addTileType(tileType)} readonly/>
    {:else}
        <input class='value' bind:value={value} placeholder="" type="number" on:change={() => updateValue(tileType, value)}/>
    {/if}


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
        width: 60%;
        font-size: 1.25em;
        background-color: var(--lightYellow);
        border-radius: 10%;
        text-align: center;
    }

</style>