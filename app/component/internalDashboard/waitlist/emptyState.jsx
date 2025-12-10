"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaWalking } from "react-icons/fa";
import { BsCalendarPlus } from "react-icons/bs";

const EmptyState = () => {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center">
      <div className="max-w-lg">
        <h1 className="text-3xl text-black font-bold mb-4">
          Your waitlist is empty!
        </h1>
        <p className="text-gray-600 mb-8">
          The Booker system provides flexible, easy-to-access, comprehensive
          recording of waitlist information
        </p>

        <div className="space-y-4">
          <button
            onClick={() =>
              router.push("/internalDashboard/manageWaitlist/manageWalkin")
            }
            className="w-full max-w-md bg-[#06283D] text-white py-3 px-4 rounded-full hover:bg-blue-800 flex items-center justify-center gap-2"
          >
            <FaWalking className="text-xl" />
            Add to Walk-in Waitlist
          </button>

          <div className="text-center max-w-md">
            <span className="text-black font-semibold">Or</span>
          </div>

          <button
            onClick={() =>
              router.push("/internalDashboard/manageWaitlist/manageAppointment")
            }
            className="w-full max-w-md bg-[#06283D] text-white py-3 px-4 rounded-full hover:bg-blue-800 flex items-center justify-center gap-2"
          >
            <BsCalendarPlus className="text-xl" />
            Add to Appointment Request Waitlist
          </button>
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <Image
          src="/images/pngFiles/waiting.png"
          alt="Coffee cup illustration"
          width={400}
          height={400}
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default EmptyState;
