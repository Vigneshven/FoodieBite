/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `restaurants` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `restaurants` ADD COLUMN `ownerId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `restaurants_ownerId_key` ON `restaurants`(`ownerId`);

-- AddForeignKey
ALTER TABLE `restaurants` ADD CONSTRAINT `restaurants_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `customers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
