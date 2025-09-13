"use client";

import { RefObject, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import "@/css/components/Restaurants.css";
import { Star } from "lucide-react";

export default function Restaurants({
  restaurants,
  containerRef,
  handleScroll,
  loading,
}: {
  restaurants: any[];
  containerRef: RefObject<HTMLDivElement | null>;
  handleScroll: () => void;
  loading: boolean;
}) {
  const router = useRouter();
  const [filter, setFilter] = useState("");

  const handleClick = (placeId: string) => {
    router.push(`/restaurant/${placeId}`);
  };

  const filteredRestaurants = useMemo(() => {
    let result = [...restaurants];

    console.log("Applying filter:", restaurants);
    switch (filter) {
      case "rating-asc":
        result.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        break;
      case "rating-desc":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "bar":
        result = result.filter((r) => r.types?.includes("bar"));
        break;
      case "open-now":
        result = result.filter((r) => r.opening_hours?.open_now == true);
        break;
    }

    return result;
  }, [restaurants, filter]);

  return (
    <div className="restaurants-list">
      <h2>Restaurants</h2>
      <div
        ref={containerRef}
        className={restaurants.length == 0 ? "container" : "blur container"}
        onScroll={handleScroll}>
        <div className="filters">
          <h3>List Of Restaurants</h3>
          <select
            className="filter-dropdown"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}>
            <option value="">Filter by...</option>
            <option value="rating-asc">Rating: Low → High</option>
            <option value="rating-desc">Rating: High → Low</option>
            <option value="open-now">Open Now</option>
            <option value="bar">Bar</option>
          </select>
        </div>

        <div className="grid">
          {filteredRestaurants.map((r, idx) => (
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
      </div>
    </div>
  );
}
