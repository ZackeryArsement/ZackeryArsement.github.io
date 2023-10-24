<script>
  import CountrySelection from './lib/country/countrySelection/CountrySelection.svelte';
  import GovernmentSelection from './lib/governmentPhase/governmentSelection/GovernmentSelection.svelte';
  import ResourceHome from './lib/resourcePhase/resourceHome/ResourceHome.svelte';

  const currentPhase = {
    countrySelection: true,
    governmentSelection: false,
    technologySelection: false
  }
  let country;
  let government;

  const setToGovernmentSelection = () => {
    currentPhase.countrySelection = false;
    currentPhase.technologySelection = false;
    currentPhase.governmentSelection = true;
  }

  const setToCountrySelection = () => {
    currentPhase.countrySelection = true;
    currentPhase.technologySelection = false;
    currentPhase.governmentSelection = false;
  }

  const setToTechnologySelection = () => {
    currentPhase.countrySelection = false;
    currentPhase.technologySelection = true;
    currentPhase.governmentSelection = false;
  } 

  const setToActiveRound = () => {
    currentPhase.countrySelection = false;
    currentPhase.technologySelection = false;
    currentPhase.governmentSelection = false;
  }

  function handleCountryUpdate(event) {
      country = event.detail.finalCountry;
      setToGovernmentSelection()
  }

  function handleGovernmentUpdate(event) {
      government = event.detail.finalGovernment;
      setToActiveRound()
  }
</script>

<main>
  {#if currentPhase.countrySelection}
    <CountrySelection on:updateFinalCountry={handleCountryUpdate}/>
  {:else if currentPhase.governmentSelection}
    <GovernmentSelection on:updateFinalGovernment={handleGovernmentUpdate}/>
  {:else if currentPhase.technologySelection}
  {:else}
    <ResourceHome country={country} government={government}/>
  {/if}
</main>

<style>
</style>
