import React from "react";

interface MapSectionProps {
  title?: string;
  subtitle?: string;
}

export function MapSection({ title = "Notre Emplacement", subtitle = "Venez nous rendre visite à Lubumbashi" }: MapSectionProps) {
  return (
    <section className="py-16 bg-white dark:bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
          <iframe
            src="https://www.google.com/maps?q=Lubumbashi,Congo&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
            data-testid="map-iframe"
          />
        </div>
      </div>
    </section>
  );
}
