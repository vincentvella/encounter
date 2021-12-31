/*
  Warnings:

  - You are about to drop the column `profileSocketId` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "profileSocketId",
ADD COLUMN     "profile2SocketId" TEXT,
ALTER COLUMN "profile1SocketId" DROP NOT NULL;
