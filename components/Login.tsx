"use client";

import { NextPage } from "next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import logo_light from "/public/logo_light.webp";
import background_img1 from "/public/packground-img1.jpg";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { loginRequest } from "@/redux/slices/auth";

const Login: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Local form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux auth state
  const { token, loading, error } = useSelector((state: RootState) => state.auth);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest({ email, password }));
  };

  // Redirect after successful login
  useEffect(() => {
    if (token) {
      router.push("/dashboardlayout");
    }
  }, [token, router]);

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row">
      {/* Left section */}
      <div className="hidden md:flex w-7/10 relative">
        <Image src={background_img1} alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="absolute top-4 left-4 z-10">
          <Image src={logo_light} alt="Logo" width={200} height={200} className="drop-shadow-[0_0_10px_white]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-10 z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white animate-fadeInUp text-left leading-snug">
            Welcome to <span className="text-[#94e03e]">EscoGym</span> <br />
            Manage your fitness community with ease
          </h1>
        </div>
      </div>

      {/* Right section */}
      <div className="w-full md:w-3/10 flex flex-col items-center justify-center bg-gray-100 relative px-4">
        <div className="md:hidden mb-8">
          <Image src={logo_light} alt="Logo" width={200} height={200} />
        </div>

        <div className="w-full max-w-sm flex flex-col justify-center gap-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Hello, good to see you again
          </h1>
          <p className="text-center text-gray-600 mb-4">Login to your account</p>

          <form className="flex flex-col gap-6" onSubmit={handleSignIn}>
            {/* Email input */}
            <div className="relative">
              <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#94e03e] w-full"
              />
            </div>

            {/* Password input */}
            <div className="relative">
              <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#94e03e] w-full"
              />
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              disabled={loading}
              className="p-3 rounded-full bg-[#94e03e] text-white font-semibold hover:bg-black transition w-full"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
