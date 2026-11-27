-- AlterTable
ALTER TABLE `restaurants` ADD COLUMN `rejectionReason` TEXT NULL,
    MODIFY `status` ENUM('active', 'pending', 'suspended', 'rejected') NOT NULL DEFAULT 'pending';
