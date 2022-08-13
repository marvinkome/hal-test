import React from "react";

export function useWatchList() {
  const [watchlist, setWatchlist] = React.useState<string[]>([]);

  React.useEffect(() => {
    const watchlistInStorage = window.localStorage.getItem("pool-watchlist");
    if (!watchlistInStorage) return;

    const watchlist = JSON.parse(watchlistInStorage);
    setWatchlist(watchlist);
  }, []);

  const addItemToWatchlist = (poolId: string) => {
    const newList = [...new Set(watchlist.concat(poolId))];
    localStorage.setItem("pool-watchlist", JSON.stringify(newList));

    setWatchlist(newList);
  };

  const removeItemFromWatchlist = (poolId: string) => {
    const newList = watchlist.filter((pid) => pid !== poolId);
    localStorage.setItem("pool-watchlist", JSON.stringify(newList));

    setWatchlist(newList);
  };

  const toggleItemFromWatchlist = (poolId: string) => {
    if (watchlist.includes(poolId)) {
      removeItemFromWatchlist(poolId);
    } else {
      addItemToWatchlist(poolId);
    }
  };

  return { items: watchlist, addItem: addItemToWatchlist, removeItem: removeItemFromWatchlist, toggleItem: toggleItemFromWatchlist };
}
