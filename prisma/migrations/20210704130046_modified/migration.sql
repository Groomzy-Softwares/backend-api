/*
  Warnings:

  - The primary key for the `DayTime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[dayId,providerId]` on the table `DayTime` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DayTime.dayId_timeId_providerId_index";

-- DropIndex
DROP INDEX "DayTime.dayId_unique";

-- AlterTable
ALTER TABLE "DayTime" DROP CONSTRAINT "DayTime_pkey",
ADD PRIMARY KEY ("dayId", "providerId");

-- CreateIndex
CREATE UNIQUE INDEX "DayTime.dayId_providerId_unique" ON "DayTime"("dayId", "providerId");

-- CreateIndex
CREATE INDEX "DayTime.dayId_providerId_index" ON "DayTime"("dayId", "providerId");
