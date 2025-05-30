import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter/subscribe", { email });
    },
    onSuccess: () => {
      setEmail("");
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for joining our newsletter. You'll receive weekly insights and updates.",
      });
    },
    onError: (error: any) => {
      const message = error.message.includes("409") 
        ? "This email is already subscribed to our newsletter."
        : "Failed to subscribe. Please try again.";
      
      toast({
        title: "Subscription failed",
        description: message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      subscribeMutation.mutate(email);
    }
  };

  return (
    <section id="newsletter" className="bg-blue-600 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl font-bold mb-4">Stay Updated with Market Insights</h3>
        <p className="text-xl mb-8 opacity-90">
          Get weekly finance term explanations and market analysis straight to your inbox
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={subscribeMutation.isPending}
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white"
          />
          <Button
            type="submit"
            disabled={subscribeMutation.isPending}
            className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 font-medium"
          >
            {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        
        <p className="text-sm mt-4 opacity-75">
          Join 500+ fellow learners on their finance journey
        </p>
      </div>
    </section>
  );
}
