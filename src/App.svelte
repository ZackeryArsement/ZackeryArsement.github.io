<script>
  import CountrySelection from './lib/country/countrySelection/CountrySelection.svelte';
  import GovernmentSelection from './lib/governmentPhase/governmentSelection/GovernmentSelection.svelte';
  import TechSelection from './lib/technologyPhase/techSelection/TechSelection.svelte';
  import ResourceHome from './lib/resourcePhase/resourceHome/ResourceHome.svelte';

  import { government, country, round, selectionPhase, currentResources, perTurnResources, technologies, justLooking } from './lib/utils/store';

  function handleCountryUpdate(event) {
      localStorage.setItem('country', event.detail.finalCountry)
      $country = event.detail.finalCountry;
      localStorage.setItem('selectionPhase', 'government')
      $selectionPhase = 'government';

      if(event.detail.finalCountry === 'Israel'){
        localStorage.setItem('Agriculture', '1')
        $technologies.Agriculture = 1;
      }
  }

  function handleGovernmentUpdate(event) {
      localStorage.setItem('government', event.detail.finalGovernment)
      $government = event.detail.finalGovernment;

      if($round === 0){
        localStorage.setItem('selectionPhase', 'activeRound')
        $selectionPhase = 'activeRound';
      } else {
        for( const [key, value] of Object.entries($currentResources)){
          $currentResources[key] = parseInt($currentResources[key], 10) + $perTurnResources[key];
          localStorage.setItem(key, $currentResources[key])
        }

        localStorage.setItem('selectionPhase', 'technology')
        $selectionPhase = 'technology';
      }
  }
</script>

<main>
  {#if $selectionPhase==='country'}
    <CountrySelection on:updateFinalCountry={handleCountryUpdate}/>
  {:else if $selectionPhase==='government'}
    <GovernmentSelection on:updateFinalGovernment={handleGovernmentUpdate}/>
  {:else if $selectionPhase==='technology' || $justLooking}
    <TechSelection />
  {:else}
    <ResourceHome selectedCountry={$country} government={$government} />
  {/if}
</main>

<style>
</style>
