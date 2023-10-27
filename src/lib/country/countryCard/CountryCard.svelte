<script>
    export let country;
    export let selectedCountry;

    import { createEventDispatcher } from 'svelte';

    let canceledCountry = false;

    const dispatch = createEventDispatcher();

    function liveSelectedCountryUpdate(event) {
        if (!canceledCountry) {
            dispatch('updateSelectedCountry', { selectedCountry: event.target.value });
        }
    }
</script>

<main class={canceledCountry ? 'canceled' : selectedCountry === country.name ? 'selected' : ''}>    
    <div id="name">
        <span>{country.name}</span>
        
        <div id='cancel' on:click={() => canceledCountry = !canceledCountry}>
            x
        </div>
    </div>

    <div id='description'>
        <ul>
            {#each country.description as description}
                <li>
                    {description}
                </li>
            {/each}
        </ul>
    </div>

    <button class={canceledCountry ? 'canceledButton' : ''} on:click={liveSelectedCountryUpdate} value={country.name}>Select Country</button>
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
    .canceled{
        background-color: rgb(118, 118, 115);
    }
    .selected{
        background-color: rgb(83, 180, 35);
    }
    .canceledButton{
        background-color: rgb(82, 82, 71);
    }
    button{
        width: 90%;
        position: absolute;
        bottom: 5px;
        right: 5%;
    }
    ul {
            padding-left: 10%; /* Remove default padding */
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
        font-size: .75rem;
        font-weight: 500;
        line-height: 1.05;
    }
    #cancel {
        width: 20px;
        height: 20px;
        border-radius: 15%;
        background-color: #898989; /* Red color for the "X" button; you can change this */
        color: black; /* Text color for the "X" button */
        font-size: 0.75rem;
    }
</style>