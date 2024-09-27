/*
  Warnings:

  - A unique constraint covering the columns `[dayId]` on the table `DayTime` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DayTime.dayId_unique" ON "DayTime"("dayId");
