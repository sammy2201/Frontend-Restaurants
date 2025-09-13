"use client";
import "@/css/components/Search.css";
import { Search as LucideSearch } from "lucide-react";

export default function Search({
  location,
  setLocation,
  onSearch,
}: {
  location: string;
  setLocation: (val: string) => void;
  onSearch: () => void;
}) {
  return (
    <div className="search-container">
      <div className="search-box">
        <LucideSearch className="search-icon" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="search-input"
        />
        <button onClick={onSearch} className="search-button">
          Search
        </button>
      </div>
    </div>
  );
}
