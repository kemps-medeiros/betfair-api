import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();


const APP_KEY_LATE = process.env.APP_KEY_LATE;


export async function readToken() {
    try {
        const data = fs.readFileSync('./token.json');
        const dataJson = JSON.parse(data);
        return dataJson.token;
    } catch (error) {
        console.log(error)
    }
}

export async function  getHeaders() {
    try {
        const token = await readToken();
        return {
            Accept: "application/json",
            "X-Application": APP_KEY_LATE,
            "X-Authentication": token
        }
    } catch (error) {
        console.log(error)
    }
}

// const headers = await getHeaders();
// console.log(headers);