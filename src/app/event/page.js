"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(Array.isArray(data.events) ? data.events : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
          <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6 sm:mb-10">
            Upcoming Events
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-600 text-lg animate-pulse">Loading events...</p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-red-500">{error}</p>
            </div>
          ) : events.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">No events found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 h-auto sm:h-[500px] flex flex-col"
                >
                  <div className="relative h-48 sm:h-60 w-full">
                    <Image
                      src={event.banner.startsWith("http") ? event.banner : `/images/${event.banner}`}
                      alt={event.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">{event.name}</h2>
                    <p className="text-gray-600 text-sm sm:text-base mb-3 line-clamp-3">
                      {event.description}
                    </p>
                    <div className="mt-auto space-y-2">
                      <p className="text-gray-500 text-sm flex items-center">
                        <span className="mr-1">📍</span>
                        {event.location?.address || 
                         `${event.location?.latitude ?? "Unknown"}, ${event.location?.longitude ?? "Unknown"}`}
                      </p>
                      <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                        <p>
                          <span className="font-medium">{event.startDate}→</span>{' '}
                          <span className="text-gray-500">{event.startTime}</span>
                        </p>
                        <p className="flex items-center">
                          <span className="mx-1 text-gray-400"></span>
                          <span className="font-medium">
                            {event.endDate !== event.startDate && event.endDate}
                          </span>{' '}
                          <span className="text-gray-500">{event.endDate}→</span>{'  '}
                          <span className="text-gray-500">{event.endTime}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EventsPage;