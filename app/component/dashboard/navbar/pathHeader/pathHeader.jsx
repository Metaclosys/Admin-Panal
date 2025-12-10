"use client";
import { usePathname } from "next/navigation";
import React from "react";

function PathHeader() {
  const pathname = usePathname();

  const formatPathSegment = (segment) => {
    // Handle empty segments
    if (!segment) return "";

    // Split on camelCase and hyphens/underscores
    const words = segment
      .replace(/([A-Z])/g, ' $1') // Split on capital letters
      .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
      .trim();

    // Capitalize each word
    return words
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const renderPath = () => {
    const segments = pathname.split("/").filter(Boolean);
    
    // Handle root path
    if (segments.length === 0) {
      return "Dashboard";
    }

    // Check if any segment contains numbers
    const hasNumbers = segments.some(segment => /\d/.test(segment));
    
    if (hasNumbers) {
      // Show all segments up to and including the last one
      return segments
        .map((segment, index) => {
          // If this segment contains numbers, show the previous segment type
          if (/\d/.test(segment)) {
            const prevSegment = segments[index - 1]?.toLowerCase();
            const typeMap = {
              'shops': 'Shop',
              'customers': 'Customer',
              'employees': 'Employee',
              'services': 'Service',
              'bookings': 'Booking'
            };
            return typeMap[prevSegment] || segment;
          }
          return formatPathSegment(segment);
        })
        .join(" > ");
    }

    const lastSegment = segments[segments.length - 1];
    const normalizedLast = lastSegment?.toLowerCase();
    const actionKeywords = ["add", "edit", "create", "new"];

    if (normalizedLast && actionKeywords.some((keyword) => normalizedLast.includes(keyword)) && segments.length > 1) {
      return formatPathSegment(segments[segments.length - 2]);
    }

    // If no numbers, show only the last segment
    return formatPathSegment(lastSegment);
  };

  return (
    <div className="text-2xl font-bold text-gray-800 ml-8 mt-8">
      {renderPath()}
    </div>
  );
}

export default PathHeader;
