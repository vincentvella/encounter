/*
  Warnings:

  - Added the required column `ended` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "ended" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Encounter" (
    "id" TEXT NOT NULL,
    "profile1Id" TEXT NOT NULL,
    "profile2Id" TEXT NOT NULL,
    "met" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Encounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "callQuality" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "connectionSecured" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFeedback" (
    "id" SERIAL NOT NULL,
    "userQuality" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "raterId" TEXT NOT NULL,
    "ratedId" TEXT NOT NULL,

    CONSTRAINT "UserFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Encounter_profile1Id_key" ON "Encounter"("profile1Id");

-- CreateIndex
CREATE UNIQUE INDEX "Encounter_profile2Id_key" ON "Encounter"("profile2Id");

-- CreateIndex
CREATE UNIQUE INDEX "UserFeedback_raterId_key" ON "UserFeedback"("raterId");

-- CreateIndex
CREATE UNIQUE INDEX "UserFeedback_ratedId_key" ON "UserFeedback"("ratedId");

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_id_fkey" FOREIGN KEY ("id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_profile1Id_fkey" FOREIGN KEY ("profile1Id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_profile2Id_fkey" FOREIGN KEY ("profile2Id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_id_fkey" FOREIGN KEY ("id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFeedback" ADD CONSTRAINT "UserFeedback_raterId_fkey" FOREIGN KEY ("raterId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFeedback" ADD CONSTRAINT "UserFeedback_ratedId_fkey" FOREIGN KEY ("ratedId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
