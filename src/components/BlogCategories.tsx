
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample categories with post counts
const categories = [
  { name: "Planning Tips", count: 28 },
  { name: "Real Weddings", count: 15 },
  { name: "DIY Ideas", count: 12 },
  { name: "Vendor Spotlights", count: 9 },
  { name: "Budget Advice", count: 11 },
  { name: "Etiquette", count: 7 }
];

// Sample popular posts
const popularPosts = [
  "10 Questions to Ask Your Wedding Venue",
  "How to Choose the Perfect Wedding Date",
  "Must-Have Photos for Your Wedding Day",
  "Tips for Writing Your Own Vows"
];

const BlogCategories = () => {
  return (
    <div className="space-y-8">
      <Card className="border-wednest-beige">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-serif text-wednest-brown">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li key={index}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between text-wednest-brown-light hover:text-wednest-brown hover:bg-wednest-cream"
                >
                  <span>{category.name}</span>
                  <span className="bg-wednest-cream px-2 py-0.5 rounded-full text-xs text-wednest-brown">
                    {category.count}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card className="border-wednest-beige">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-serif text-wednest-brown">Popular Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {popularPosts.map((post, index) => (
              <li key={index}>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-left justify-start text-wednest-sage hover:text-wednest-sage-dark"
                >
                  {post}
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card className="border-wednest-beige">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-serif text-wednest-brown">Subscribe</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-wednest-brown-light mb-4">
            Get our latest blog posts and planning tips delivered to your inbox.
          </p>
          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full px-4 py-2 border border-wednest-beige rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-wednest-sage"
            />
            <Button className="w-full bg-wednest-sage hover:bg-wednest-sage-dark text-white">
              Subscribe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogCategories;
