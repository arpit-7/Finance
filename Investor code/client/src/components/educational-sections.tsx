import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, BarChart3, Star } from "lucide-react";

export default function EducationalSections() {
  return (
    <div className="space-y-8 mb-16">
      {/* First Row - Market Myth Busters and Beginner's Corner */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Market Myth Busters */}
        <Card className="bg-orange-50 border-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="bg-orange-500 text-white p-2 rounded-lg">
                <AlertTriangle className="h-5 w-5" />
              </div>
              Market Myth Busters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Separating facts from fiction in common investment beliefs</p>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border-l-4 border-orange-500">
                <h4 className="font-medium text-gray-900">"Buy low, sell high" is easy</h4>
                <p className="text-sm text-gray-600">Reality check: Timing the market consistently is nearly impossible</p>
              </div>
              <div className="bg-white p-3 rounded border-l-4 border-orange-500">
                <h4 className="font-medium text-gray-900">"Penny stocks are great for beginners"</h4>
                <p className="text-sm text-gray-600">Why this can be a dangerous misconception</p>
              </div>
            </div>
            <Button variant="link" className="mt-4 text-orange-600 hover:text-orange-700 p-0">
              View All Myths →
            </Button>
          </CardContent>
        </Card>

        {/* Beginner's Corner */}
        <Card className="bg-green-50 border-green-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="bg-green-500 text-white p-2 rounded-lg">
                <CheckCircle className="h-5 w-5" />
              </div>
              Beginner's Corner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Finance fundamentals explained in plain English</p>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border-l-4 border-green-500">
                <h4 className="font-medium text-gray-900">What is a Stock?</h4>
                <p className="text-sm text-gray-600">A simple explanation of ownership shares in companies</p>
              </div>
              <div className="bg-white p-3 rounded border-l-4 border-green-500">
                <h4 className="font-medium text-gray-900">Understanding Dividends</h4>
                <p className="text-sm text-gray-600">How companies share profits with shareholders</p>
              </div>
            </div>
            <Button variant="link" className="mt-4 text-green-600 hover:text-green-700 p-0">
              Start Learning →
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Second Row - Chart Analysis and Investment Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Analysis Corner */}
        <Card className="bg-gray-50 border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="bg-gray-700 text-white p-2 rounded-lg">
                <BarChart3 className="h-5 w-5" />
              </div>
              Chart Analysis Corner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <img 
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
                alt="Financial market charts and technical analysis displays" 
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>
            <p className="text-gray-600 mb-4">Learning to read patterns and trends in market data</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Support & Resistance</span>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">New</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Moving Averages</span>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">Updated</span>
              </div>
            </div>
            <Button variant="link" className="mt-4 text-gray-700 hover:text-gray-900 p-0">
              View Analysis →
            </Button>
          </CardContent>
        </Card>

        {/* Investment Spotlight */}
        <Card className="bg-purple-50 border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="bg-purple-500 text-white p-2 rounded-lg">
                <Star className="h-5 w-5" />
              </div>
              Investment Spotlight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
                alt="Stack of finance and investment education books" 
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>
            <p className="text-gray-600 mb-4">Featured companies and investment opportunities I'm studying</p>
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Company Spotlight: TCS</h4>
                <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">IT Sector</span>
              </div>
              <p className="text-sm text-gray-600">Analyzing India's largest IT services company and its growth potential</p>
            </div>
            <Button variant="link" className="mt-4 text-purple-600 hover:text-purple-700 p-0">
              Read Analysis →
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
