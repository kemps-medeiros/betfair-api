import axios from 'axios';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import {
    getHeaders
} from './headers.js';
dotenv.config();


const URL = `https://api.betfair.com/exchange/betting/rest/v1.0/listEvents/`

const jsonBody = {

    "filter": {
        "eventTypeIds": [1],
        "marketStartTime": {
            "from": "2022-11-12T00:00:00Z",
            "to": "2022-11-12T23:59:00Z"
        }
    }
};


let api = axios;


let headers = await getHeaders();

export async function getGamesOfTheDay() {
    try {
        const response = await api.post(URL, jsonBody, {
            headers: headers
        });
        let allGames = response.data;
        let games = await mapAllGames(allGames);
        await saveGamesOfTheDay(games)
        console.log('Arquivo com jogos do dia gerado...');
        
    } catch (error) {
        console.log(error);
    }
}


async function saveGamesOfTheDay(games) {
    try {
        fs.writeFileSync('gamesOfTheDay.json', JSON.stringify(games));
    } catch (error) {
        console.log(error)
    }
}

async function mapAllGames(allGames) {
    try {
        let games = allGames.map((game) => ({
            eventId: game.event.id,
            game: game.event.name,
            gameTime: game.event.openDate
        }));
        return games;
    } catch (error) {
        console.log(error)
    }
}

await getGamesOfTheDay()