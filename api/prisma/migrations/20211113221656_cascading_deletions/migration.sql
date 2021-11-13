-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_searchCriteriaId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "SearchCriteria" DROP CONSTRAINT "SearchCriteria_profileId_fkey";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchCriteria" ADD CONSTRAINT "SearchCriteria_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_searchCriteriaId_fkey" FOREIGN KEY ("searchCriteriaId") REFERENCES "SearchCriteria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
