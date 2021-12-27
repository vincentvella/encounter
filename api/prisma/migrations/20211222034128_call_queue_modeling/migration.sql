/*
  Warnings:

  - You are about to drop the column `guestId` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `hostId` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profile1Id]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profile2Id]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profile1Id` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile2Id` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_guestId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_hostId_fkey";

-- DropIndex
DROP INDEX "Location_id_key";

-- DropIndex
DROP INDEX "Profile_id_key";

-- DropIndex
DROP INDEX "Room_guestId_key";

-- DropIndex
DROP INDEX "Room_hostId_key";

-- DropIndex
DROP INDEX "Room_id_key";

-- DropIndex
DROP INDEX "SearchCriteria_id_key";

-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "guestId",
DROP COLUMN "hostId",
ADD COLUMN     "profile1Id" TEXT NOT NULL,
ADD COLUMN     "profile2Id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserWaiting" (
    "id" SERIAL NOT NULL,
    "profileId" TEXT NOT NULL,
    "queuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserWaiting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserWaiting_profileId_key" ON "UserWaiting"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Room_profile1Id_key" ON "Room"("profile1Id");

-- CreateIndex
CREATE UNIQUE INDEX "Room_profile2Id_key" ON "Room"("profile2Id");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_profile1Id_fkey" FOREIGN KEY ("profile1Id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_profile2Id_fkey" FOREIGN KEY ("profile2Id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWaiting" ADD CONSTRAINT "UserWaiting_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
