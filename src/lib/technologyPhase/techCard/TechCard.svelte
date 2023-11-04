<script>
    export let technology;
    export let cost;
    export let remainingTech;
    import { createEventDispatcher } from 'svelte';
    import { pendingTechnologies, justLooking } from '../../utils/store';

    let isChecked = false;
    let alreadyBought = localStorage.getItem(technology.name) === '1' ? true : false;

    const dispatch = createEventDispatcher();

    function updateRemainingTech(add) {
        if(add){
            dispatch('updateupdateRemainingTech', { techCost: cost });
        } else {
            dispatch('updateupdateRemainingTech', { techCost: -cost });
        }
    }

    function selectTech() {
        if(!isChecked){
            updateRemainingTech(true)
            $pendingTechnologies.push(technology.name)
        }else {
            updateRemainingTech(false)
            $pendingTechnologies = $pendingTechnologies.filter(tech => tech !== technology.name);
        }
        
        isChecked = !isChecked;
    }
</script>

<main>    
    <div id="name">
        <span>{technology.name}</span>
    </div>

    <div id='description'>
        {#each technology.description as description}
            <div>
                <i class="fa fa-circle" style="color: black; font-size:7px"></i>
                {description}
            </div>
        {/each}
    </div>

    {#if alreadyBought}
        <i class="fa fa-check" style="color: black; font-size:18px"></i>
    {:else if  (cost <= remainingTech || isChecked) && !($justLooking)}
        <input value={technology.name} type="checkbox" bind:checked={isChecked} on:click={selectTech}>
    {/if}

</main>

<style>
    main{
        position: relative;
        width: 150px;
        padding: 4px;
        border-radius: 10px;
        background-color: var(--lightYellow);
        height: 150px;
        margin-bottom: 0.25rem;
        overflow-y: auto;
    }
    #name{
        color: black;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
    }
    #description{
        font-size: 0.85rem;
        font-weight: 500;
        line-height: 1.05;
    }
    input{
        width: 17px;
        height: 17px;
    }
</style>