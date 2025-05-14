
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import VendorLayout from "@/components/vendor/VendorLayout";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare, Send, ChevronDown, ChevronUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock reviews data
const reviewsData = [
  {
    id: 1,
    coupleName: "Emma & James",
    date: "2025-03-15",
    rating: 5,
    comment: "Absolutely amazing! Our photos turned out even better than we could have imagined. Very professional service from start to finish.",
    replied: false,
    tags: ["professional", "friendly", "high quality"],
    eventDate: "2025-02-28"
  },
  {
    id: 2,
    coupleName: "Sophia & William",
    date: "2025-02-22",
    rating: 4,
    comment: "Great photos and service. Would recommend to other couples planning their wedding. The only reason it's not 5 stars is because we had to wait a bit longer than expected for our final album.",
    replied: true,
    reply: "Thank you for your feedback! We apologize for the delay with your album and appreciate your understanding.",
    tags: ["good value", "creative", "responsive"],
    eventDate: "2025-01-15"
  },
  {
    id: 3,
    coupleName: "Olivia & Noah",
    date: "2025-01-08",
    rating: 5,
    comment: "Words cannot express how thrilled we are with our wedding photos! Every special moment was captured beautifully and the attention to detail was impressive.",
    replied: false,
    tags: ["professional", "artistic", "punctual"],
    eventDate: "2024-12-20"
  }
];

const VendorReviews = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [replyText, setReplyText] = useState("");
  const [expandedReview, setExpandedReview] = useState<number | null>(null);
  
  // Calculate average rating
  const averageRating = reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length;
  
  // Count reviews by rating
  const ratingCounts = reviewsData.reduce((counts, review) => {
    counts[review.rating] = (counts[review.rating] || 0) + 1;
    return counts;
  }, {} as Record<number, number>);
  
  const toggleExpand = (id: number) => {
    if (expandedReview === id) {
      setExpandedReview(null);
    } else {
      setExpandedReview(id);
    }
  };
  
  const handleReply = (id: number) => {
    console.log(`Reply to review ${id}: ${replyText}`);
    setReplyText("");
  };

  return (
    <VendorLayout title="Reviews">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-serif text-wednest-brown">Customer Reviews</h2>
          <p className="text-wednest-brown-light">See what couples are saying about your services</p>
        </div>

        {/* Rating Summary */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="text-center md:border-r md:pr-6 flex flex-col items-center">
                <p className="text-6xl font-bold text-wednest-brown">{averageRating.toFixed(1)}</p>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-wednest-gold fill-wednest-gold' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-sm text-wednest-brown-light mt-1">Based on {reviewsData.length} reviews</p>
              </div>
              
              <div className="flex-1 w-full">
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <div className="w-12 text-sm">{rating} stars</div>
                      <div className="flex-1 mx-3 h-4 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-wednest-gold" 
                          style={{ 
                            width: `${((ratingCounts[rating] || 0) / reviewsData.length) * 100}%` 
                          }} 
                        />
                      </div>
                      <div className="w-8 text-sm text-right">
                        {ratingCounts[rating] || 0}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-3 md:border-l md:pl-6">
                <Button className="bg-wednest-sage hover:bg-wednest-sage-dark">
                  <Send className="mr-2 h-4 w-4" /> Request Reviews
                </Button>
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" /> See Analytics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Filters */}
        <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Reviews ({reviewsData.length})</TabsTrigger>
            <TabsTrigger value="unreplied">Needs Reply ({reviewsData.filter(r => !r.replied).length})</TabsTrigger>
            <TabsTrigger value="replied">Replied ({reviewsData.filter(r => r.replied).length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {reviewsData.map((review) => (
              <Card key={review.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{review.coupleName}</CardTitle>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'text-wednest-gold fill-wednest-gold' : 'text-gray-200'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-wednest-brown-light">{review.date}</p>
                      <p className="text-xs text-wednest-gold">Wedding Date: {review.eventDate}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-wednest-brown">{review.comment}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {review.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="inline-block bg-wednest-sage/10 text-wednest-sage text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {review.replied && (
                      <div className="mt-3 pl-4 border-l-2 border-wednest-sage">
                        <p className="text-sm font-medium text-wednest-brown">Your Reply:</p>
                        <p className="text-sm text-wednest-brown-light">{review.reply}</p>
                      </div>
                    )}
                    
                    {!review.replied && (
                      <div className={`mt-3 ${expandedReview === review.id ? 'block' : 'hidden'}`}>
                        <textarea 
                          className="w-full border rounded-md p-2 text-sm" 
                          rows={3}
                          placeholder="Write a reply to this review..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <div className="mt-2 flex justify-end">
                          <Button 
                            size="sm"
                            disabled={!replyText.trim()}
                            onClick={() => handleReply(review.id)}
                          >
                            Send Reply
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {!review.replied && (
                      <div className="flex justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-wednest-brown-light hover:text-wednest-brown"
                          onClick={() => toggleExpand(review.id)}
                        >
                          {expandedReview === review.id ? (
                            <>Hide Reply <ChevronUp className="ml-1 h-4 w-4" /></>
                          ) : (
                            <>Reply <ChevronDown className="ml-1 h-4 w-4" /></>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="unreplied" className="space-y-4">
            {reviewsData.filter(r => !r.replied).map((review) => (
              <Card key={review.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{review.coupleName}</CardTitle>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'text-wednest-gold fill-wednest-gold' : 'text-gray-200'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-wednest-brown-light">{review.date}</p>
                      <p className="text-xs text-wednest-gold">Wedding Date: {review.eventDate}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-wednest-brown">{review.comment}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {review.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="inline-block bg-wednest-sage/10 text-wednest-sage text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className={`mt-3 ${expandedReview === review.id ? 'block' : 'hidden'}`}>
                      <textarea 
                        className="w-full border rounded-md p-2 text-sm" 
                        rows={3}
                        placeholder="Write a reply to this review..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <div className="mt-2 flex justify-end">
                        <Button 
                          size="sm"
                          disabled={!replyText.trim()}
                          onClick={() => handleReply(review.id)}
                        >
                          Send Reply
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-wednest-brown-light hover:text-wednest-brown"
                        onClick={() => toggleExpand(review.id)}
                      >
                        {expandedReview === review.id ? (
                          <>Hide Reply <ChevronUp className="ml-1 h-4 w-4" /></>
                        ) : (
                          <>Reply <ChevronDown className="ml-1 h-4 w-4" /></>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="replied" className="space-y-4">
            {reviewsData.filter(r => r.replied).map((review) => (
              <Card key={review.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{review.coupleName}</CardTitle>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'text-wednest-gold fill-wednest-gold' : 'text-gray-200'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-wednest-brown-light">{review.date}</p>
                      <p className="text-xs text-wednest-gold">Wedding Date: {review.eventDate}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-wednest-brown">{review.comment}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {review.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="inline-block bg-wednest-sage/10 text-wednest-sage text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-3 pl-4 border-l-2 border-wednest-sage">
                      <p className="text-sm font-medium text-wednest-brown">Your Reply:</p>
                      <p className="text-sm text-wednest-brown-light">{review.reply}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </VendorLayout>
  );
};

export default VendorReviews;
