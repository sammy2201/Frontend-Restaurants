"use client";

import { RefObject } from "react";
import { useRouter } from "next/navigation";
import "../css/components/Restaurants.css";
import { Heading1, Star } from "lucide-react";

export default function Restaurants({
  restaurants,
  containerRef,
  handleScroll,
  loading,
  hasMore,
}: {
  restaurants: any[];
  containerRef: RefObject<HTMLDivElement | null>;
  handleScroll: () => void;
  loading: boolean;
  hasMore: boolean;
}) {
  const router = useRouter();

  const handleClick = (placeId: string) => {
    router.push(`/restaurant/${placeId}`);
  };

  return (
    <div className="restaurants-list">
      <h2>Restaurants</h2>
      <div
        ref={containerRef}
        className={restaurants.length == 0 ? " container" : " blur container "}
        onScroll={handleScroll}>
        <div className="filters"></div>
        <div className="grid">
          {restaurants.map((r, idx) => (
            <div
              key={`${r.place_id}-${idx}`}
              className="card"
              onClick={() => handleClick(r.place_id)}>
              <h3>{r.name}</h3>
              {r.rating && (
                <p className="rating">
                  <Star size={16} fill="#facc15" stroke="#facc15" />
                  {r.rating}
                </p>
              )}
              <p>{r.vicinity}</p>
            </div>
          ))}
        </div>
        {loading && <p className="center-text">Loading...</p>}
        {!hasMore && !loading && (
          <p className="center-text">No more restaurants</p>
        )}
      </div>
    </div>
  );
}
