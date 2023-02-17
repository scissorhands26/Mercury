import React, { useEffect, useState } from "react";

export const LocationMap = (props: { lat: number; lng: number }) => {
  const [imageUrl, setImageUrl] = useState("/placeholder-map.jpg");

  const fallbackImage = "/placeholder-map.jpg";

  const handleMapError = () => {
    setImageUrl(fallbackImage);
  };

  useEffect(() => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY
      ? process.env.GOOGLE_MAPS_API_KEY
      : "";
    const center = `${props.lat},${props.lng}`;
    const size = "300x300";
    const zoom = "14";
    const marker = `color:red|${center}`;
    const url = `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=${zoom}&size=${size}&markers=${marker}&key=${apiKey}`;

    setImageUrl(url);
  }, [props.lat, props.lng]);

  return (
    <div className="bg-black h-[300px] w-[300px]">
      <img src={imageUrl} onError={handleMapError} alt="Map" />
    </div>
  );
};
