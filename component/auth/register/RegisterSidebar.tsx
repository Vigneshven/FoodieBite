import { Bike, ShieldCheck, Store, Utensils, Zap } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure registration",
    description: "Your account and information stay protected.",
  },
  {
    icon: Zap,
    title: "Simple onboarding",
    description: "Get started with FoodieBite in just a few steps.",
  },
];

export default function RegisterSidebar() {
  return (
    <aside className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-[#182D26] p-10 text-white lg:flex">
      <div className="absolute -right-24 top-32 size-80 rounded-full bg-[#D69A3C]/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-20 size-72 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-[#E6A94B] text-[#182D26]">
            <Utensils className="size-6" />
          </div>

          <span className="text-2xl font-bold tracking-tight">FoodieBite</span>
        </div>
      </div>
      <div className="relative z-10 my-12 max-w-xl space-y-8">
        <div className="space-y-4">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-[#E6A94B]">
            YOUR FOOD BUSINESS PARTNER
          </span>

          <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
            Everything you need to grow with food.
          </h1>

          <p className="max-w-md text-base leading-7 text-white/65">
            Discover delicious food, manage your restaurant, or deliver
            happiness to customers. Join the FoodieBite community today.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <Store className="mb-3 size-6 text-[#E6A94B]" />
            <p className="text-sm font-semibold">Restaurant</p>
            <p className="mt-1 text-xs text-white/50">Grow your business</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <Utensils className="mb-3 size-6 text-[#E6A94B]" />
            <p className="text-sm font-semibold">Customer</p>
            <p className="mt-1 text-xs text-white/50">Enjoy great food</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <Bike className="mb-3 size-6 text-[#E6A94B]" />
            <p className="text-sm font-semibold">Delivery</p>
            <p className="mt-1 text-xs text-white/50">Deliver happiness</p>
          </div>
        </div>
        <div className="space-y-5 border-t border-white/10 pt-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#E6A94B]/10 text-[#E6A94B]">
                  <Icon className="size-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold">{feature.title}</p>
                  <p className="mt-1 text-xs text-white/55">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-5">
        <p className="text-xs text-white/45">
          © 2026 FoodieBite. All rights reserved.
        </p>

        <p className="text-xs text-white/45">Made for food lovers.</p>
      </div>
    </aside>
  );
}
