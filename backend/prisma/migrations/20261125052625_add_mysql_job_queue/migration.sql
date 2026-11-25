-- AlterTable
ALTER TABLE `customers` MODIFY `onboardingStatus` ENUM('not_required', 'pending_invitation', 'invited', 'acceptance_processing', 'profile_pending', 'pending_review', 'completed', 'rejected') NOT NULL DEFAULT 'not_required';

-- CreateTable
CREATE TABLE `email_jobs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `to` VARCHAR(255) NOT NULL,
    `subject` VARCHAR(255) NOT NULL,
    `html` LONGTEXT NOT NULL,
    `status` ENUM('pending', 'processing', 'completed', 'failed') NOT NULL DEFAULT 'pending',
    `attempts` INTEGER NOT NULL DEFAULT 0,
    `maxAttempts` INTEGER NOT NULL DEFAULT 5,
    `scheduledAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lockedAt` DATETIME(3) NULL,
    `processedAt` DATETIME(3) NULL,
    `error` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `email_jobs_status_scheduledAt_createdAt_id_idx`(`status`, `scheduledAt`, `createdAt`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invitation_acceptance_jobs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `invitationId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `status` ENUM('pending', 'processing', 'completed', 'failed') NOT NULL DEFAULT 'pending',
    `attempts` INTEGER NOT NULL DEFAULT 0,
    `maxAttempts` INTEGER NOT NULL DEFAULT 5,
    `scheduledAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lockedAt` DATETIME(3) NULL,
    `processedAt` DATETIME(3) NULL,
    `error` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `customersId` INTEGER NULL,

    UNIQUE INDEX `invitation_acceptance_jobs_invitationId_key`(`invitationId`),
    INDEX `invitation_acceptance_jobs_status_scheduledAt_createdAt_id_idx`(`status`, `scheduledAt`, `createdAt`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `invitation_acceptance_jobs` ADD CONSTRAINT `invitation_acceptance_jobs_invitationId_fkey` FOREIGN KEY (`invitationId`) REFERENCES `restaurant_invitations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invitation_acceptance_jobs` ADD CONSTRAINT `invitation_acceptance_jobs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invitation_acceptance_jobs` ADD CONSTRAINT `invitation_acceptance_jobs_customersId_fkey` FOREIGN KEY (`customersId`) REFERENCES `customers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
