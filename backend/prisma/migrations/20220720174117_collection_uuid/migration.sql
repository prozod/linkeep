/*
  Warnings:

  - The primary key for the `Collection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "Collection_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Collection_id_key" ON "Collection"("id");
