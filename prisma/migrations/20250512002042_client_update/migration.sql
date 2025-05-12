/*
  Warnings:

  - You are about to drop the column `cpf` on the `Client` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cnpj]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Client_cpf_key` ON `Client`;

-- AlterTable
ALTER TABLE `Client` DROP COLUMN `cpf`,
    ADD COLUMN `cnpj` VARCHAR(14) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Client_cnpj_key` ON `Client`(`cnpj`);
