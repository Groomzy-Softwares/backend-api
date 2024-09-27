/*
  Warnings:

  - The primary key for the `DayTime` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "DayTime" DROP CONSTRAINT "DayTime_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");
