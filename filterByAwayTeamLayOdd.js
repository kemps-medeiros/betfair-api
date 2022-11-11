import * as fs from 'fs';

const ODD_LAY_AWAY_TEAM = 5;

async function readListOfGamesWithOdds() {
    try {
        const data = fs.readFileSync('./listOfGamesWithOdds.json');
        const dataJson = JSON.parse(data);
        return dataJson;
    } catch (error) {
        console.log(error)
    }
}

async function saveFilteredGames(games) {
    try {
        fs.writeFileSync('strategyHomeFavourite.json', JSON.stringify(games));
    } catch (error) {
        console.log(error)
    }
}

async function filterGamesAwayTeamLayOddsMoreThan(oddAwayLayTeam) {
    try {
        let games = await readListOfGamesWithOdds();
        let gamesFiltered = games.filter(game => game.awayTeamLayOdd > 5)
        await saveFilteredGames(gamesFiltered);

    } catch (error) {
        console.log(error)
    }
}

await filterGamesAwayTeamLayOddsMoreThan(ODD_LAY_AWAY_TEAM);