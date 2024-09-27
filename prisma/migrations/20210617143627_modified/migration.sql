-- DropIndex
DROP INDEX "ServiceProviderCategory_categoryId_unique";

-- DropIndex
DROP INDEX "ServiceProviderCategory_serviceId_unique";

-- CreateIndex
CREATE INDEX "ServiceProviderCategory.categoryId_serviceId_providerId_index" ON "ServiceProviderCategory"("categoryId", "serviceId", "providerId");
