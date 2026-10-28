import { Link } from "react-router-dom";
import CoinsAnimation from "../components/CoinsAnimation";

function NotFound() {
  return (
    <div className="flex flex-col items-center text-center mt-6 space-y-4">
      <CoinsAnimation />
      <h2 className="font-brand text-5xl text-[#4A2C1A]">Oops!</h2>
      <p className="text-lg font-semibold text-[#7A4318]">
        This page slipped through a hole in your pocket.
      </p>
      <Link
        to="/"
        className="inline-block bg-[#4A2C1A] hover:bg-[#3A2214] text-amber-50 border border-[#2E1A0E] shadow-md hover:shadow-lg transition rounded-lg px-4 py-2"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
