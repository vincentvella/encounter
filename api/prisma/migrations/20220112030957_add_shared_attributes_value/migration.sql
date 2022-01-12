/*
  Warnings:

  - A unique constraint covering the columns `[profile1SharedAttributesId]` on the table `Encounter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profile2SharedAttributesId]` on the table `Encounter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profile1SharedAttributesId` to the `Encounter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile2SharedAttributesId` to the `Encounter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Encounter" ADD COLUMN     "profile1SharedAttributesId" TEXT NOT NULL,
ADD COLUMN     "profile2SharedAttributesId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SharedAttributes" (
    "id" TEXT NOT NULL,
    "email" BOOLEAN NOT NULL,
    "firstName" BOOLEAN NOT NULL,
    "lastName" BOOLEAN NOT NULL,
    "phoneNumber" BOOLEAN NOT NULL,

    CONSTRAINT "SharedAttributes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Encounter_profile1SharedAttributesId_key" ON "Encounter"("profile1SharedAttributesId");

-- CreateIndex
CREATE UNIQUE INDEX "Encounter_profile2SharedAttributesId_key" ON "Encounter"("profile2SharedAttributesId");

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_profile1SharedAttributesId_fkey" FOREIGN KEY ("profile1SharedAttributesId") REFERENCES "SharedAttributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_profile2SharedAttributesId_fkey" FOREIGN KEY ("profile2SharedAttributesId") REFERENCES "SharedAttributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
