import { writable, derived } from 'svelte/store';

function initializeStoreFromLocalStorage(key, noParse) {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      return noParse ? storedValue : JSON.parse(storedValue);
    } else {
      return 0;
    }
}

export const country = writable(initializeStoreFromLocalStorage("country", true));

export const justLooking = writable(false);

function activeIs(testing, actual){
    return actual === testing ? 1 : 0;
}

export const selectionPhase = writable(initializeStoreFromLocalStorage("selectionPhase", true) ? initializeStoreFromLocalStorage("selectionPhase", true) : 'country');

export const government = writable(initializeStoreFromLocalStorage("government", true));

export const round = writable(initializeStoreFromLocalStorage("round"));

export const atlantisCities = writable(initializeStoreFromLocalStorage("atlantisCities"));

export const playerCount = writable(initializeStoreFromLocalStorage("playerCount"));

export const currentTiles = writable({
    Ocean: initializeStoreFromLocalStorage("Ocean"),
    Desert: initializeStoreFromLocalStorage("Desert"),
    Swamp: initializeStoreFromLocalStorage("Swamp"),
    Mountain: initializeStoreFromLocalStorage("Mountain"),
    Grassland: initializeStoreFromLocalStorage("Grassland"),
    Forest: initializeStoreFromLocalStorage("Forest"),
    Snow: initializeStoreFromLocalStorage("Snow")
})

export const currentToggleTiles = writable({
    OcnFood: initializeStoreFromLocalStorage("OcnFood"),
    OcnTech: initializeStoreFromLocalStorage("OcnTech"),
    SwmpFood: initializeStoreFromLocalStorage("SwmpFood"),
    SwmpWood: initializeStoreFromLocalStorage("SwmpWood"),
    MntnIron: initializeStoreFromLocalStorage("MntnIron"),
    MntnGold: initializeStoreFromLocalStorage("MntnGold"),
    DsrtGold: initializeStoreFromLocalStorage("DsrtGold"),
    DsrtTech: initializeStoreFromLocalStorage("DsrtTech")
})

export const technologies = writable({
    Literacy: initializeStoreFromLocalStorage("Literacy"),
    Brickwork: initializeStoreFromLocalStorage("Brickwork"),
    Blacksmithing: initializeStoreFromLocalStorage("Blacksmithing"),
    Woodworking: initializeStoreFromLocalStorage("Woodworking"),
    Agriculture: initializeStoreFromLocalStorage("Agriculture"),
    Horseback: initializeStoreFromLocalStorage("Horseback"),
    Roadworking: initializeStoreFromLocalStorage("Roadworking"),
    Walls: initializeStoreFromLocalStorage("Walls"),
    Bronzeworking: initializeStoreFromLocalStorage("Bronzeworking"),
    Shipbuilding: initializeStoreFromLocalStorage("Shipbuilding"),
    Granary: initializeStoreFromLocalStorage("Granary"),
    Navigation: initializeStoreFromLocalStorage("Navigation"),
    Gunpowder: initializeStoreFromLocalStorage("Gunpowder"),
    Currency: initializeStoreFromLocalStorage("Currency"),
    Universities: initializeStoreFromLocalStorage("Universities"),
    Canons: initializeStoreFromLocalStorage("Canons"),
    SteamEngine: initializeStoreFromLocalStorage("SteamEngine"),
    Computers: initializeStoreFromLocalStorage("Computers"),
    Flight: initializeStoreFromLocalStorage("Flight"),
    CombustionEngine: initializeStoreFromLocalStorage("CombustionEngine"),
    Steamboat: initializeStoreFromLocalStorage("Steamboat"),
    FarmingRevolution: initializeStoreFromLocalStorage("FarmingRevolution"),
    Banking: initializeStoreFromLocalStorage("Banking"),
    AdvancedFlight: initializeStoreFromLocalStorage("AdvancedFlight"),
    Industrialization: initializeStoreFromLocalStorage("Industrialization"),
    Tanks: initializeStoreFromLocalStorage("Tanks"),
    Battleships: initializeStoreFromLocalStorage("Battleships"),
    ModernInfantry: initializeStoreFromLocalStorage("ModernInfantry"),
    WorldBank: initializeStoreFromLocalStorage("WorldBank"),
    SpaceFlight: initializeStoreFromLocalStorage("SpaceFlight"),
})

const foodPerTurn = derived([currentTiles, currentToggleTiles, technologies, country, atlantisCities, government], ([$currentTiles, $currentToggleTiles, $technologies, $country, $atlantisCities, $government]) => {
    let calculatedSwampTiles = activeIs("Monarchy Swp", $government) > 0 ? $currentTiles.Swamp : $currentToggleTiles.SwmpFood;
    
    let grasslandFood = $currentTiles.Grassland * 5 * (1 + $technologies.Agriculture + $technologies.Granary + $technologies.FarmingRevolution) ;
    let forestFood = $currentTiles.Forest * 5 * ($technologies.Woodworking + $technologies.Granary)
    let oceanFood = $currentToggleTiles.OcnFood * 5 + $currentTiles.Ocean * 5 * $technologies.Navigation;
    let swampFood = (calculatedSwampTiles * 5 * (1 + $technologies.Granary))*(1 + activeIs('Cajuns Food', $country))

    let atlantisFood = $atlantisCities * activeIs('Atlantis', $country) * 10 * (1 + $technologies.Navigation)
    let romansFood = 5 * ($currentTiles.Grassland + $currentToggleTiles.SwmpFood + $currentToggleTiles.OcnFood) * activeIs('Rome', $country) * activeIs('Republic', $government)
    let germanyFood = 5 * $currentTiles.Forest * activeIs('Germany', $country)
    let franceFood = 5 * $currentTiles.Forest * activeIs('France', $country)
    let persiaFood = 5 * $currentTiles.Desert * (1 + 2 * $technologies.Granary) * activeIs('Persia', $country)
    let russiaFood = 5 * $currentTiles.Snow * (1 + 2 * $technologies.Granary) * activeIs('Russia', $country)
    let japanFood = 5 * $currentTiles.Ocean * activeIs('Japan', $country)

    let dictatorFood = -5 * $currentTiles.Grassland * activeIs('Dictator', $government)

    let totalFood = grasslandFood + forestFood + oceanFood + swampFood + atlantisFood + romansFood + germanyFood + franceFood + persiaFood + russiaFood + japanFood + dictatorFood;

    totalFood = totalFood * (1 - activeIs('Communism', $government))
    return totalFood;
});

const woodPerTurn = derived([currentTiles, currentToggleTiles, technologies, country, government], ([$currentTiles, $currentToggleTiles, $technologies, $country, $government]) => {
    let calculatedSwampTiles = activeIs("Monarchy Swp", $government) > 0 ? $currentTiles.Swamp : $currentToggleTiles.SwmpWood;
    
    let forestWood = $currentTiles.Forest * 5 * (1 + $technologies.Woodworking)
    let swampWood = (calculatedSwampTiles * 5 * (1 + $technologies.Granary))*(1 + activeIs('Cajuns Wood', $country))

    let totalWood = forestWood + swampWood;
    return totalWood;
});

const ironPerTurn = derived([currentTiles, currentToggleTiles, technologies, country, government], ([$currentTiles, $currentToggleTiles, $technologies, $country, $government]) => {
    let calculatedMountainTiles = activeIs("Monarchy Mtn", $government) > 0 ? $currentTiles.Mountain : $currentToggleTiles.MntnIron;
    
    let mountainIron = calculatedMountainTiles * 5 * (1 + $technologies.Bronzeworking + $technologies.SteamEngine)
    
    let americanIron = 5 * $currentTiles.Mountain * activeIs('America', $country);

    let dictatorIron = 5 * $currentTiles.Mountain * activeIs('Dictator', $government);

    let totalIron = mountainIron + americanIron + dictatorIron;
    return totalIron;
});

const goldPerTurn = derived([currentTiles, currentToggleTiles, technologies, country, government], ([$currentTiles, $currentToggleTiles, $technologies, $country, $government]) => {
    let calculatedMountainTiles = activeIs("Monarchy Mtn", $government) > 0 ? $currentTiles.Mountain : $currentToggleTiles.MntnGold;
    let calculatedDesertTiles = activeIs("Monarchy Dst", $government) > 0 ? $currentTiles.Desert : $currentToggleTiles.DsrtGold
    
    let desertGold = calculatedDesertTiles * (1 + $technologies.Currency + $technologies.Banking)
    let mountainGold = calculatedMountainTiles * (1 + $technologies.Currency + $technologies.Banking)
    
    let egyptGold = $currentTiles.Desert * activeIs('Egypt Gold', $country)
    let switzerlandGold = 3 * activeIs('Switzerland', $country) * (2**($technologies.Blacksmithing + $technologies.Currency + $technologies.Banking))
    let americanGold = 1 * $currentTiles.Mountain * activeIs('America', $country)
    let theCongo = 1 * $currentTiles.Forest * (1 + $technologies.Currency + $technologies.Banking) * activeIs('The Congo', $country)
    let dutch = 3 * activeIs('Dutch Empire', $country) * (2**($technologies.Blacksmithing + $technologies.Currency + $technologies.Banking)) * activeIs('Democracy', $government)

    let totalGold = desertGold + mountainGold + egyptGold + switzerlandGold + americanGold + theCongo + dutch

    let incanGold = Math.floor(totalGold / 5) * activeIs('Inca', $country)
    return totalGold + incanGold;
});

const techPerTurn = derived([currentTiles, currentToggleTiles, technologies, country, government], ([$currentTiles, $currentToggleTiles, $technologies, $country, $government]) => {
    let calculatedDesertTiles = activeIs("Monarchy Dst", $government) > 0 ? $currentTiles.Desert : $currentToggleTiles.DsrtTech
    
    let oceanTech = $currentToggleTiles.OcnTech * (1 + $technologies.Literacy + $technologies.Universities + $technologies.Computers)
    let desertTech = calculatedDesertTiles * (1 + $technologies.Literacy + $technologies.Universities + $technologies.Computers)
    let snowTech = $currentTiles.Snow * (1 + $technologies.Literacy + $technologies.Universities + $technologies.Computers)
    
    let egyptTech = $currentTiles.Desert * activeIs('Egypt Tech', $country)
    let greeceTech = 3 * activeIs('Greece', $country) * (2**($technologies.Literacy + $technologies.Universities + $technologies.Computers))
    let dutch = 3 * activeIs('Dutch Empire', $country) * (2**($technologies.Literacy + $technologies.Universities + $technologies.Computers)) * activeIs('Democracy', $government)

    let totalTech = oceanTech + desertTech + snowTech + egyptTech + greeceTech + dutch
    return totalTech;
});

export const perTurnResources = derived(
    [foodPerTurn, woodPerTurn, ironPerTurn, goldPerTurn, techPerTurn],
    ([$foodPerTurn, $woodPerTurn, $ironPerTurn, $goldPerTurn, $techPerTurn]) => ({
        Food: $foodPerTurn,
        Wood: $woodPerTurn,
        Iron: $ironPerTurn,
        Gold: $goldPerTurn,
        Tech: $techPerTurn
    })
);

export const currentResources = writable({
    Food: initializeStoreFromLocalStorage("Food"),
    Wood: initializeStoreFromLocalStorage("Wood"),
    Iron: initializeStoreFromLocalStorage("Iron"),
    Gold: initializeStoreFromLocalStorage("Gold"),
    Tech: initializeStoreFromLocalStorage("Tech"),
})

export const pendingTechnologies = writable([]);