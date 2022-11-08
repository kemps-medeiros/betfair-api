import axios from 'axios';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

const USERNAME = process.env.USERNAME_LOGIN
const PASSWORD = process.env.PASSWORD
const APP_KEY_LATE = process.env.APP_KEY_LATE
const BASEURL = process.env.BASEURL
const URL = `${BASEURL}login?username=${USERNAME}&password=${PASSWORD}`

let api = axios;

const headers = {
    Accept: "application/json",
    "X-Application": APP_KEY_LATE,
    "Content-Type": "application/x-www-form-urlencoded"
};


export async function login() {
    try {
        const response = await api.post(URL, null, {
            headers: headers
        });
        const token = response.data.token;
        await saveToken(token)
    } catch (error) {
        
    }
}

async function saveToken(token) {
    try {
        //importar fs com import export
        fs.writeFileSync('token.json', JSON.stringify({token: token}));
    } catch (error) {
        console.log(error)
    }
}