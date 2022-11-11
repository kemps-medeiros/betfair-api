import {
    login
} from "./login.js";



async function runApp() {
    try {
        await login();
    } catch (error) {
        console.log(error);
    }
}

async function getListEventTypes() {
    
}

runApp();