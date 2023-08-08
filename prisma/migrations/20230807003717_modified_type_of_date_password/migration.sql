/*
  Warnings:

  - Made the column `category` on table `Products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customers" ALTER COLUMN "password" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "category" SET NOT NULL;
