/*
  Warnings:

  - The primary key for the `DayTime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `DayTime` table. All the data in the column will be lost.
  - Added the required column `providerId` to the `DayTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DayTime" DROP CONSTRAINT "DayTime_pkey",
DROP COLUMN "id",
ADD COLUMN     "providerId" INTEGER NOT NULL,
ADD PRIMARY KEY ("dayId", "timeId", "providerId");

-- CreateIndex
CREATE INDEX "DayTime.dayId_timeId_providerId_index" ON "DayTime"("dayId", "timeId", "providerId");

-- AddForeignKey
ALTER TABLE "DayTime" ADD FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;
