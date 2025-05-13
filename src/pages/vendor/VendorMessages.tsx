
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import VendorLayout from "@/components/vendor/VendorLayout";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Search, Star, MessageCircle, Send, User, Clock, Calendar, Package, Check, Archive, MailOpen, Trash2, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    sender: {
      name: "Emily & Michael",
      email: "emily.michael@example.com",
      avatar: "EM",
    },
    subject: "Wedding Photography Inquiry",
    snippet: "Hi there, we're getting married next June and love your photography style. We're wondering if you're available on June 15th, 2025 and what packages you offer for full-day coverage.",
    date: "2025-05-10T14:30:00Z",
    isRead: false,
    status: "new", // new, replied, booked
    weddingDate: "2025-06-15",
    messages: [
      {
        id: 1,
        from: "client",
        timestamp: "2025-05-10T14:30:00Z",
        content: "Hi there, we're getting married next June and love your photography style. We're wondering if you're available on June 15th, 2025 and what packages you offer for full-day coverage. We're planning a garden ceremony with about 120 guests. Looking forward to hearing from you!"
      }
    ]
  },
  {
    id: 2,
    sender: {
      name: "Jessica & Daniel",
      email: "jessica.daniel@example.com",
      avatar: "JD",
    },
    subject: "Package Question",
    snippet: "Hello! We saw your Premium Package and have a few questions about the album options. Are we able to customize the number of pages?",
    date: "2025-05-08T09:15:00Z",
    isRead: true,
    status: "replied",
    weddingDate: "2025-08-22",
    messages: [
      {
        id: 1,
        from: "client",
        timestamp: "2025-05-08T09:15:00Z",
        content: "Hello! We saw your Premium Package and have a few questions about the album options. Are we able to customize the number of pages? Also, do you include engagement photos in your wedding packages or is that a separate service?"
      },
      {
        id: 2,
        from: "vendor",
        timestamp: "2025-05-09T10:30:00Z",
        content: "Hi Jessica & Daniel! Thanks for your interest in our services. Yes, all of our albums are fully customizable - you can add or remove pages as needed. The Premium Package comes with a 30-page album, and additional pages can be added for $15 per page. We do offer engagement sessions as part of our wedding packages or as a standalone service. Would you like me to send you more details on those options?"
      }
    ]
  },
  {
    id: 3,
    sender: {
      name: "Thomas & Sarah",
      email: "thomas.sarah@example.com",
      avatar: "TS",
    },
    subject: "Booking Confirmation",
    snippet: "We'd like to go ahead and book your Premium Package for our wedding on September 5th, 2025!",
    date: "2025-05-05T16:45:00Z",
    isRead: true,
    status: "booked",
    weddingDate: "2025-09-05",
    messages: [
      {
        id: 1,
        from: "client",
        timestamp: "2025-05-04T11:20:00Z",
        content: "We've been comparing photographers and really love your portfolio. Can you tell us more about your experience with outdoor ceremonies? Our venue is a vineyard."
      },
      {
        id: 2,
        from: "vendor",
        timestamp: "2025-05-04T15:45:00Z",
        content: "Thank you for your kind words about my portfolio! I've photographed many outdoor ceremonies, including several at vineyards. The natural light and scenic backgrounds always make for stunning photos. I always come prepared with the right equipment for any lighting conditions throughout the day. Would you like to see some samples from similar venues?"
      },
      {
        id: 3,
        from: "client",
        timestamp: "2025-05-05T16:45:00Z",
        content: "That's exactly what we wanted to hear! We've decided we'd like to go ahead and book your Premium Package for our wedding on September 5th, 2025! What are the next steps to secure our date?"
      }
    ]
  },
  {
    id: 4,
    sender: {
      name: "Robert & Lisa",
      email: "robert.lisa@example.com",
      avatar: "RL",
    },
    subject: "Thank You!",
    snippet: "We just wanted to thank you for the amazing job you did capturing our special day. The photos are perfect!",
    date: "2025-04-15T13:20:00Z",
    isRead: true,
    status: "archived",
    weddingDate: "2025-04-12",
    messages: [
      {
        id: 1,
        from: "client",
        timestamp: "2025-04-15T13:20:00Z",
        content: "We just got our wedding photos and we're absolutely blown away! You captured every moment perfectly, from the emotional ceremony to the wild dance floor. Our families are all asking for prints. Thank you so much for your incredible work and professionalism throughout the entire process!"
      },
      {
        id: 2,
        from: "vendor",
        timestamp: "2025-04-15T17:10:00Z",
        content: "Robert & Lisa, thank you so much for your kind words! It was truly an honor to be part of your special day. You both were a joy to work with, and the love between you was so evident in every frame. I'd be happy to help with print orders for your families - just let me know what they need! And remember, I'd be grateful if you could share your experience in a review when you have a moment. Wishing you both a lifetime of happiness!"
      }
    ]
  }
];

// Quick reply templates
const quickReplyTemplates = [
  {
    title: "Initial Response",
    content: "Thank you for your inquiry! I appreciate your interest in my services. I am available on [DATE] and would love to discuss how I can help make your special day perfect. Would you like to schedule a consultation call to discuss your needs in more detail?"
  },
  {
    title: "Pricing Information",
    content: "Thank you for asking about my pricing! My packages range from $X to $Y, depending on your specific needs. Each package includes [LIST FEATURES]. I'd be happy to provide a customized quote based on your requirements. Would you like to see my detailed pricing guide?"
  },
  {
    title: "Booking Confirmation",
    content: "Great news! I'd be delighted to be part of your special day. To secure your date, I'll need a signed contract and a deposit of $X. I'll send over the contract shortly for your review. Please let me know if you have any questions in the meantime."
  },
  {
    title: "Not Available",
    content: "Thank you so much for considering me for your special day. I'm truly honored, but unfortunately, I'm already booked on [DATE]. I'd be happy to recommend some talented colleagues who might be available if that would be helpful. Wishing you all the best with your wedding planning!"
  }
];

const VendorMessages = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isQuickReplyOpen, setIsQuickReplyOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter messages based on active tab and search term
  const filterMessages = () => {
    let filtered = messages;
    
    // Filter by tab
    if (activeTab === "unread") {
      filtered = filtered.filter(m => !m.isRead);
    } else if (activeTab === "replied") {
      filtered = filtered.filter(m => m.status === "replied");
    } else if (activeTab === "booked") {
      filtered = filtered.filter(m => m.status === "booked");
    } else if (activeTab === "archived") {
      filtered = filtered.filter(m => m.status === "archived");
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(m => 
        m.sender.name.toLowerCase().includes(term) || 
        m.subject.toLowerCase().includes(term) || 
        m.snippet.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  };
  
  const filteredMessages = filterMessages();
  
  const handleMessageClick = (message) => {
    // Mark as read if unread
    if (!message.isRead) {
      setMessages(messages.map(m => 
        m.id === message.id ? { ...m, isRead: true } : m
      ));
    }
    
    setSelectedMessage(message);
    setReplyText("");
  };
  
  const handleSendReply = () => {
    if (!replyText.trim()) return;
    
    // Add reply to message thread
    const updatedMessages = messages.map(m => {
      if (m.id === selectedMessage.id) {
        const updatedMessage = { 
          ...m, 
          status: m.status === "new" ? "replied" : m.status,
          messages: [
            ...m.messages,
            {
              id: m.messages.length + 1,
              from: "vendor",
              timestamp: new Date().toISOString(),
              content: replyText
            }
          ]
        };
        setSelectedMessage(updatedMessage);
        return updatedMessage;
      }
      return m;
    });
    
    setMessages(updatedMessages);
    setReplyText("");
    
    toast({
      title: "Message sent",
      description: "Your reply has been sent successfully.",
    });
  };
  
  const handleSelectQuickReply = (template) => {
    setReplyText(template.content);
    setIsQuickReplyOpen(false);
  };
  
  const handleArchiveMessage = () => {
    const updatedMessages = messages.map(m => 
      m.id === selectedMessage.id ? { ...m, status: "archived" } : m
    );
    
    setMessages(updatedMessages);
    setSelectedMessage(null);
    
    toast({
      title: "Message archived",
      description: "The conversation has been moved to the archive.",
    });
  };
  
  const handleMarkAsBooked = () => {
    const updatedMessages = messages.map(m => 
      m.id === selectedMessage.id ? { ...m, status: "booked" } : m
    );
    
    setMessages(updatedMessages);
    const updatedMessage = updatedMessages.find(m => m.id === selectedMessage.id);
    setSelectedMessage(updatedMessage);
    
    toast({
      title: "Client booked",
      description: "This inquiry has been marked as booked.",
    });
  };
  
  return (
    <VendorLayout title="Messages">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-serif text-wednest-brown">Inquiries & Messages</h2>
        </div>
        
        <Card className="p-0 overflow-hidden">
          <div className="flex h-[calc(100vh-220px)] min-h-[500px]">
            {/* Sidebar */}
            <div className="w-1/3 border-r flex flex-col">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <Tabs defaultValue="all" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start px-2 pt-2 pb-0 h-auto gap-1">
                  <TabsTrigger value="all" className="text-xs px-3">All</TabsTrigger>
                  <TabsTrigger value="unread" className="text-xs px-3">
                    Unread
                    {messages.filter(m => !m.isRead).length > 0 && (
                      <Badge className="ml-1.5 bg-wednest-sage h-5 w-5 p-0 flex items-center justify-center">
                        {messages.filter(m => !m.isRead).length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="replied" className="text-xs px-3">Replied</TabsTrigger>
                  <TabsTrigger value="booked" className="text-xs px-3">Booked</TabsTrigger>
                  <TabsTrigger value="archived" className="text-xs px-3">Archived</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="flex-1 overflow-y-auto m-0 data-[state=active]:flex-1">
                  <MessageList 
                    messages={filteredMessages}
                    selectedId={selectedMessage?.id} 
                    onSelect={handleMessageClick}
                  />
                </TabsContent>
                
                <TabsContent value="unread" className="flex-1 overflow-y-auto m-0 data-[state=active]:flex-1">
                  <MessageList 
                    messages={filteredMessages}
                    selectedId={selectedMessage?.id} 
                    onSelect={handleMessageClick}
                  />
                </TabsContent>
                
                <TabsContent value="replied" className="flex-1 overflow-y-auto m-0 data-[state=active]:flex-1">
                  <MessageList 
                    messages={filteredMessages}
                    selectedId={selectedMessage?.id} 
                    onSelect={handleMessageClick}
                  />
                </TabsContent>
                
                <TabsContent value="booked" className="flex-1 overflow-y-auto m-0 data-[state=active]:flex-1">
                  <MessageList 
                    messages={filteredMessages}
                    selectedId={selectedMessage?.id} 
                    onSelect={handleMessageClick}
                  />
                </TabsContent>
                
                <TabsContent value="archived" className="flex-1 overflow-y-auto m-0 data-[state=active]:flex-1">
                  <MessageList 
                    messages={filteredMessages}
                    selectedId={selectedMessage?.id} 
                    onSelect={handleMessageClick}
                  />
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Message content */}
            <div className="w-2/3 flex flex-col">
              {selectedMessage ? (
                <>
                  <div className="p-4 border-b flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{selectedMessage.subject}</h3>
                      <p className="text-sm text-gray-500">From {selectedMessage.sender.name}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {selectedMessage.status !== "booked" && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-green-600 border-green-600 hover:bg-green-50"
                          onClick={handleMarkAsBooked}
                        >
                          <Check className="h-4 w-4 mr-1" /> Mark as Booked
                        </Button>
                      )}
                      
                      {selectedMessage.status !== "archived" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleArchiveMessage}
                        >
                          <Archive className="h-4 w-4 mr-1" /> Archive
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-6">
                      {/* Client details box */}
                      <Card className="bg-gray-50">
                        <CardContent className="p-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-wednest-sage" />
                              <div>
                                <div className="text-gray-500">Client</div>
                                <div>{selectedMessage.sender.name}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-wednest-sage" />
                              <div>
                                <div className="text-gray-500">Wedding Date</div>
                                <div>{selectedMessage.weddingDate}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4 text-wednest-sage" />
                              <div>
                                <div className="text-gray-500">Status</div>
                                <Badge className={`${
                                  selectedMessage.status === "new" ? "bg-blue-100 text-blue-800" : 
                                  selectedMessage.status === "replied" ? "bg-purple-100 text-purple-800" :
                                  selectedMessage.status === "booked" ? "bg-green-100 text-green-800" :
                                  "bg-gray-100 text-gray-800"
                                }`}>
                                  {selectedMessage.status.charAt(0).toUpperCase() + selectedMessage.status.slice(1)}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-wednest-sage" />
                              <div>
                                <div className="text-gray-500">First Contact</div>
                                <div>{formatDistanceToNow(new Date(selectedMessage.date), { addSuffix: true })}</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Message thread */}
                      {selectedMessage.messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.from === "client" ? "justify-start" : "justify-end"}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg p-4 ${
                              message.from === "client" 
                                ? "bg-gray-100 border border-gray-200" 
                                : "bg-wednest-sage-light text-wednest-brown"
                            }`}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">
                                {message.from === "client" ? selectedMessage.sender.name : "Me"}
                              </span>
                              <span className="text-xs opacity-70">
                                {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                              </span>
                            </div>
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Reply</h4>
                      <Dialog open={isQuickReplyOpen} onOpenChange={setIsQuickReplyOpen}>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setIsQuickReplyOpen(true)}
                        >
                          Quick Replies
                        </Button>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Quick Reply Templates</DialogTitle>
                            <DialogDescription>
                              Select a template to use as a starting point for your reply.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4 my-4">
                            {quickReplyTemplates.map((template, index) => (
                              <div 
                                key={index} 
                                className="border rounded-md p-3 cursor-pointer hover:border-wednest-sage transition-colors"
                                onClick={() => handleSelectQuickReply(template)}
                              >
                                <h5 className="font-medium mb-2">{template.title}</h5>
                                <p className="text-sm text-gray-600 line-clamp-2">{template.content}</p>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    <Textarea
                      placeholder="Write your reply..."
                      className="min-h-[120px]"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    
                    <div className="mt-3 flex justify-end">
                      <Button 
                        onClick={handleSendReply} 
                        disabled={!replyText.trim()}
                        className="bg-wednest-sage hover:bg-wednest-sage-dark flex items-center gap-2"
                      >
                        <Send className="h-4 w-4" /> Send Reply
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-center p-6">
                  <div>
                    <MessageCircle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-wednest-brown">No message selected</h3>
                    <p className="text-gray-500 max-w-xs mx-auto mt-1">
                      Select a message from the sidebar to view its contents.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </VendorLayout>
  );
};

const MessageList = ({ messages, selectedId, onSelect }) => {
  return messages.length > 0 ? (
    <div className="divide-y">
      {messages.map((message) => (
        <div 
          key={message.id}
          className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
            selectedId === message.id ? 'bg-gray-50' : ''
          } ${!message.isRead ? 'border-l-4 border-wednest-sage' : ''}`}
          onClick={() => onSelect(message)}
        >
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-wednest-gold text-white flex items-center justify-center font-medium flex-shrink-0">
              {message.sender.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className={`font-medium truncate ${!message.isRead ? 'text-wednest-brown' : ''}`}>
                  {message.sender.name}
                </p>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(message.date), { addSuffix: true })}
                </span>
              </div>
              <p className={`text-sm truncate ${!message.isRead ? 'font-medium' : ''}`}>
                {message.subject}
              </p>
              <p className="text-xs text-gray-500 truncate mt-1">
                {message.snippet}
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                {message.status === "new" && !message.isRead && (
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">New</Badge>
                )}
                {message.status === "replied" && (
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Replied</Badge>
                )}
                {message.status === "booked" && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Booked</Badge>
                )}
                {message.status === "archived" && (
                  <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Archived</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center h-full p-6 text-center">
      <div>
        <MailOpen className="h-10 w-10 mx-auto text-gray-300 mb-2" />
        <p className="text-gray-500">No messages found</p>
      </div>
    </div>
  );
};

export default VendorMessages;
