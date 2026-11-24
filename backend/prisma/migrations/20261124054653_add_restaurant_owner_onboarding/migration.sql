-- AlterTable
ALTER TABLE `customers`
ADD COLUMN `onboardingStatus` ENUM(
    'not_required',
    'pending_invitation',
    'invited',
    'profile_pending',
    'pending_review',
    'completed',
    'rejected'
) NOT NULL DEFAULT 'not_required';

-- CreateTable
CREATE TABLE `restaurant_invitations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `tokenHash` VARCHAR(255) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `acceptedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `restaurant_invitations_tokenHash_key`(`tokenHash`),
    INDEX `restaurant_invitations_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `restaurant_invitations`
ADD CONSTRAINT `restaurant_invitations_userId_fkey`
FOREIGN KEY (`userId`) REFERENCES `customers`(`id`)
ON DELETE RESTRICT ON UPDATE CASCADE;