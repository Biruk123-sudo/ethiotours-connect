import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryBar from "@/components/CategoryBar";
import ExperienceCard from "@/components/ExperienceCard";
import Footer from "@/components/Footer";
import { experiences } from "@/data/experiences";

const Index = () => {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(
    () => category === "all" ? experiences : experiences.filter((e) => e.category === category),
    [category]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CategoryBar selected={category} onSelect={setCategory} />

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
          {category === "all" ? "Featured Experiences" : `${filtered.length} ${category.charAt(0).toUpperCase() + category.slice(1)} Experiences`}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((exp, i) => (
            <ExperienceCard key={exp.id} experience={exp} index={i} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">No experiences found in this category.</p>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Index;
