import { UserFavoriteRestaurant } from "@prisma/client";

export function isRestaurantFavorited(
  restaurantId: string,
  userFavoriteRestaurants: UserFavoriteRestaurant[],
) {
  return userFavoriteRestaurants?.some(
    (favorite) => favorite.restaurantId === restaurantId,
  );
}
