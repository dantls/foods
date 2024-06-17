-- DropIndex
DROP INDEX "UserFavoriteRestaurant_userId_restaurantId_key";

-- AlterTable
ALTER TABLE "UserFavoriteRestaurant" ADD CONSTRAINT "UserFavoriteRestaurant_pkey" PRIMARY KEY ("userId", "restaurantId");
