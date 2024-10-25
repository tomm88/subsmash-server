const wsManager = require('./wsManager')

const awaitValidWebsocketId = (streamerDatabaseId) => {
    return new Promise((resolve) => {
        const checkSocketId = () => {
            const socket = wsManager.getWebSocket(streamerDatabaseId);
            if (socket && socket.id !== "pending") {
                resolve(socket);  
            } else {
                setTimeout(checkSocketId, 100);  
            }
        };
        checkSocketId(); 
    });
};

module.exports = awaitValidWebsocketId;