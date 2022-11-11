import axios from 'axios';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import {
    getHeaders
} from './headers.js';
dotenv.config();

let api = axios;

const URL = `https://api.betfair.com/exchange/betting/rest/v1.0/listMarketBook/`

let headers = await getHeaders();

export async function readMarketInfo() {
    try {
        const data = fs.readFileSync('./gamesMarketOfTheDay.json');
        const dataJson = JSON.parse(data);
        return dataJson;
    } catch (error) {
        console.log(error)
    }
}

export async function getMatchOdds() {
    try {
        let marketInfo = await readMarketInfo();
        let marketWithOdds = [];
        for (let game of marketInfo) {
            let marketId = game.marketId;
            let jsonBody = {
                "marketIds": [`${marketId}`],
                "priceProjection": {
                    "priceData": ["EX_BEST_OFFERS", "EX_TRADED"],
                    "virtualise": "true"
                }
            };

            const response = await api.post(URL, jsonBody, {
                headers: headers
            });

            for (let i = 0; i < response.data.length; i++) {
                let homeTeamBackOdd = '';
                for (let y = 0; y < response.data[i].runners.length; y++) {
                    if (response.data[i].runners[y].selectionId == game.homeTeamId) {
                        homeTeamBackOdd = response.data[i].runners[y].ex.availableToBack[0] ? response.data[i].runners[y].ex.availableToBack[0].price : '';
                    }
                }

                let homeTeamLayOdd = '';
                for (let z = 0; z < response.data[i].runners.length; z++) {
                    if(response.data[i].runners[z].selectionId == game.homeTeamId) {
                        homeTeamLayOdd = response.data[i].runners[z].ex.availableToLay[0] ? response.data[i].runners[z].ex.availableToLay[0].price : '';
                    }
                }

                let awayTeamBAckOdd = '';
                for (let w = 0; w < response.data[i].runners.length; w++) {
                    if(response.data[i].runners[w].selectionId == game.awayTeamId) {
                        awayTeamBAckOdd = response.data[i].runners[w].ex.availableToBack[0] ? response.data[i].runners[w].ex.availableToBack[0].price : '';
                    }
                }

                let awayTeamLayOdd = '';
                for (let k = 0; k < response.data[i].runners.length; k++) {
                    if(response.data[i].runners[k].selectionId == game.awayTeamId) {
                        awayTeamLayOdd = response.data[i].runners[k].ex.availableToLay[0] ? response.data[i].runners[k].ex.availableToLay[0].price : '';
                    }
                }

                marketWithOdds.push({
                    eventId: game.eventId,
                    marketId: game.marketId,
                    marketName: game.marketName,
                    competition: game.competition,
                    homeTeamId: game.homeTeamId,
                    homeTeamName: game.homeTeamName,
                    homeTeamBackOdd: homeTeamBackOdd,
                    homeTeamLayOdd: homeTeamLayOdd,
                    awayTeamId: game.awayTeamId,
                    awayTeamName: game.awayTeamName,
                    awayTeamBackOdd: awayTeamBAckOdd,
                    awayTeamLayOdd: awayTeamLayOdd
                })
            }
        }

        await saveMatchOddsOfTheDay(marketWithOdds);
    } catch (error) {
        console.log(error)
    }
}

async function saveMatchOddsOfTheDay(games) {
    try {
        fs.writeFileSync('gamesMatcOdds.json', JSON.stringify(games));
    } catch (error) {
        console.log(error)
    }
}

await getMatchOdds();