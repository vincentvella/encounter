-- DropForeignKey
ALTER TABLE "Encounter" DROP CONSTRAINT "Encounter_profile2Id_fkey";

-- DropForeignKey
ALTER TABLE "Encounter" DROP CONSTRAINT "Encounter_profile2SharedAttributesId_fkey";

-- AlterTable
ALTER TABLE "Encounter" ALTER COLUMN "profile2Id" DROP NOT NULL,
ALTER COLUMN "profile2SharedAttributesId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_profile2Id_fkey" FOREIGN KEY ("profile2Id") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_profile2SharedAttributesId_fkey" FOREIGN KEY ("profile2SharedAttributesId") REFERENCES "SharedAttributes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
