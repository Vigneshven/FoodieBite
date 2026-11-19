-- AlterTable
ALTER TABLE `restaurants` ADD COLUMN `city` VARCHAR(100) NULL,
    ADD COLUMN `country` VARCHAR(100) NULL DEFAULT 'India',
    ADD COLUMN `cuisines` VARCHAR(500) NULL,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `landmark` VARCHAR(255) NULL,
    ADD COLUMN `logo` TEXT NULL,
    ADD COLUMN `openingHours` JSON NULL,
    ADD COLUMN `postalCode` VARCHAR(20) NULL,
    ADD COLUMN `restaurantType` VARCHAR(100) NULL,
    ADD COLUMN `state` VARCHAR(100) NULL,
    ADD COLUMN `streetAddress` VARCHAR(255) NULL;
