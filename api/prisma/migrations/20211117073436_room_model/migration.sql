-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "hostId" TEXT,
    "guestId" TEXT,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_id_key" ON "Room"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Room_hostId_key" ON "Room"("hostId");

-- CreateIndex
CREATE UNIQUE INDEX "Room_guestId_key" ON "Room"("guestId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
