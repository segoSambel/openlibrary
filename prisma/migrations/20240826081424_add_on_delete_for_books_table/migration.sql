-- DropForeignKey
ALTER TABLE `books` DROP FOREIGN KEY `books_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `books` DROP FOREIGN KEY `books_publisher_id_fkey`;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_publisher_id_fkey` FOREIGN KEY (`publisher_id`) REFERENCES `publishers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
