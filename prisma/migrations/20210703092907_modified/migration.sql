/*
  Warnings:

  - You are about to drop the column `ratingId` on the `Booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_ratingId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "ratingId";

-- CreateTable
CREATE TABLE "_BookingToRating" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookingToRating_AB_unique" ON "_BookingToRating"("A", "B");

-- CreateIndex
CREATE INDEX "_BookingToRating_B_index" ON "_BookingToRating"("B");

-- AddForeignKey
ALTER TABLE "_BookingToRating" ADD FOREIGN KEY ("A") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingToRating" ADD FOREIGN KEY ("B") REFERENCES "Rating"("id") ON DELETE CASCADE ON UPDATE CASCADE;
