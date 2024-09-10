const { Client } = require('discord-rpc');
const client = new Client({ transport: 'ipc' });

let clientId = '1280217370064982118';
let startTime = Date.now() - 10000 * 60 * 60 * 1000; 

function connectRpc() {
    client.login({ clientId }).catch(console.error);
}

client.on('ready', () => {
    console.log(`RPC démarré avec ID: ${clientId}`);

    client.setActivity({
        details: 'DT190',
        state: '999999', 
        startTimestamp: startTime, 
        largeImageKey: 'default',
        largeImageText: 'Mon application RPC',
        instance: false,
    });

    console.log('RPC activé');
});

client.on('disconnected', () => {
    console.error('Connexion fermée, tentative de reconnexion...');
    setTimeout(connectRpc, 5000); 
});

connectRpc();
