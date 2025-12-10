import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Image } from "antd";
import { authOptions } from "./api/auth/authOption";
import LoginForm from "./component/auth/LoginForm";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Left Section */}
      <div className="w-full sm:w-1/2 bg-[#DFF6FF] text-black p-8 sm:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
            Welcome Back!
          </h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-2 text-center">
            Your Next
          </h2>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Appointment Awaits.
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Manage, Book, Succeed. All in One Place.
          </p>

          <LoginForm
            className="w-full"
            showHeading={false}
            submitButtonClassName="w-full bg-[#06283D] text-white hover:bg-[#214a64] rounded-md"
          />

          <p className="text-xs text-gray-500 text-center font-semibold mt-6">
            By logging in, you agree to the{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            , including cookie use.
          </p>
        </div>
      </div>

      {/* Right Section - Barber Shop Image */}
      <div className="hidden sm:block w-1/2 h-full relative">
        <Image
          src="/images/pngFiles/mainpg.png"
          alt="Barber Shop Interior"
          style={{ objectFit: "cover" }}
          height="100%"
          width="100%"
        />
      </div>
    </main>
  );
}
