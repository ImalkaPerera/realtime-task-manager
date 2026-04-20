package com.senesh.taskmanager.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

// Configures STOMP over WebSocket so browsers receive real-time task events.
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");            // clients subscribe to /topic/*
        config.setApplicationDestinationPrefixes("/app"); // client-to-server messages use /app prefix
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")                    // WebSocket handshake URL: ws://localhost:8080/ws
                .setAllowedOriginPatterns("*")         // allow all origins (tighten in production)
                .withSockJS();                         // SockJS fallback for non-WebSocket environments
    }
}
