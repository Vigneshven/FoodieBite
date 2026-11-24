"use client";

import { useEffect, useRef } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { acceptRestaurantInvitation } from "@/api/restaurantOwner/api";

export default function AcceptRestaurantInvitationPage() {
  const router = useRouter();
  const requestStarted = useRef(false);
  useEffect(() => {
    if (requestStarted.current) return;
    requestStarted.current = true;

    const acceptInvitation = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (!token) {
          router.replace("/login?invitation=invalid");
          return;
        }

        const result = await acceptRestaurantInvitation(token);

        const email = result.data.email;

        router.replace(`/login?email=${email}&invitation=accepted`);
      } catch (error) {
        console.log(error);
        router.replace("/login?invitation=invalid");
      }
    };
    acceptInvitation();
  }, [router]);
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-yellow-100 opacity-60" />
        <div className="absolute inset-2 animate-pulse rounded-full bg-yellow-100" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50">
          <LoaderCircle className="h-9 w-9 animate-spin text-yellow-500" />
        </div>
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Verifying your invitation...
      </h2>
      <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
        Please wait.This may take a few moments.
      </p>
      <div className="mt-8 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-gray-100">
        <div className="h-full w-1/3 animate-[progress_2s_ease-in-out_infinite] rounded-full bg-yellow-500" />
      </div>
      <p className="mt-3 text-xs text-gray-400">
        Please don`t close or refresh this checkout page.
      </p>
    </div>
  );
}
