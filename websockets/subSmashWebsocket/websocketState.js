const WebSocket = require('ws')
const clients = {}; 

//Adds client to the `clients` object when a new client connects to the SubSmash websocket
const addClient = (hash, streamerDatabaseId, ws) => {
    if (!clients[streamerDatabaseId]) {
        clients[streamerDatabaseId] = new Set(); 
    }
    clients[streamerDatabaseId].add({ws, hash}); 
    console.log('Client added for streamer ', streamerDatabaseId, " with hash ", hash)
}

//Remove client from the `clients` object when they disconnect from the SubSmash websocket
const removeClient = async (hash, streamerDatabaseId, ws) => {
    if (clients[streamerDatabaseId]) {
        for (const client of clients[streamerDatabaseId]) {
            if (client.ws === ws && client.hash === hash) {
                clients[streamerDatabaseId].delete(client); 
                break;
            }
        }
        console.log('Client REMOVED for streamer ', streamerDatabaseId, " with hash ", hash)        
    }
}

const getAllClients = () => {
    return clients;
}

const deleteClientSet = (streamerDatabaseId) => {
    delete clients[streamerDatabaseId]
}

//Broadcasts a websocket event to all clients connected for the relevant streamer
const broadcastToStreamers = (streamerDatabaseId, type, data) => {
    const userClients = clients[streamerDatabaseId] || new Set(); 
    userClients.forEach(client => {
        if (client.ws.readyState === WebSocket.OPEN) {
            client.ws.send(JSON.stringify({ type, data }));
        }
    });
}

module.exports = {
    addClient,
    removeClient,
    getAllClients,
    deleteClientSet,
    broadcastToStreamers,
};
