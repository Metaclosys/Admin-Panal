"use client";
import EmptyState from "../../../component/internalDashboard/waitlist/emptyState";

export default function Waitlist() {
  return (
    <div className="min-h-screen ">
      <div className="p-8">
        <p className="text-gray-600 text-sm">Gents Barber - San Jose</p>

        <div className="mt-12">
          <EmptyState />
        </div>
      </div>
    </div>
  );
}
