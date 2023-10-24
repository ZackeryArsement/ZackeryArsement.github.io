<script>
    import { createEventDispatcher } from 'svelte';
    import GovernmentCard from '../governmentCard/GovernmentCard.svelte';
  
    let selectedGovernment;
    const dispatch = createEventDispatcher();

    function finalizeGovernmentUpdate(event) {
        dispatch('updateFinalGovernment', { finalGovernment: event.target.value });
    }
  
    const governments = [
      {
        name: "Republic",
        description: [
          "Settlers cost 30 food"
        ]
      },
      {
        name: "Monarchy",
        description: [
          'Select a "Choose One" tile type; Receive both resources from those tiles'
        ]
      },
      {
        name: "Feudalism",
        description: [
          "Minimum defense for all controlled tiles is 5"
        ]
      },
      {
        name: "Democracy",
        description: [
          "Tier 2 outpost cost 30"
        ]
      },
      {
        name: "Anarchy",
        description: [
          "+3 attack",
          "-2 defense"
        ]
      },
      {
        name: "Theocracy",
        description: [
          "+3 defense",
          "-2 attack"
        ]
      },
      {
        name: "Dictator",
        description: [
          "+5 iron in mountains",
          "-5 food in grasslands"
        ]
      },
      {
        name: "Communism",
        description: [
          "+4 attack and defense for ALL land units",
          "Food production stops"
        ]
      },
      {
        name: "Stratocracy",
        description: [
          "Choose a city that is not your capitol; This city can now spawn units"
        ]
      },
    ]
  
    function handleGovernmentUpdate(event) {
        selectedGovernment = event.detail.selectedGovernment;
    }
  
  </script>
  
  <main>
        <div class='card-container'>
            {#each governments as government}
                <GovernmentCard government={government} selectedGovernment={selectedGovernment} on:updateSelectedGovernment={handleGovernmentUpdate}/>
            {/each}
        </div>

        <button id='finalize' on:click={finalizeGovernmentUpdate} value={selectedGovernment}>Finalize Government</button>
  </main>

  <style>
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
  </style>