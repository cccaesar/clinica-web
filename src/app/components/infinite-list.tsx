import axios from "axios";
import React from "react";

export function useInfiniteList({url}: {url: string}) {
  const [items, setItems] = React.useState<any[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(0);

  const loadItems = async (currentOffset: number) => {
    const controller = new AbortController();
    const {signal} = controller;

    try {
      setIsLoading(true);

      const res = await axios.get(
        url,
        { params: { page: currentOffset }, ...signal },
      );

      if (res.status > 400) {
        throw new Error("Network response was not ok");
      }

      const json = res.data;

      setHasMore(json?.next !== null);
      if (json) {
        const newItems = [...items];
        for (const item of json) {
          if (!newItems.includes(item)) {
            newItems.push(item);
          }
        }
        setItems(newItems);
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        console.error("There was an error with the fetch operation:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadItems(offset);
  }, []);

  const onLoadMore = () => {
    const newOffset = offset + 1;

    setOffset(newOffset);
    loadItems(newOffset);
  };

  return {
    items,
    hasMore,
    isLoading,
    onLoadMore,
  };
}


