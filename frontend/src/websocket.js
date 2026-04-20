import { Client } from '@stomp/stompjs';

let stompClient = null;

export const connectWebSocket = (onMessageReceived) => {
    stompClient = new Client({
        brokerURL: 'ws://localhost:8080/ws/websocket',
        debug: function (str) {
            console.log(str);
        },
        reconnectDelay: 5000,
        onConnect: () => {
            console.log('Connected to WebSocket');
            stompClient.subscribe('/topic/tasks', (message) => {
                if (message.body) {
                    onMessageReceived(JSON.parse(message.body));
                }
            });
        },
        onStompError: (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        },
    });

    stompClient.activate();
};

export const disconnectWebSocket = () => {
    if (stompClient) {
        stompClient.deactivate();
    }
};
