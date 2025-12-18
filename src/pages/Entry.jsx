import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { User, UserX } from "lucide-react";
import { Helmet } from "react-helmet";

export default function Entry() {
  const navigate = useNavigate();

  const handleGuest = () => {
    Cookies.set(
      "user",
      JSON.stringify({
        id: "guest",
        role: "guest",
      }),
      { expires: 1 }
    );

    sessionStorage.setItem("showTransition", "true");
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>Welcome - CV. KORI BALI</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d3b66] to-[#3399cc] px-4">
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
            Welcome to CV. KORI BALI
          </h1>
          <p className="mt-2 text-white/80">Choose how you want to continue</p>

          <div className="relative mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* MEMBER */}
            <div
              onClick={() => navigate("/login")}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-8
              shadow-md transition-all duration-500 ease-out
              hover:scale-[1.035] hover:shadow-xl"
            >
              {/* BLUE OVERLAY */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br
                from-[#0d3b66]/15 via-[#0d3b66]/5 to-transparent
                opacity-0 transition-opacity duration-500
                group-hover:opacity-100"
              />

              <div
                className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full
                bg-[#0d3b66]/10 text-[#0d3b66]
                transition-all duration-500
                group-hover:scale-110 group-hover:shadow-md"
              >
                <User size={32} />
              </div>

              <h3 className="relative z-10 mt-6 text-xl font-semibold text-[#0d3b66]">
                Member
              </h3>
              <p className="relative z-10 mt-2 text-gray-500">
                Login with your account
              </p>
            </div>

            {/* GUEST */}
            <div
              onClick={handleGuest}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-8
              shadow-md transition-all duration-500 ease-out
              hover:scale-[1.035] hover:shadow-xl"
            >
              {/* BLUE OVERLAY */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br
                from-[#3399cc]/20 via-[#3399cc]/10 to-transparent
                opacity-0 transition-opacity duration-500
                group-hover:opacity-100"
              />

              <div
                className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full
                bg-[#3399cc]/10 text-[#3399cc]
                transition-all duration-500
                group-hover:scale-110 group-hover:shadow-md"
              >
                <UserX size={32} />
              </div>

              <h3 className="relative z-10 mt-6 text-xl font-semibold text-[#0d3b66]">
                Guest
              </h3>
              <p className="relative z-10 mt-2 text-gray-500">
                Explore without login
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
