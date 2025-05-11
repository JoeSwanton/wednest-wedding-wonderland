
import { Button } from "@/components/ui/button";
import { useState } from "react";

const categories = [
  "All",
  "Decor",
  "Flowers",
  "Attire",
  "Venues",
  "Color Schemes",
  "Themes",
  "Cakes",
  "Photography"
];

const InspirationCategories = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-serif text-wednest-brown mb-4">Browse by Category</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className={
              activeCategory === category 
                ? "bg-wednest-sage text-white hover:bg-wednest-sage-dark" 
                : "border-wednest-beige text-wednest-brown-light hover:bg-wednest-cream hover:text-wednest-brown"
            }
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default InspirationCategories;
