"use client";

import { useEffect } from "react";
import axios from "axios";
import Search from "@/components/Search";
import Restaurants from "@/components/Restaurants";
import { useAppState } from "@/context/AppStateContext";
import Welcome from "@/components/Welcome";
import { Restaurant } from "@/types/types";

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

  const fetchRestaurants = async (newPage: number) => {
    if (!location || loading) return;
    setLoading(true);

    try {
      const res = await axios.get("http://localhost:3000/restaurants", {
        params: {
          location: location,
          radius: 1500,
          page: newPage,
        },
      });

      const { status, data, message } = res.data;

      if (status === "error") {
        console.error("API Error:", message);
        setHasMore(false);
        return;
      }

      const fetched: Restaurant[] = data?.results || [];
      if (fetched.length === 0) setHasMore(false);

      setRestaurants((prev: Restaurant[]) => {
        const combined = newPage === 1 ? fetched : [...prev, ...fetched];
        return combined;
      });
    } catch (err) {
      console.error("Request failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    setHasMore(true);
    fetchRestaurants(1);
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
      />
    </div>
  );
}
