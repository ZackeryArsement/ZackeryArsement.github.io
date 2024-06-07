<script>
    import { createEventDispatcher } from 'svelte';
    import CountryCard from '../countryCard/CountryCard.svelte';
  
    let selectedCountry
    let playerCount = 2;

    const dispatch = createEventDispatcher();

    function finalizeCountryUpdate(event) {
      finalizePlayerCount();
      dispatch('updateFinalCountry', { finalCountry: event.target.value });
    }

    function finalizePlayerCount(){
      dispatch('updatePlayerCount', { finalPlayerCount: playerCount })
    }
  
    const countries = [
      {
        name: "Switzerland",
        description: [
          "Gain +3 gold every round",
          "This doubles itself with blacksmithing and all other gold upgrading technology"
        ]
      },
      {
        name: "Greece",
        description: [
          "Gain +3 tech every round",
          "This doubles itself with every tech upgrading technology"
        ]
      },
      {
        name: "Rome",
        description: [
          "Tier 1 tiles cost 15 food",
          "+5 food from all food tiles as Republic"
        ]
      },
      {
        name: "Egypt",
        description: [
          "+1 tech OR gold from deserts tiles"
        ]
      },
      {
        name: "Cajuns",
        description: [
          "Tier 1 tiles cost 15 food",
          "Double food OR wood from swamps"
        ]
      },
      {
        name: "Germany",
        description: [
          "+3 defense and +5 food in forest",
          "***bonus defense not applied to city/capitol on a forest tile***"
        ]
      },
      {
        name: "America",
        description: [
          "+5 Iron and +1 gold in mountains"
        ]
      },
      {
        name: "Atlantis",
        description: [
          "All cities can be built on water tiles adjacent to atleast 3 land tiles",
          "+10 food per city on water tiles",
          "Navigation allows settlements on deep ocean and an additional +10 food per water city"
        ]
      }, 
      {
        name: "Inca",
        description: [
          "All cities can be built on mountains",
          "Gain resources from mountains even if it becomes a city tile",
          "+1 gold for every 5 gold you are making per turn"
        ]
      },
      {
        name: "Mongolia",
        description: [
          "Calvary have +1 move and attack",
          "Settlers have base cost of 40 food",
          "Capitol has 5 starting outpost"
        ]
      },
      {
        name: "Persia",
        description: [
          "+5 food from desert tiles",
          "Granary gives and additional +10 food per desert"
        ]
      }, 
      {
        name: "India",
        description: [
          "Tier 2 outpost cost 40",
          "+3 defense and -3 attack added to units with theocracy",
          "Capitol has 5 starting outpost"
        ]
      }, 
      {
        name: "Israel",
        description: [
          "Begin game with agriculture",
          "+2 attack with theocracy"
        ]
      }, 
      {
        name: "Russia",
        description: [
          "+5 food from snow tiles",
          "Granary gives and additional +10 food per snow"
        ]
      }, 
      {
        name: "Vikings",
        description: [
          "At start of game you receive a settler and navy unit",
          "+3 attack and -2 defense added to units with anarchy"
        ]
      }, 
      {
        name: "France",
        description: [
          "+2 attack to infantry and advanced units",
          "+1 movement for all ground forces (except calvary)",
          "+5 food from forest tiles"
        ]
      }, 
      {
        name: "Korea",
        description: [
          "Start with two capitols (must be 1 tile between capitols)",
          "+2 attack for air untis",
          "5 starting outpost between both capitols combined"
        ]
      }, 
      {
        name: "China",
        description: [
          "New settlements start with 4 outpost instead of 3",
          "+1 attack and +1 defense added to units with dictator",
          "Capitol has 5 starting outpost"
        ]
      }, 
      {
        name: "The Congo",
        description: [
          "Forest tiles are also gold tiles"
        ]
      }, 
      {
        name: "Japan",
        description: [
          "+5 food from water tiles"
        ]
      }, 
      {
        name: "England",
        description: [
          "+3 defense and +1 movement to all navy",
          "Cost of navy units is reduced by half (rounded up to nearest 5)"
        ]
      }, 
      {
        name: "Dutch Empire",
        description: [
          "+3 gold, +3 tech while democracy",
          "Both gold and tech double from tech and gold technologies, respectively"
        ]
      }
    ]
  
    function handleCountryUpdate(event) {
      selectedCountry = event.detail.selectedCountry;
    }
  
  </script>
  
  <main>
    <div class='players-header'>
      <div id="player-title">
        Number of players
      </div>
      <select bind:value={playerCount} id='select-button'>
        <option>2</option>
        <option>4</option>
      </select>
    </div>
    <div class='card-container'>
      {#each countries as country}
        <CountryCard country={country} selectedCountry={selectedCountry} on:updateSelectedCountry={handleCountryUpdate}/>
      {/each}
    </div>

    <button id='finalize' on:click={finalizeCountryUpdate} value={selectedCountry}>Finalize Country</button>
  </main>

  <style>
    .players-header{
      display: flex;
      justify-content: space-around;
      background-color: burlywood;
      padding: 1rem;
      border-radius: 15px;
      margin-bottom: 1rem;
    }
    .card-container{
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      flex-wrap: wrap;
      grid-gap: 10px;
      margin-bottom: 2rem;
    }
    #finalize{
        font-size: 1.5rem;
        background-color: rgb(87, 87, 79);
    }
    #player-title{
      font-size: 1.5rem;
      font-weight: 700;
      color: black;
    }
    #select-button{
      font-size: 1.5rem;
    }
  </style>