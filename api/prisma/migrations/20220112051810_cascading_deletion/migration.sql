-- DropForeignKey
ALTER TABLE "Encounter" DROP CONSTRAINT "Encounter_id_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_roomId_fkey";

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_id_fkey" FOREIGN KEY ("id") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
