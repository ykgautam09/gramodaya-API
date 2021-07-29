-- table structure
CREATE TABLE `report_detail`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` VARCHAR(50) NOT NULL,
    `market_id` VARCHAR(50) NOT NULL,
    `market_name` VARCHAR(100) NOT NULL,
    `cmdty_id` VARCHAR(50) NOT NULL,
    `market_type` VARCHAR(50) DEFAULT NULL,
    `cmdty_name` VARCHAR(50) NOT NULL,
    `price_unit` VARCHAR(50) NOT NULL,
    `conv_factor` INT NOT NULL,
    `price` INT NOT NULL,
    `report_id` VARCHAR(50) NOT NULL
);