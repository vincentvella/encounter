/*
  Warnings:

  - You are about to drop the column `profile1Id` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `profile2Id` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[callerId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[calleeId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `calleeId` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `callerId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_profile1Id_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_profile2Id_fkey";

-- DropIndex
DROP INDEX "Room_profile1Id_key";

-- DropIndex
DROP INDEX "Room_profile2Id_key";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "profile1Id",
DROP COLUMN "profile2Id",
ADD COLUMN     "calleeId" TEXT NOT NULL,
ADD COLUMN     "callerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Room_callerId_key" ON "Room"("callerId");

-- CreateIndex
CREATE UNIQUE INDEX "Room_calleeId_key" ON "Room"("calleeId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_callerId_fkey" FOREIGN KEY ("callerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_calleeId_fkey" FOREIGN KEY ("calleeId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
