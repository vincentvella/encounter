/*
  Warnings:

  - Added the required column `profile1SocketId` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileSocketId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "profile1SocketId" TEXT NOT NULL,
ADD COLUMN     "profileSocketId" TEXT NOT NULL;
