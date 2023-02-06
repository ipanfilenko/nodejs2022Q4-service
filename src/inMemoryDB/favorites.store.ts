export const favorites = {
  artists: [],
  albums: [],
  tracks: [],
};

export const FavoriteStore = {
  findAll: () => {
    return favorites
  },
  findOne: (id: string, type: string) => {
    const selectedFavorites = favorites[type];
    return selectedFavorites.find((_favoriteId: string) => _favoriteId === id);
  },
  create: (type: string, dto: Record<string, string>) => {
    favorites[type].push(dto);
    return dto;
  },
  remove: (id: string, type: string) => {
    favorites[type] = favorites[type].filter((_favorite) => _favorite.id !== id)

    return favorites;
  },
};
