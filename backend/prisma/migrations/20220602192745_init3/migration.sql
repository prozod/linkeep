/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "createdAt",
ADD COLUMN     "name" VARCHAR(255),
ADD COLUMN     "picture" TEXT;
