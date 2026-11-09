import { ShieldCheck, Utensils, Clock, Heart, Sparkles } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Quick and easy ordering",
    description: "Get your favourite meals without the hassle.",
  },
  {
    icon: Heart,
    title: "Personalized experience",
    description: "Discover food and restaurants you'll love.",
  },
  {
    icon: ShieldCheck,
    title: "Secure account access",
    description: "Your account information stays protected.",
  },
];

export default function LoginSidebar() {
  return (
    <aside className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-[#182D26] p-10 text-white lg:flex">
      <div className="absolute -right-24 top-20 size-80 rounded-full bg-[#D69A3C]/10 blur-3xl" />

      <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-[#E6A94B] text-[#182D26]">
            <Utensils className="size-6" />
          </div>

          <span className="text-2xl font-bold tracking-tight">FoodieBite</span>
        </div>
      </div>
      <div className="relative z-10 my-12 max-w-xl space-y-9">
        <div className="space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-[#E6A94B]">
            <Sparkles className="size-3.5" />
            WELCOME TO FOODIEBITE
          </span>

          <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
            Good food brings people together.
          </h1>

          <p className="max-w-md text-base leading-7 text-white/65">
            Sign in to explore delicious meals, discover restaurants, and enjoy
            a better food experience with FoodieBite.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2">
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1000&q=85"
            alt="Delicious food served on a restaurant table"
            className="h-64 w-full rounded-xl object-cover"
          />

          <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/10 bg-[#182D26]/85 p-4 backdrop-blur-md">
            <p className="text-sm font-semibold">
              Your next favourite meal is waiting.
            </p>

            <p className="mt-1 text-xs text-white/60">
              Discover, order, and enjoy.
            </p>
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
