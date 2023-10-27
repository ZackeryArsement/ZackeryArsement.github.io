<script>
    import { createEventDispatcher } from 'svelte';
    import TechCard from '../techCard/TechCard.svelte';
    import { currentResources, selectionPhase, pendingTechnologies, technologies } from '../../utils/store';

    let localTech = $currentResources.Tech;
    let remainingTech = localTech;

    const finalizeTechnology = () => {
        $pendingTechnologies.forEach(tech => {
            localStorage.setItem(tech, '1');
            $technologies[tech] = 1;
        })

        localStorage.setItem('selectionPhase', 'activeRound');
        $selectionPhase = 'activeRound'

        $currentResources.Tech = remainingTech;

        $pendingTechnologies = [];
    }

    const handleRemainingTechUpdate = (event) => {
        let techCost = event.detail.techCost;
        remainingTech -= techCost;
    }
  
    const technologies1 = [
        {
            name: 'Literacy',
            description: ['Gain +1 from all tech tiles']
        },
        {
            name: 'Brickworking',
            description: ['Essential technology for walls and brickworking']
        },
        {
            name: 'Blacksmithing',
            description: ['Unlock lvl 2 Infantry']
        },
        {
            name: 'Woodworking',
            description: ['Unlock lvl 2 archers','+5 wood from Forest','+5 food from Forest']
        },
        {
            name: 'Agriculture',
            description: ['+5 food from Plains']
        }
    ]
    const technologies2 = [
        {
            name: 'Horseback',
            description: ['Unlock lvl 1 calvary']
        },
        {
            name: 'Roadworking',
            description: ['Units can transport from ally city to ally city','Maximum of 4 blocks by land between cities', 'Enemy controlled territories cannot separate traveling cities']
        },
        {
            name: 'Walls',
            description: ['Units in cities gain +2 defense']
        },
        {
            name: 'Bronzeworking',
            description: ['Unlock lvl 3 infantry','+5 iron from Mountains']
        },
        {
            name: 'Shipbuilding',
            description: ['Unlock lvl 1 navy units']
        },
        {
            name: 'Granary',
            description: ['+5 food from plains','+5 food/wood from swamps', '+5 food from forest']
        }
    ]
    const technologies3 = [
        {
            name: 'Navigation',
            description: ['+5 food from oceans']
        },
        {
            name: 'Gunpowder',
            description: ['Unlock lvl 1 ground forces']
        },
        {
            name: 'Currency',
            description: ['+1 gold from all gold squares']
        }
    ]
    const technologies4 = [
        {
            name: 'Universities',
            description: ['+1 tech from all tech tiles']
        },
        {
            name: 'Canons',
            description: ['Unlock lvl 2 calvary']
        },
        {
            name: 'SteamEngine',
            description: ['+5 iron from Mountains']
        }
    ]
    const technologies5 = [
        {
            name: 'Computers',
            description: ['+1 tech from all tech tiles']
        },
        {
            name: 'Flight',
            description: ['Unlock lvl 1 air forces']
        },
        {
            name: 'CombustionEngine',
            description: ['Wood can now be converted to iron', '50 wood -> 10 iron']
        },
        {
            name: 'Steamboat',
            description: ['Unlock lvl 2 navy']
        },
        {
            name: 'FarmingRevolution',
            description: ['+5 food from Plains', 'Wood can now be converted to food', '40 wood -> 10 food']
        },
        {
            name: 'Banking',
            description: ['+1 gold from all gold tiles']
        }
    ]
    const technologies6 = [
        {
            name: 'AdvancedFlight',
            description: ['Unlock lvl 2 air force']
        },
        {
            name: 'Industrialization',
            description: ['Units can spawn from any ally city']
        },
        {
            name: 'Tanks',
            description: ['Unlock lvl 3 calvary']
        },
        {
            name: 'Battleships',
            description: ['Unlock lvl 3 navy']
        },
        {
            name: 'ModernInfantry',
            description: ['Unlock lvl 2 advanced units']
        },
        {
            name: 'WorldBank',
            description: ['Reach 250 gold and you win!']
        }
    ]
    const technologies7 = [
        {
            name: 'SpaceFlight',
            description: ['Reach for the starts and colonize a new planet', 'Collect 2000 food, 500 iron, all technologies and you win!']
        }
    ]
  </script>
  
  <main>
    <div class="header">
        <div>
            <div id='title'>
                Starting Tech: {localTech}
            </div>
            <div id='title'>
                Remaining Tech: {remainingTech}
            </div>
        </div>

        <button id='finalize' on:click={finalizeTechnology}>Finalize Tech</button>
    </div>

    <div class='tech-container'>
        <div class='card-container'>
            <div style="color: white;">
                Cost: 5 Tech
            </div>
            {#each technologies1 as technology}
                <TechCard technology={technology} cost={5} remainingTech={remainingTech}  on:updateupdateRemainingTech={handleRemainingTechUpdate}/>
            {/each}
        </div>
        <div class='card-container'>
            <div style="color: white;">
                Cost: 10 Tech
            </div>
            {#each technologies2 as technology}
                <TechCard technology={technology } cost={10} remainingTech={remainingTech}  on:updateupdateRemainingTech={handleRemainingTechUpdate}/>
            {/each}
        </div>
        <div class='card-container'>
            <div style="color: white;">
                Cost: 15 Tech
            </div>
            {#each technologies3 as technology}
                <TechCard technology={technology} cost={15} remainingTech={remainingTech}  on:updateupdateRemainingTech={handleRemainingTechUpdate}/>
            {/each}
        </div>
        <div class='card-container'>
            <div style="color: white;">
                Cost: 30 Tech
            </div>
            {#each technologies4 as technology}
                <TechCard technology={technology} cost={30} remainingTech={remainingTech}  on:updateupdateRemainingTech={handleRemainingTechUpdate}/>
            {/each}
        </div>
        <div class='card-container'>
            <div style="color: white;">
                Cost: 50 Tech
            </div>
            {#each technologies5 as technology}
                <TechCard technology={technology} cost={50} remainingTech={remainingTech}  on:updateupdateRemainingTech={handleRemainingTechUpdate}/>
            {/each}
        </div>
        <div class='card-container'>
            <div style="color: white;">
                Cost: 80 Tech
            </div>
            {#each technologies6 as technology}
                <TechCard technology={technology} cost={80} remainingTech={remainingTech}  on:updateupdateRemainingTech={handleRemainingTechUpdate}/>
            {/each}
        </div>
        <div class='card-container'>
            <div style="color: white;">
                Cost: 100 Tech
            </div>
            {#each technologies7 as technology}
                <TechCard technology={technology} cost={100} remainingTech={remainingTech}  on:updateupdateRemainingTech={handleRemainingTechUpdate}/>
            {/each}
        </div>
    </div>

  </main>

  <style>
    .card-container{
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      flex-wrap: wrap;
      grid-gap: 2px;
      margin: 1rem 0.5rem 2rem 0.5rem;
      height: 100%;
    }
    .tech-container{
        display: flex;
        margin-top: 1.75rem;
    }
    .header{
        display: flex;
        justify-content: space-evenly;
        padding: 5px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        background-color: var(--darkYellow);
        z-index: 100;
    }
    #title{
        font-weight: 600;
        font-size: 1em;
    }
    #finalize{
        font-size: 0.75rem;
        width: 35%;
        background-color: rgb(87, 87, 79);
    }
  </style>