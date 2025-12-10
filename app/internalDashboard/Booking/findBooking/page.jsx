"use client";
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { message } from 'antd';
import UpperSection from '../../../component/internalDashboard/findBooking/UpperSection/UpperSection';
import MiddleSection from '../../../component/internalDashboard/findBooking/MiddleSection/MiddleSection';
import { API_ENDPOINTS, apiCall } from '../../../api/apiContent/apiContent';

const FindBookingPage = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchParams) => {
    try {
      setLoading(true);
      const filters = {
        ...searchParams,
        startDate: searchParams.dateRange?.startDate,
        endDate: searchParams.dateRange?.endDate,
      };
      
      // Remove dateRange from filters as we've extracted start and end dates
      delete filters.dateRange;

      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        // Only append defined, non-empty values. This prevents sending 'undefined' which
        // causes the backend to attempt parsing an invalid date string.
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value));
        }
      });

      const data = await apiCall(
        `${API_ENDPOINTS.BOOKINGS.BASE}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      );

      if (Array.isArray(data)) {
        setBookings(data);
        if (data.length === 0) {
          message.info('No bookings found matching your search criteria');
        }
      } else {
        console.error('Received invalid data format:', data);
        message.error('Error fetching bookings');
        setBookings([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      message.error('Failed to search bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <UpperSection onSearch={handleSearch} loading={loading} />
      <MiddleSection bookings={bookings} loading={loading} />
    </div>
  );
};

export default FindBookingPage;
