-- DropForeignKey
ALTER TABLE `books` DROP FOREIGN KEY `books_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `books` DROP FOREIGN KEY `books_publisher_id_fkey`;

-- AlterTable
ALTER TABLE `books` MODIFY `publisher_id` CHAR(36) NULL,
    MODIFY `author_id` CHAR(36) NULL;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_publisher_id_fkey` FOREIGN KEY (`publisher_id`) REFERENCES `publishers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
