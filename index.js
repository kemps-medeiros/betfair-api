import { getGamesOfTheDay } from "./getGamesofTheDay.js";
import { getMarketIdInfos } from "./getMarketIdInfos.js";
import {
    login
} from "./login.js";





async function runApp() {
    try {
        await login();
        await getGamesOfTheDay();    
        await getMarketIdInfos();    
    } catch (error) {
        console.log(error);
    }
}

async function getListEventTypes() {
    
}

runApp();