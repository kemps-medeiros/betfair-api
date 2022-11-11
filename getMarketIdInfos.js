import axios from 'axios';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import {
    getHeaders
} from './headers.js';
dotenv.config();

let api = axios;

const URL = `https://api.betfair.com/exchange/betting/rest/v1.0/listMarketCatalogue/`

let headers = await getHeaders();

export async function readGamesOfTheDay() {
    try {
        const data = fs.readFileSync('./gamesOfTheDay.json');
        const dataJson = JSON.parse(data);
        return dataJson;
    } catch (error) {
        console.log(error)
    }
}


export async function getMarketIdInfos() {
    try {
        let games = await readGamesOfTheDay();
        let marketArray = [];
        for (let game of games) {
            let eventId = game.eventId;
            let jsonBody = {
                "filter": {
                    "eventIds": [
                    `${eventId}`
                    ]
                },
                "maxResults": "200",
                        "marketProjection": [
                            "COMPETITION",
                            "EVENT",
                            "EVENT_TYPE",
                            "RUNNER_DESCRIPTION",
                            "RUNNER_METADATA",
                            "MARKET_START_TIME"
                        ]
            }

            const response = await api.post(URL, jsonBody, {
                headers: headers
            });
            // saveGamesMarketOfTheDay(response.data);
            for (let i = 0; i < response.data.length; i++) {
                if(response.data[i].marketName == "Match Odds") {
                    marketArray.push({
                        eventId: response.data[i].event.id,
                        marketId: response.data[i].marketId,
                        competition: response.data[i].competition.name,
                        homeTeamId: response.data[i].runners[0].selectionId,
                        homeTeamName: response.data[i].runners[0].runnerName,
                        awayTeamId: response.data[i].runners[1].selectionId,
                        awayTeamName: response.data[i].runners[1].runnerName
                    })
                }
            } 
            
        }

        await saveGamesMarketOfTheDay(marketArray);

    } catch (error) {
        console.log(error)
    }
}

async function saveGamesMarketOfTheDay(games) {
    try {
        fs.writeFileSync('gamesMarketOfTheDay.json', JSON.stringify(games));
    } catch (error) {
        console.log(error)
    }
}

// await readGamesOfTheDay();
await getMarketIdInfos();
