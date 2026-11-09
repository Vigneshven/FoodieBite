import FoodCategories from "@/component/public/FoodCategories";
import MainSection from "@/component/public/MainSection";
import PublicHeader from "@/component/public/PublicHeader";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <PublicHeader />
      <MainSection />
      <FoodCategories />
    </main>
  );
}
