import { getGamesOfTheDay } from "./getGamesofTheDay.js";
import { getMarketIdInfos } from "./getMarketIdInfos.js";
import { getMatchOdds } from "./getMatchOdds.js";
import {
    login
} from "./login.js";





async function runApp() {
    try {
        await login();
        await getGamesOfTheDay();    
        await getMarketIdInfos();    
        await getMatchOdds();
    } catch (error) {
        console.log(error);
    }
}

async function getListEventTypes() {
    
}

runApp();