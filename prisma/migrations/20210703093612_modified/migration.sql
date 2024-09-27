/*
  Warnings:

  - You are about to drop the column `transportCostId` on the `Booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookingId]` on the table `TransportCost` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookingId` to the `TransportCost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_transportCostId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "transportCostId";

-- AlterTable
ALTER TABLE "TransportCost" ADD COLUMN     "bookingId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TransportCost_bookingId_unique" ON "TransportCost"("bookingId");

-- AddForeignKey
ALTER TABLE "TransportCost" ADD FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
