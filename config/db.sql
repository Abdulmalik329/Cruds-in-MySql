-- Active: 1755252367116@@127.0.0.1@3306@pawer_tools
CREATE DATABASE pawer_tools

USE power_tools

SELECT DATABASE()


CREATE TABLE district (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

INSERT INTO district (name) VALUES
('Central District'),
('North District'),
('South District');



CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    role ENUM('client', 'owner', 'admin') NOT NULL,
    address VARCHAR(255)
);

INSERT INTO user (name, phone_number, email, password, is_active, role, address) VALUES
('Alice Johnson', '1234567890', 'alice@example.com', 'pass123', TRUE, 'client', '123 Elm St'),
('Bob Smith', '0987654321', 'bob@example.com', 'pass456', TRUE, 'owner', '456 Oak St'),
('Charlie Admin', '1122334455', 'charlie@example.com', 'adminpass', TRUE, 'admin', 'Admin HQ');


CREATE TABLE shop (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    ownerId INT,
    phone_number VARCHAR(50),
    district_id INT,
    address VARCHAR(255),
    location VARCHAR(255),
    FOREIGN KEY (ownerId) REFERENCES user(id),
    FOREIGN KEY (district_id) REFERENCES district(id)
);

INSERT INTO shop (name, ownerId, phone_number, district_id, address, location) VALUES
('Tool World', 2, '5551234567', 1, '789 Maple St', '40.7128° N, 74.0060° W'),
('Gear Hub', 2, '5559876543', 2, '321 Pine St', '34.0522° N, 118.2437° W');


CREATE TABLE tool (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255),
    description TEXT,
    tool_price DECIMAL(10, 2)
);

INSERT INTO tool (name, brand, description, tool_price) VALUES
('Drill', 'Bosch', 'Electric cordless drill', 89.99),
('Circular Saw', 'DeWalt', '7-inch blade saw', 129.50),
('Hammer', 'Stanley', 'Steel claw hammer', 19.75);


CREATE TABLE shop_tool (
    id INT PRIMARY KEY AUTO_INCREMENT,
    shop_id INT,
    tool_id INT,
    rent_price DECIMAL(10, 2),
    FOREIGN KEY (shop_id) REFERENCES shop(id),
    FOREIGN KEY (tool_id) REFERENCES tool(id)
);

INSERT INTO shop_tool (shop_id, tool_id, rent_price) VALUES
(1, 1, 15.00),   -- Tool World rents Bosch Drill
(1, 2, 25.00),   -- Tool World rents DeWalt Saw
(2, 3, 5.00);    -- Gear Hub rents Stanley Hammer


CREATE TABLE `order` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT,
    shop_tool_id INT,
    order_date DATE,
    period INT,
    total_price DECIMAL(10, 2),
    FOREIGN KEY (client_id) REFERENCES user(id),
    FOREIGN KEY (shop_tool_id) REFERENCES shop_tool(id)
);

INSERT INTO `order` (client_id, shop_tool_id, order_date, period, total_price) VALUES
(1, 1, '2025-08-20', 3, 45.00),  -- Alice rents drill for 3 days
(1, 2, '2025-08-22', 2, 50.00);  -- Alice rents saw for 2 days
 

CREATE TABLE admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    phone_number VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    is_creator BOOLEAN DEFAULT FALSE
);

INSERT INTO admin (full_name, email, password, phone_number, is_active, is_creator) VALUES
('Charlie Admin', 'charlie@example.com', 'adminpass', '1122334455', TRUE, TRUE);


show tables


