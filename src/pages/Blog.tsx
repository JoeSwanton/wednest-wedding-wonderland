
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPosts from "@/components/BlogPosts";
import BlogCategories from "@/components/BlogCategories";

const Blog = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="bg-wednest-cream py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-serif text-wednest-brown text-center mb-4">
              Wedding Blog
            </h1>
            <p className="text-wednest-brown-light text-center max-w-2xl mx-auto mb-8">
              Tips, stories, and expert advice to help you plan your perfect 
              wedding day and enjoy the journey along the way.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-3/4">
              <BlogPosts />
            </div>
            <div className="w-full md:w-1/4">
              <BlogCategories />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
