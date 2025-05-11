
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "10 Budget-Saving Tips for Your Wedding Day",
    excerpt: "Planning a wedding on a budget doesn't mean sacrificing style. Discover our top tips for creating a memorable celebration without breaking the bank.",
    imageUrl: "https://images.unsplash.com/photo-1522673607200-8e03134a127b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    author: "Emily Johnson",
    date: "May 2, 2025",
    categories: ["Budget Advice", "Planning Tips"]
  },
  {
    id: 2,
    title: "How to Choose the Perfect Wedding Venue",
    excerpt: "Your venue sets the tone for your entire wedding. Learn what to consider when selecting the perfect location for your special day.",
    imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    author: "Michael Williams",
    date: "April 28, 2025",
    categories: ["Venues", "Planning Tips"]
  },
  {
    id: 3,
    title: "Wedding Photography: Capturing Your Perfect Day",
    excerpt: "Your wedding photos will be treasured for a lifetime. Discover how to choose the right photographer and plan for beautiful wedding day images.",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    author: "Sophia Chen",
    date: "April 23, 2025",
    categories: ["Photography", "Planning Tips"]
  },
  {
    id: 4,
    title: "Real Wedding: Sarah & David's Beachfront Celebration",
    excerpt: "Get inspired by Sarah and David's beautiful beach wedding featuring local flowers and sustainable decor choices.",
    imageUrl: "https://images.unsplash.com/photo-1525772764200-be829a350476?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    author: "James Taylor",
    date: "April 15, 2025",
    categories: ["Real Weddings"]
  }
];

const BlogPosts = () => {
  return (
    <div className="space-y-10">
      {blogPosts.map((post) => (
        <Card key={post.id} className="border-wednest-beige overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <AspectRatio ratio={1} className="md:h-full">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex gap-2 mb-2">
                {post.categories.map((category, idx) => (
                  <Badge 
                    key={idx}
                    variant="secondary" 
                    className="bg-wednest-cream text-wednest-brown-light"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              <h2 className="text-2xl font-serif text-wednest-brown mb-2">{post.title}</h2>
              <div className="mb-3 text-sm text-wednest-brown-light">
                By {post.author} • {post.date}
              </div>
              <p className="text-wednest-brown-light mb-4">
                {post.excerpt}
              </p>
              <Button variant="link" className="text-wednest-sage hover:text-wednest-sage-dark p-0">
                Read More →
              </Button>
            </div>
          </div>
        </Card>
      ))}
      
      <div className="flex justify-center mt-8">
        <Button variant="outline" className="border-wednest-sage text-wednest-sage hover:bg-wednest-sage hover:text-white">
          Load More Posts
        </Button>
      </div>
    </div>
  );
};

export default BlogPosts;
