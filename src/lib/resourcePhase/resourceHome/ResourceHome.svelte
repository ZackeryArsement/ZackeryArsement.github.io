<script>
    export let selectedCountry;
    export let government;

    import {currentTiles, currentToggleTiles, currentResources, perTurnResources, round, country, atlantisCities, justLooking} from '../../utils/store'

    import ResourceCard from "../resourceCard/ResourceCard.svelte";
    import TileCard from "../tileCard/TileCard.svelte";
    import Confirm from '../confirmModal/Confirm.svelte';

    let confirmScreen = false;
    let selectionType;
    let endRound;

    function updateTileValue(tileType, newValue) {
        if(tileType.includes('oo') || tileType.includes('Tech') || tileType.includes('Gold') || tileType.includes('Iron')){
            currentToggleTiles.update((currentToggleTiles) => ({
                ...currentToggleTiles,
                [tileType]: newValue,
            }));
        } else {
            currentTiles.update((currentTiles) => ({
                ...currentTiles,
                [tileType]: newValue,
            }));
        }
    }

    function updateCurrentResources(resourceType, newValue) {
        currentResources.update((currentResources) => ({
        ...currentResources,
        [resourceType]: newValue,
        }));
    }

    const confirm = (event) => {
        endRound = event.target.value;

        confirmScreen = true;
        if(endRound === 'true') {
            selectionType = "Would you like to end your round?";  
        } else {
            selectionType = "Would you like to reset your game?";  
        }
    }

    const toggleCountry = () => {
        if($country.includes('Cajuns')){
            if($country === 'Cajuns Food'){
                $country = 'Cajuns Wood'
            } else{
                $country = 'Cajuns Food'
            }
        } else if($country.includes('Egypt')){
            if($country === 'Egypt Gold'){
                $country = 'Egypt Tech'
            } else{
                $country = 'Egypt Gold'
            }
        }
        localStorage.setItem('country', $country)
    }

    const updateAtlantis = () => {
        let updateValue = removeLeadingZeros($atlantisCities);

        localStorage.setItem('atlantisCities', updateValue)
        $atlantisCities = updateValue;
    }

    function removeLeadingZeros(numberStr) {
        // Use regular expression to remove leading zeros
        return String(numberStr).replace(/^0+/, '');
    }

    const peakAtTech = () => {
        console.log('looking')
        $justLooking = true;
    }
</script>

<main>
    <header>
        {#if $country.includes('Cajuns') ||  $country.includes('Egypt')}
            <div id='country' on:click={toggleCountry}>
                {selectedCountry}
            </div>
        {:else if $country.includes('Atlantis')}
            <div id='country'>
                {selectedCountry}
            </div>
            <input id='atlantis' type="number" placeholder="0" bind:value={$atlantisCities} on:change={() => updateAtlantis()}/>
        {:else}
            <div id='country'>
                {selectedCountry}
            </div>
        {/if}

    
        <div>
            <div id='government'>
                {government}
            </div>
            <div id='government'>
                Round: {$round}
            </div>
        </div>
    </header>

    <div class='currentResourceHeader'>
        Current Resources
        <i class="fa fa-question-circle" aria-hidden="true" on:click={peakAtTech}></i>
    </div>
    <div class='currentResources'>
        {#each Object.entries($currentResources) as [resource, value] (resource)}
            <ResourceCard resource={resource} value={value} perTurn={false} updateCurrentResources={updateCurrentResources}/>
        {/each}
    </div>

    <div class='currentResourceHeader'>
        Resources Per Turn
    </div>
    <div class='currentResources'>
        {#each Object.entries($perTurnResources) as [resource, value] (resource)}
            <ResourceCard resource={resource} value={value} perTurn={true}  updateCurrentResources={updateCurrentResources}/>
        {/each}
    </div>

    <div class='currentResourceHeader'>
        Tile Count
    </div>
    <div class='currentResources'>
        {#each Object.entries($currentTiles) as [tileType, value] (tileType)}
            <TileCard tileType={tileType} value={value} updateTileValue={updateTileValue} government={government} currentTiles={[]} currentToggleTiles={[]} toggle='false'/>
        {/each}
    </div>
    <div class='currentResourceHeader'>
        Toggles
    </div>
    <div class='currentResources'>
        {#each Object.entries($currentToggleTiles) as [tileType, value] (tileType)}
            <TileCard tileType={tileType} value={value} updateTileValue={updateTileValue} government={government} currentTiles={$currentTiles} currentToggleTiles={$currentToggleTiles} toggle='true'/>
        {/each}
    </div>

    <div id="buttons">
        <button on:click={confirm} value=true>End Round</button>
        <button on:click={confirm} value=false>Reset</button>
    </div>

    {#if confirmScreen}
        <Confirm bind:show={confirmScreen} endRound={endRound}>
            <h2>{selectionType}</h2>
        </Confirm>
    {/if}

</main>

<style>
    main{
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: fit-content;
        background-color: rgb(46, 46, 46);
    }
    header {
        background-color: var(--darkYellow);
        padding: 5% 10%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80%;
    }

    #atlantis{
        text-align: center;
        width: 40px;
        height: 25px;
        font-size: 1.5rem;
        background-color: var(--lightYellow);
        color: black;
    }
    
    #country {
        font-size: 1.75em;
        font-weight: 600;
        text-shadow: 1px 1.5px lightgray;
    }
    
    #government {
        font-size: 1.25em;
        font-weight: 600;
        text-shadow: 1px 1.5px lightgray;
    }

    .currentResources{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin-bottom: 0.5rem;
    }
    .currentResourceHeader{
        display: flex;
        color: white;
        text-align: left;
        padding-left: 1rem;
        font-size: 1.75rem;
        text-shadow: 1px 1px gray;
    }
    #buttons{
        margin: 2rem auto 1rem auto;
        display: flex;
        justify-content: space-evenly;
    }
</style>