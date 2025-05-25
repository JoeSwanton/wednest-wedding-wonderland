
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Search, Phone, Video, MoreVertical, Send, Paperclip } from "lucide-react";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: "user" | "vendor";
  type: "text" | "image" | "file";
}

interface Conversation {
  id: string;
  vendorName: string;
  vendorType: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  avatar: string;
  messages: Message[];
}

const Messages = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      vendorName: "Emma's Photography",
      vendorType: "Photographer",
      lastMessage: "I've uploaded the engagement photos to your gallery!",
      lastMessageTime: "10:30 AM",
      unreadCount: 2,
      isOnline: true,
      avatar: "EP",
      messages: [
        {
          id: "1",
          text: "Hi! I'm excited to work with you on your wedding photography.",
          timestamp: "Yesterday 2:30 PM",
          sender: "vendor",
          type: "text"
        },
        {
          id: "2",
          text: "Thank you! We're so excited too. When can we schedule our engagement shoot?",
          timestamp: "Yesterday 3:15 PM",
          sender: "user",
          type: "text"
        },
        {
          id: "3",
          text: "How about this Saturday morning? The lighting would be perfect at the botanical gardens.",
          timestamp: "Today 9:45 AM",
          sender: "vendor",
          type: "text"
        },
        {
          id: "4",
          text: "That sounds perfect! What time should we meet?",
          timestamp: "Today 10:00 AM",
          sender: "user",
          type: "text"
        },
        {
          id: "5",
          text: "I've uploaded the engagement photos to your gallery!",
          timestamp: "Today 10:30 AM",
          sender: "vendor",
          type: "text"
        }
      ]
    },
    {
      id: "2",
      vendorName: "Bella Vista Venue",
      vendorType: "Venue",
      lastMessage: "The menu tasting is confirmed for Friday at 2 PM",
      lastMessageTime: "Yesterday",
      unreadCount: 0,
      isOnline: false,
      avatar: "BV",
      messages: [
        {
          id: "1",
          text: "Welcome to Bella Vista! We're thrilled to host your special day.",
          timestamp: "2 days ago",
          sender: "vendor",
          type: "text"
        },
        {
          id: "2",
          text: "Thank you! We'd love to schedule a menu tasting.",
          timestamp: "2 days ago",
          sender: "user",
          type: "text"
        },
        {
          id: "3",
          text: "The menu tasting is confirmed for Friday at 2 PM",
          timestamp: "Yesterday",
          sender: "vendor",
          type: "text"
        }
      ]
    },
    {
      id: "3",
      vendorName: "Harmony Flowers",
      vendorType: "Florist",
      lastMessage: "Here are some bouquet inspirations based on your preferences",
      lastMessageTime: "2 days ago",
      unreadCount: 1,
      isOnline: true,
      avatar: "HF",
      messages: [
        {
          id: "1",
          text: "Hi! I saw your inquiry about bridal bouquets. I'd love to help create something beautiful for your wedding.",
          timestamp: "3 days ago",
          sender: "vendor",
          type: "text"
        },
        {
          id: "2",
          text: "Here are some bouquet inspirations based on your preferences",
          timestamp: "2 days ago",
          sender: "vendor",
          type: "text"
        }
      ]
    }
  ]);

  const selectedChat = conversations.find(conv => conv.id === selectedConversation);
  
  const filteredConversations = conversations.filter(conv =>
    conv.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.vendorType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      timestamp: new Date().toLocaleString(),
      sender: "user",
      type: "text"
    };
    
    setConversations(convs =>
      convs.map(conv =>
        conv.id === selectedConversation
          ? { ...conv, messages: [...conv.messages, newMessage] }
          : conv
      )
    );
    
    setMessageText("");
  };

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="min-h-screen flex bg-theme-cream/10">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        <div className="p-6 flex-1 overflow-hidden">
          <div className="mb-6">
            <h1 className="text-2xl font-serif font-semibold text-theme-brown mb-2">Messages</h1>
            <p className="text-theme-brown-light">Communicate with your wedding vendors</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            {/* Conversations List */}
            <Card className="bg-white border-theme-cream shadow-sm flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-theme-brown flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Conversations
                    {totalUnread > 0 && (
                      <Badge className="bg-red-500 text-white ml-2">{totalUnread}</Badge>
                    )}
                  </CardTitle>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-theme-brown-light" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-0">
                <div className="space-y-1">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`p-4 cursor-pointer border-b border-theme-cream/50 hover:bg-theme-cream/20 transition-colors ${
                        selectedConversation === conversation.id ? 'bg-theme-cream/30' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-theme-brown text-white text-sm">
                              {conversation.avatar}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.isOnline && (
                            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-theme-brown truncate">{conversation.vendorName}</h4>
                            <span className="text-xs text-theme-brown-light">{conversation.lastMessageTime}</span>
                          </div>
                          <p className="text-sm text-theme-brown-light mb-1">{conversation.vendorType}</p>
                          <p className="text-sm text-theme-brown-light truncate">{conversation.lastMessage}</p>
                        </div>
                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Window */}
            <div className="lg:col-span-2">
              {selectedChat ? (
                <Card className="bg-white border-theme-cream shadow-sm h-full flex flex-col">
                  {/* Chat Header */}
                  <CardHeader className="border-b border-theme-cream/50 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-theme-brown text-white">
                              {selectedChat.avatar}
                            </AvatarFallback>
                          </Avatar>
                          {selectedChat.isOnline && (
                            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-theme-brown">{selectedChat.vendorName}</h3>
                          <p className="text-sm text-theme-brown-light">
                            {selectedChat.isOnline ? 'Online' : 'Offline'} • {selectedChat.vendorType}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                      {selectedChat.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                              message.sender === 'user'
                                ? 'bg-theme-brown text-white'
                                : 'bg-theme-cream/50 text-theme-brown'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-white/70' : 'text-theme-brown-light'
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  {/* Message Input */}
                  <div className="border-t border-theme-cream/50 p-4">
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Input
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1"
                      />
                      <Button 
                        onClick={sendMessage}
                        disabled={!messageText.trim()}
                        className="bg-theme-brown text-white hover:bg-theme-brown-dark"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="bg-white border-theme-cream shadow-sm h-full flex items-center justify-center">
                  <div className="text-center text-theme-brown-light">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a conversation to start messaging</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
