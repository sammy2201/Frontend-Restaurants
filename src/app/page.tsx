"use client";

import { useEffect } from "react";
import axios from "axios";
import Search from "../components/Search";
import Restaurants from "../components/Restaurants";
import { useAppState } from "../context/AppStateContext";
import Welcome from "@/components/Welcome";
import { Restaurant } from "../types/types";

export default function HomePage() {
  const {
    location,
    setLocation,
    restaurants,
    setRestaurants,
    page,
    setPage,
    loading,
    setLoading,
    hasMore,
    setHasMore,
    containerRef,
  } = useAppState();

  const fetchRestaurants = async (newPage: number, newLocation?: string) => {
    if (!location || loading) return;
    setLoading(true);

    try {
      const res = await axios.get("http://localhost:3000/restaurants", {
        params: {
          location: newLocation || location,
          radius: 1500,
          page: newPage,
        },
      });

      const data: Restaurant[] = res.data.results || [];
      if (data.length === 0) setHasMore(false);

      setRestaurants((prev: Restaurant[]) => {
        const combined = newPage === 1 ? data : [...prev, ...data];
        const unique = combined.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.place_id === item.place_id)
        );
        return unique;
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    setHasMore(true);
    fetchRestaurants(1, location);
  };

  const handleScroll = () => {
    if (!containerRef.current || loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setPage((prev: number) => (prev < 3 ? prev + 1 : prev));
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchRestaurants(page);
    }
  }, [page]);

  return (
    <div>
      <Welcome />
      <Search
        location={location}
        setLocation={setLocation}
        onSearch={handleSearch}
      />
      <Restaurants
        restaurants={restaurants}
        containerRef={containerRef}
        handleScroll={handleScroll}
        loading={loading}
        hasMore={hasMore}
      />
    </div>
  );
}
