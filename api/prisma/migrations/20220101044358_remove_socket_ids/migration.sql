/*
  Warnings:

  - You are about to drop the column `profile1SocketId` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `profile2SocketId` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "profile1SocketId",
DROP COLUMN "profile2SocketId";
