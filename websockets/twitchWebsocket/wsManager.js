let wsConnections = {};

const setWebSocket = (webSocketInstance, streamerDatabaseId, subscriptions) => {
    wsConnections[streamerDatabaseId] = {
        ws: webSocketInstance,
        subscriptions,
        id: "pending"
    };
};

const setWebSocketId = (streamerDatabaseId, id) => {
    const socket = getWebSocket(streamerDatabaseId);
    socket.id = id;
}

const setWsAfterReconnect = (streamerDatabaseId, websocketId, ws) => {
    const socket = getWebSocket(streamerDatabaseId);
    socket.ws = ws;
    socket.id = websocketId;
}

const getWebSocket = (streamerDatabaseId) => {
    return wsConnections[streamerDatabaseId] ? wsConnections[streamerDatabaseId] : null;
};

const getAllWebsockets = () => {
    return wsConnections;
}

const getSubscriptions = (streamerDatabaseId) => {
    return wsConnections[streamerDatabaseId] ? wsConnections[streamerDatabaseId].subscriptions : [];
}

const subscriptionExists = (streamerDatabaseId, type) => {
    return getSubscriptions(streamerDatabaseId).some(sub => sub.type === type);
}

const addSubscription = (streamerDatabaseId, type) => {
    if (wsConnections[streamerDatabaseId]) {
        wsConnections[streamerDatabaseId].subscriptions.push({
            id: null,
            type,
            status: "connecting"
        });
    }
} 

const updateSubscription = (streamerDatabaseId, subscriptionId, type) => {
    const subscriptions = getSubscriptions(streamerDatabaseId);

    const subscriptionIndex = subscriptions.findIndex(sub => sub.type === type);

    if (subscriptionIndex !== -1) {
        subscriptions[subscriptionIndex] = {
            id: subscriptionId,
            type,
            status: 'connected'
        }
    }
}

const closeWebSocket = (streamerDatabaseId) => {
    if (wsConnections[streamerDatabaseId]) {
        wsConnections[streamerDatabaseId].ws.close();
        delete wsConnections[streamerDatabaseId];
    }
};

module.exports = {
    setWebSocket,
    setWebSocketId,
    setWsAfterReconnect,
    getAllWebsockets,
    getWebSocket,
    getSubscriptions,
    subscriptionExists,
    addSubscription,
    updateSubscription,
    closeWebSocket
};
