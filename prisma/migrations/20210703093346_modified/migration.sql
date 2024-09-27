/*
  Warnings:

  - You are about to drop the `_BookingToRating` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[bookingId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookingId` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BookingToRating" DROP CONSTRAINT "_BookingToRating_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookingToRating" DROP CONSTRAINT "_BookingToRating_B_fkey";

-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "bookingId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_BookingToRating";

-- CreateIndex
CREATE UNIQUE INDEX "Rating_bookingId_unique" ON "Rating"("bookingId");

-- AddForeignKey
ALTER TABLE "Rating" ADD FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
