CREATE DATABASE IF NOT EXISTS `subsmashlive`;
USE `subsmashlive`;

CREATE TABLE streamers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    twitch_id VARCHAR(255) NOT NULL UNIQUE,
    twitch_username VARCHAR(255) NOT NULL,
    slideshow_hash VARCHAR(255) NOT NULL UNIQUE,
    alerts_hash VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    twitch_id VARCHAR(255) NOT NULL UNIQUE,
    twitch_username VARCHAR(255) NOT NULL
);

CREATE TABLE characters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    character_name VARCHAR(255),
    user_prompt TEXT,
    file_name VARCHAR(255),
    image_url TEXT
);

CREATE TABLE streamer_subscribers (
    streamer_id INT NOT NULL,
    subscriber_id INT NOT NULL,
    subscription_tier VARCHAR(50) NOT NULL,
    active BOOLEAN NOT NULL,
    FOREIGN KEY (streamer_id) REFERENCES streamers(id),
    FOREIGN KEY (subscriber_id) REFERENCES subscribers(id),
    FOREIGN KEY (character_id) REFERENCES characters(id)
);

CREATE TABLE twitch_websockets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL UNIQUE,
    connection_status VARCHAR(50) NOT NULL
);

CREATE TABLE streamer_tokens (
    streamer_id INT NOT NULL,
    access_token VARCHAR(255),
    refresh_token VARCHAR(255),
    token_expires_at DATE,
    FOREIGN KEY (streamer_id) REFERENCES streamers(id)
);

CREATE TABLE websocket_subscriptions (
    streamer_id INT NOT NULL,
    websocket_id INT NOT NULL,
    websocket_subscription_id VARCHAR(255) NOT NULL UNIQUE,
    subscription_type VARCHAR(255) NOT NULL,
    client_type VARCHAR(255) NOT NULL,
    FOREIGN KEY (streamer_id) REFERENCES streamers(id),
    FOREIGN KEY (websocket_id) REFERENCES twitch_websockets(id)
);

-- CREATE TABLE prompts (
--     streamer_id INT NOT NULL,
--     connecting_texts ARRAY,
--     attributes ARRAY
-- )