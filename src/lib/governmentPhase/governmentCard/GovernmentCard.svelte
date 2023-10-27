<script>
    export let government;
    export let selectedGovernment;

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function liveSelectedGovernmentUpdate(event) {
        dispatch('updateSelectedGovernment', { selectedGovernment: event.target.value });
    }
</script>

<main class={selectedGovernment === government.name ? 'selected' : ''}>    
    <div id="name">
        <span>{government.name}</span>
    </div>

    <div id='description'>
        <ul>
            {#each government.description as description}
                <li>
                    {description}
                </li>
            {/each}
        </ul>
    </div>

    <button on:click={liveSelectedGovernmentUpdate} value={government.name}>Select Government</button>
</main>

<style>
    main{
        position: relative;
        /* width: 46%; */
        padding: 4px;
        border-radius: 10px;
        background-color: var(--lightYellow);
        height: 200px;
    }
    .selected{
        background-color: rgb(83, 180, 35);
    }
    button{
        width: 90%;
        position: absolute;
        bottom: 5px;
        right: 5%;
    }
    ul {
            padding-left: 12%; /* Remove default padding */
            margin: 0; /* Remove default margin */
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
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.05;
    }
</style>