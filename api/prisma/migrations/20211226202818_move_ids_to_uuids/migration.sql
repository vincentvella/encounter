/*
  Warnings:

  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SearchCriteria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserWaiting` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_searchCriteriaId_fkey";

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "searchCriteriaId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Location_id_seq";

-- AlterTable
ALTER TABLE "SearchCriteria" DROP CONSTRAINT "SearchCriteria_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SearchCriteria_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SearchCriteria_id_seq";

-- AlterTable
ALTER TABLE "UserWaiting" DROP CONSTRAINT "UserWaiting_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserWaiting_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserWaiting_id_seq";

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_searchCriteriaId_fkey" FOREIGN KEY ("searchCriteriaId") REFERENCES "SearchCriteria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
