"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import "@/css/pages/SingleRes.css";
import dynamic from "next/dynamic";
import { Star } from "lucide-react";
import { RestaurantDetails } from "@/types/types";

// dynamically import Map with SSR disabled
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function RestaurantPage() {
  const params = useParams();
  const placeId = params.placeId;
  const [restaurant, setRestaurant] = useState<RestaurantDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!placeId) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/restaurants/${placeId}`
        );

        const { status, data, message } = res.data;

        if (status === "error") {
          setErrorMessage(message || "Failed to fetch restaurant");
          setRestaurant(null);
        } else {
          setRestaurant(data);
        }
      } catch (err) {
        console.error("Failed to fetch restaurant:", err);
        setErrorMessage("Something went wrong while fetching restaurant");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [placeId]);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (errorMessage) return <p className="error-text">{errorMessage}</p>;
  if (!restaurant) return <p className="error-text">Restaurant not found</p>;

  const restaurantPosition: [number, number] = [
    restaurant.geometry.location.lat,
    restaurant.geometry.location.lng,
  ];

  return (
    <div className="restaurant-page">
      <h1 className="restaurant-name">{restaurant.name}</h1>

      <div className="section-wrapper">
        {/* section 1 */}
        <div className="map-wrapper">
          <Map position={restaurantPosition} restaurant={restaurant} />
        </div>
        {/* section 2 */}
        <div className="single-res-card restaurant-details">
          <p className="restaurant-info">
            <b>Address:</b> {restaurant.formatted_address}
          </p>

          {restaurant.formatted_phone_number && (
            <p className="restaurant-info">
              <b>Phone:</b> {restaurant.formatted_phone_number}
            </p>
          )}
          {restaurant.international_phone_number && (
            <p className="restaurant-info">
              <b>International Phone:</b>{" "}
              {restaurant.international_phone_number}
            </p>
          )}

          {restaurant.website && (
            <p className="restaurant-info">
              <b>Website:</b>{" "}
              <a
                className="restaurant-link"
                href={restaurant.website}
                target="_blank"
                rel="noreferrer">
                {restaurant.website}
              </a>
            </p>
          )}

          {restaurant.rating && (
            <p className="restaurant-rating">
              <b>Rating:</b> {restaurant.rating}{" "}
              <Star size={16} fill="#facc15" stroke="#facc15" /> (
              {restaurant.user_ratings_total} reviews)
            </p>
          )}

          {restaurant.price_level !== undefined && (
            <p className="restaurant-info">
              <b>Price Level:</b> {"$".repeat(restaurant.price_level)}
            </p>
          )}
          {restaurant.types && restaurant.types.length > 0 && (
            <p className="restaurant-info">
              <b>Categories:</b> {restaurant.types.join(", ")}
            </p>
          )}
          {restaurant.editorial_summary && (
            <div className="restaurant-summary">
              <b>Summary:</b>
              <p>{restaurant.editorial_summary.overview}</p>
            </div>
          )}
        </div>
      </div>

      <div className="section-wrapper">
        {/* section 3 */}
        <div className="single-res-card opening-hours info-block ">
          {restaurant.opening_hours?.weekday_text && (
            <div className="restaurant-hours">
              <b>Opening Hours:</b>
              <ul>
                {restaurant.opening_hours.weekday_text.map((day, idx) => (
                  <li key={idx}>{day}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* section 4 */}
        <div className="reviews single-res-card">
          {restaurant.reviews && restaurant.reviews.length > 0 && (
            <div className="restaurant-reviews">
              <b>Reviews:</b>
              <ul>
                {restaurant.reviews.slice(0, 8).map((review, idx) => (
                  <li key={idx} className="review-item">
                    <p>
                      <b>{review.author_name}</b> ({review.rating}{" "}
                      <Star size={16} fill="#facc15" stroke="#facc15" />)
                    </p>
                    <p>{review.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* section 5 */}
      {restaurant.serves_breakfast !== undefined && (
        <div className="single-res-card info-block ">
          <div className="restaurant-services">
            <b>Services:</b>
            <ul>
              {restaurant.delivery !== undefined && (
                <li>Delivery: {restaurant.delivery ? "Yes" : "No"}</li>
              )}
              {restaurant.dine_in !== undefined && (
                <li>Dine-in: {restaurant.dine_in ? "Yes" : "No"}</li>
              )}
              {restaurant.reservable !== undefined && (
                <li>Reservable: {restaurant.reservable ? "Yes" : "No"}</li>
              )}
              {restaurant.serves_breakfast !== undefined && (
                <li>Breakfast: {restaurant.serves_breakfast ? "Yes" : "No"}</li>
              )}
              {restaurant.serves_brunch !== undefined && (
                <li>Brunch: {restaurant.serves_brunch ? "Yes" : "No"}</li>
              )}
              {restaurant.serves_lunch !== undefined && (
                <li>Lunch: {restaurant.serves_lunch ? "Yes" : "No"}</li>
              )}
              {restaurant.serves_dinner !== undefined && (
                <li>Dinner: {restaurant.serves_dinner ? "Yes" : "No"}</li>
              )}
              {restaurant.serves_beer !== undefined && (
                <li>Beer: {restaurant.serves_beer ? "Yes" : "No"}</li>
              )}
              {restaurant.serves_wine !== undefined && (
                <li>Wine: {restaurant.serves_wine ? "Yes" : "No"}</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
