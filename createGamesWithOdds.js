import axios from 'axios';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import {
    getHeaders
} from './headers.js';
dotenv.config();

import { readGamesOfTheDay } from "./getMarketIdInfos.js";


export async function createGamesWithOdds() {
    try {
        let gamesOfTheDay = await readGamesOfTheDay();
        let matchOddsInfo = await readMatchOddsInfo();
        for (let game of matchOddsInfo) {
            for(let i = 0; i < gamesOfTheDay.length; i++) {
                if(game.eventId == gamesOfTheDay[i].eventId) {
                    game.game = gamesOfTheDay[i].game;
                    game.gameTime = gamesOfTheDay[i].gameTime;
                }
            }
        }
        await saveFinalLIstOfGames(matchOddsInfo);
        console.log('criacao de lista dos jogos com odds criado');
    } catch (error) {
        
    }
}

async function readMatchOddsInfo() {
    try {
        const data = fs.readFileSync('./gamesMatcOdds.json');
        const dataJson = JSON.parse(data);
        return dataJson;
    } catch (error) {
        console.log(error)
    }
}

async function saveFinalLIstOfGames(games) {
    try {
        fs.writeFileSync('listOfGamesWithOdds.json', JSON.stringify(games));
    } catch (error) {
        console.log(error)
    }
}

await createGamesWithOdds();