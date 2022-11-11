import { getGamesOfTheDay } from "./getGamesofTheDay.js";
import {
    login
} from "./login.js";





async function runApp() {
    try {
        await login();
        await getGamesOfTheDay();        
    } catch (error) {
        console.log(error);
    }
}

async function getListEventTypes() {
    
}

runApp();