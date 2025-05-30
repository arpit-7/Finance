import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import type { FinanceTerm } from "@shared/schema";

export default function TermOfWeek() {
  const { data: featuredTerm, isLoading, error } = useQuery<FinanceTerm>({
    queryKey: ["/api/finance-terms/featured"],
  });

  if (isLoading) {
    return (
      <section id="term-of-week" className="mb-16">
        <div className="flex items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mr-4">Term of the Week</h2>
          <div className="h-1 bg-blue-600 flex-1 rounded"></div>
        </div>
        <Card className="animate-pulse">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-32"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="h-64 bg-gray-200 rounded-lg"></div>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (error) {
    return (
      <section id="term-of-week" className="mb-16">
        <div className="flex items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mr-4">Term of the Week</h2>
          <div className="h-1 bg-blue-600 flex-1 rounded"></div>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">Failed to load featured term. Please try again later.</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (!featuredTerm) {
    return (
      <section id="term-of-week" className="mb-16">
        <div className="flex items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mr-4">Term of the Week</h2>
          <div className="h-1 bg-blue-600 flex-1 rounded"></div>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">No featured term available at the moment.</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="term-of-week" className="mb-16">
      <div className="flex items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mr-4">Term of the Week</h2>
        <div className="h-1 bg-blue-600 flex-1 rounded"></div>
      </div>
      
      <Card className="bg-blue-50 border-blue-100">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="bg-blue-600 text-white mb-4">
                {featuredTerm.category}
              </Badge>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredTerm.term}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {featuredTerm.definition}
              </p>
              {featuredTerm.formula && (
                <div className="bg-white p-4 rounded-lg border border-blue-200 mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">Formula:</p>
                  <p className="font-mono text-gray-900">{featuredTerm.formula}</p>
                </div>
              )}
              {featuredTerm.example && (
                <div className="bg-white p-4 rounded-lg border border-blue-200 mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">Example:</p>
                  <p className="text-gray-900">{featuredTerm.example}</p>
                </div>
              )}
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                <Star className="h-4 w-4 mr-2" />
                Learn More
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Financial analysis workspace with charts and documents" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
