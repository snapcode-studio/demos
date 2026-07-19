import React from "react";

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MetalWorkingActivity", // Specialized local business type
    "@id": "https://www.pro-met.com.pl/#organization",
    "name": "PRO-MET Jacek Czajka",
    "alternateName": "PRO-MET Obróbka Skrawaniem CNC",
    "image": "https://www.pro-met.com.pl/images/hero_cnc.png", // main image
    "url": "https://www.pro-met.com.pl",
    "telephone": "+48530322975",
    "email": "biuro@pro-met.com.pl",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nowe Zalesie 14",
      "addressLocality": "Siennica",
      "postalCode": "05-332",
      "addressRegion": "mazowieckie",
      "addressCountry": "PL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.09133,
      "longitude": 21.61867
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "07:00",
      "closes": "16:00"
    },
    "sameAs": [],
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Siennica"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Mińsk Mazowiecki"
      },
      {
        "@type": "AdministrativeArea",
        "name": "województwo mazowieckie"
      }
    ],
    "description": "PRO-MET Jacek Czajka w Nowym Zalesiu k. Siennicy to nowoczesny zakład precyzyjnej obróbki skrawaniem CNC (toczenie, frezowanie, szlifowanie, wiercenie) oraz producent atestowanych kotew murłatowych, zawiasów, hantli fitness premium i gumowanych kotwic marynistycznych. Dystrybucja wspierana przez Agro-Mix."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
