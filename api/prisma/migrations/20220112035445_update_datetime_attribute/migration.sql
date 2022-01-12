/*
  Warnings:

  - You are about to drop the column `met` on the `Encounter` table. All the data in the column will be lost.
  - Added the required column `savedOn` to the `Encounter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Encounter" DROP COLUMN "met",
ADD COLUMN     "savedOn" TIMESTAMP(3) NOT NULL;
