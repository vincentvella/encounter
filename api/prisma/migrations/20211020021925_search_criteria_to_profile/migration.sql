/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `SearchCriteria` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `SearchCriteria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SearchCriteria" ADD COLUMN     "profileId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SearchCriteria_profileId_key" ON "SearchCriteria"("profileId");

-- AddForeignKey
ALTER TABLE "SearchCriteria" ADD CONSTRAINT "SearchCriteria_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
