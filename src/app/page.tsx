import HeroSection from "@/components/home/HeroSection";
import PromoBanner from "@/components/home/PromoBanner";
import ProductsGrid from "@/components/home/ProductsGrid";
import ExamCategories from "@/components/home/ExamCategories";
import Features from "@/components/home/Features";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PromoBanner />
      <ProductsGrid />
      <ExamCategories />
      <Features />
    </>
  );
}
