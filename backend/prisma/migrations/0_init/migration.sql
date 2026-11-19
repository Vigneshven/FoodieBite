-- CreateTable
CREATE TABLE `customers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('customer', 'restaurant_owner', 'delivery_partner', 'admin') NOT NULL DEFAULT 'customer',
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `email`(`email` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` TEXT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `category` VARCHAR(300) NOT NULL,
    `status` ENUM('active', 'pending', 'suspended') NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rating` DOUBLE NOT NULL DEFAULT 0,
    `phone` VARCHAR(150) NULL,

    UNIQUE INDEX `phone`(`phone` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
