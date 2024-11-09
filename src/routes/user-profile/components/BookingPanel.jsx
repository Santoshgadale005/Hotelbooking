import React, { useEffect, useState } from 'react';
import { networkAdapter } from 'services/NetworkAdapter';

const BookingPanel = ({ bookings }) => {
  const [bookingsWithDetails, setBookingsWithDetails] = useState([]);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      // Check if bookings is not an array
      if (
        !bookings ||
        typeof bookings !== 'object' ||
        !Array.isArray(bookings.data) ||
        bookings.data.length === 0
      ) {
        setBookingsWithDetails([]);
        return; // No bookings to fetch details for
      }

      try {
        const bookingsWithHotelDetails = await Promise.all(
          bookings.data.map(async (booking) => {
            const hotelResponse = await networkAdapter.get(
              `http://localhost:8080/api/hotels/code/${booking.hotelCode}`
            );
            return {
              ...booking,
              hotelDetails: hotelResponse, // Attach hotel details here
            };
          })
        );

        setBookingsWithDetails(bookingsWithHotelDetails);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
        setBookingsWithDetails([]); // Reset on error
      }
    };

    fetchHotelDetails();
  }, [bookings]);

  // Display message if there are no bookings
  if (bookingsWithDetails.length === 0) {
    return <div className="p-4 text-gray-600">No bookings found.</div>;
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {bookingsWithDetails.map((booking, index) => (
          <li key={index} className="bg-white hover:bg-gray-50">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-brand truncate">
                  {booking.hotelDetails?.name || 'Hotel details not available'}
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Status: {booking.status}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex gap-x-2">
                  <p className="flex items-center text-sm text-gray-500">
                    Room: {booking.room}
                  </p>
                  <p className="flex items-center text-sm text-gray-500">
                    Check-in: {booking.checkInDate}
                  </p>
                  <p className="flex items-center text-sm text-gray-500">
                    Check-out: {booking.checkOutDate}
                  </p>
                  <p className="flex items-center text-sm text-gray-500">
                    price per night : {booking.hotelDetails.price}
                  </p>
                  <p className="flex items-center text-sm text-gray-500">
                    city: {booking.hotelDetails.city}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingPanel;
