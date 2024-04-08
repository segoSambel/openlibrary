-- CreateTable
CREATE TABLE `books` (
    `id` CHAR(36) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `cover` VARCHAR(255) NOT NULL,
    `overview` TEXT NOT NULL,
    `isbn` VARCHAR(20) NOT NULL,
    `publication_year` CHAR(4) NOT NULL,
    `publisher_id` CHAR(36) NOT NULL,
    `author_id` CHAR(36) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
