/*
  Warnings:

  - The primary key for the `ServiceProviderCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ServiceProviderCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ServiceProviderCategory" DROP CONSTRAINT "ServiceProviderCategory_pkey",
DROP COLUMN "id",
ADD PRIMARY KEY ("categoryId", "serviceId", "providerId");
