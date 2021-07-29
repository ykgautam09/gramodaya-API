-- table structure
CREATE TABLE report_detail(
    `id` int AUTO_INCREMENT PRIMARY KEY,
    `user_id` varchar(50) NOT NULL,
    `market_id` varchar(50) NOT NULL,
    `market_name` varchar(100) NOT NULL,
    `cmdty_id` varchar(50) NOT NULL,
    `market_type` varchar(50) DEFAULT NULL,
    `cmdty_name` varchar(50) NOT NULL,
    `price_unit` varchar(50) NOT NULL,
    `conv_factor` int NOT NULL,
    `price` int NOT NULL,
    `report_id` varchar(50) NOT NULL
);