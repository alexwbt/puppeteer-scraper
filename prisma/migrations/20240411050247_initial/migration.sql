-- CreateTable
CREATE TABLE `tb_crawl` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` ENUM('RUNNING', 'STOPPED', 'COMPLETED', 'ERROR') NOT NULL DEFAULT 'RUNNING',
    `data` JSON NOT NULL,
    `option` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
