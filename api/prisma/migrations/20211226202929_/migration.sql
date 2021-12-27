/*
  Warnings:

  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Location` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `SearchCriteria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SearchCriteria` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `UserWaiting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `UserWaiting` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[searchCriteriaId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `searchCriteriaId` on the `Location` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_searchCriteriaId_fkey";

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "searchCriteriaId",
ADD COLUMN     "searchCriteriaId" INTEGER NOT NULL,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SearchCriteria" DROP CONSTRAINT "SearchCriteria_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SearchCriteria_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserWaiting" DROP CONSTRAINT "UserWaiting_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserWaiting_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Location_searchCriteriaId_key" ON "Location"("searchCriteriaId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_searchCriteriaId_fkey" FOREIGN KEY ("searchCriteriaId") REFERENCES "SearchCriteria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
