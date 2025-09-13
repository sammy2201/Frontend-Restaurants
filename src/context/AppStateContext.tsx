"use client";
import { AppState } from "../types/types";

import { createContext, useContext, useState, useRef } from "react";

const AppStateContext = createContext<AppState | null>(null);

export const AppStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState("");
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <AppStateContext.Provider
      value={{
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
      }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
};
