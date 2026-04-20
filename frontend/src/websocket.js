// Manages the real-time WebSocket (STOMP) connection with the Spring Boot backend.

import { Client } from '@stomp/stompjs'; // STOMP protocol client library

let stompClient = null; // holds the active STOMP client instance

// Opens a WebSocket connection and subscribes to live task updates.
// onMessageReceived(payload) is called whenever a task event arrives.
export const connectWebSocket = (onMessageReceived) => {
    stompClient = new Client({
        brokerURL: 'ws://localhost:8080/ws/websocket', // backend STOMP endpoint (SockJS path)
        debug: (str) => console.log(str),              // log STOMP frames (disable in production)
        reconnectDelay: 5000,                          // auto-reconnect after 5s if disconnected

        // Fires once the STOMP handshake succeeds
        onConnect: () => {
            console.log('Connected to WebSocket');

            // Listen for task events published by the backend (CREATED / UPDATED / DELETED)
            stompClient.subscribe('/topic/tasks', (message) => {
                if (message.body) {
                    onMessageReceived(JSON.parse(message.body)); // parse JSON and forward to React
                }
            });
        },

        // Fires if the broker reports a STOMP-level error
        onStompError: (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        },
    });

    stompClient.activate(); // open the WebSocket connection
};

// Closes the WebSocket connection (call this on component unmount to avoid leaks).
export const disconnectWebSocket = () => {
    if (stompClient) {
        stompClient.deactivate();
    }
};
