const WebSocket = require('ws');
const url = require('url');
const { addClient, removeClient } = require('./websocketState');
const getStreamerFromHash = require('../../database/database_utilities/getStreamerFromHash')

//Opens a new websocket for sending alerts to clients
//Called by server.js
const initializeWebsocketServer = (server) => {
    const wss = new WebSocket.Server({ noServer: true });

    wss.on('connection', async (ws, request) => {
        const { hash } = url.parse(request.url, true).query;
        const streamer = await getStreamerFromHash(hash)
        const streamerDatabaseId = streamer.id;

        addClient(hash, streamerDatabaseId, ws);

        ws.on('close', () => {
            removeClient(hash, streamerDatabaseId, ws);
        });

        ws.on('error', error => console.error('Websocket error:', error));
    });

    server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    });
}

module.exports = initializeWebsocketServer;