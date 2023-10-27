<!-- Modal.svelte -->
<script>
    export let show = false;
    export let endRound;

    import { 
      currentTiles, 
      currentToggleTiles, 
      currentResources,
      perTurnResources,
      technologies,
      selectionPhase,
      round } from "../../utils/store";
  
    const confirmEndRound = () =>{
        show = false;

        if($round %3 == 0 && $round !== 0){
          $selectionPhase = 'government'
          localStorage.setItem('selectionPhase', 'government');
        } else {
          for( const [key, value] of Object.entries($currentResources)){
            $currentResources[key] = parseInt($currentResources[key], 10) + $perTurnResources[key];
            localStorage.setItem(key, $currentResources[key])
          }

          localStorage.setItem('selectionPhase', 'technology')
          $selectionPhase = 'technology';
        }

        $round += 1;
        localStorage.setItem('round', $round)
    }

    const confirmResetGame = () =>{
        localStorage.setItem("country", "0")
        localStorage.setItem("government", "0")
        localStorage.setItem("round", "0")
        $round = 0;

        for( const [key, value] of Object.entries($currentTiles)){
          localStorage.setItem(key, "0")
          $currentTiles[key] = 0;
        }
        for( const [key, value] of Object.entries($currentToggleTiles)){
          localStorage.setItem(key, "0")
          $currentToggleTiles[key] = 0;
        }
        for( const [key, value] of Object.entries($currentResources)){
          localStorage.setItem(key, "0")
          $currentResources[key] = 0;
        }
        for( const [key, value] of Object.entries($technologies)){
          localStorage.setItem(key, "0")
          $technologies[key] = 0;
        }

        localStorage.setItem('selectionPhase', 'country')
        $selectionPhase = 'country'
    }

    const declineAction = () => {
      show = false;
    }

    const confirmAction = () => {
      if(endRound==='true'){
        confirmEndRound()
      }else{
        confirmResetGame()
      }
      // show = false;
    }
  </script>
  
  {#if show}
    <div class="modal-background">
      <div class="modal">
        <slot></slot>
        <button on:click={confirmAction}>Confirm</button>
        <button on:click={declineAction}>Decline</button>
      </div>
    </div>
  {/if}
  
  <style>
    .modal-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
    }
  
    .modal {
      background: #fff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    button{
        background-color: lightgray;
    }
  </style>
  