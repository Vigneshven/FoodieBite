-- AlterTable
ALTER TABLE `restaurants` ADD COLUMN `email` VARCHAR(255) NULL,
    MODIFY `phone` VARCHAR(191) NULL;

-- RenameIndex
ALTER TABLE `restaurants` RENAME INDEX `phone` TO `restaurants_phone_key`;
