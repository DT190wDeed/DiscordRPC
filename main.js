const { app, BrowserWindow, ipcMain } = require('electron');
const { Client } = require('discord-rpc');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 400,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.loadFile('index.html'); 
}

const client = new Client({ transport: 'ipc' });

let clientId = '1280217370064982118'; 
let startTime = Date.now() - 10000 * 60 * 60 * 1000; 

function connectRpc(details, state) {
    client.login({ clientId }).catch(console.error);

    client.on('ready', () => {
        client.setActivity({
            details: details || 'DT190', 
            state: state || '999999',
            startTimestamp: startTime,
            largeImageKey: 'default',
            largeImageText: 'Mon application RPC',
            instance: false,
        });

        console.log(`RPC démarré avec ID: ${clientId}, Détails: ${details}, État: ${state}`);
    });
}

client.on('disconnected', () => {
    console.error('Connexion fermée, tentative de reconnexion...');
    setTimeout(() => connectRpc(), 5000); 
});

ipcMain.on('start-rpc', (event, { details, state }) => {
    connectRpc(details, state);
});

ipcMain.on('stop-rpc', () => {
    client.clearActivity();
    client.destroy();
    console.log('RPC arrêté');
});

app.whenReady().then(createWindow); 
