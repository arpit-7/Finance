import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Calculator, TrendingUp, Users } from "lucide-react";

export default function Resources() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Essential tools, guides, and references for your financial learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Book className="h-6 w-6 text-blue-600" />
                Finance Glossary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Comprehensive collection of finance terms and definitions explained in simple language.
              </p>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">150+ Terms:</span> From basic to advanced concepts
                </div>
                <div className="text-sm">
                  <span className="font-medium">Categories:</span> Valuation, Risk, Trading, Analysis
                </div>
                <div className="text-sm">
                  <span className="font-medium">Examples:</span> Real-world applications included
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Calculator className="h-6 w-6 text-green-600" />
                Financial Calculators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Essential calculators for investment analysis and financial planning.
              </p>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">P/E Calculator:</span> Price-to-Earnings ratio
                </div>
                <div className="text-sm">
                  <span className="font-medium">SIP Calculator:</span> Systematic Investment Plan
                </div>
                <div className="text-sm">
                  <span className="font-medium">Compound Interest:</span> Growth projections
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
                Market Analysis Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Tools and frameworks for analyzing market trends and company performance.
              </p>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Chart Patterns:</span> Technical analysis guide
                </div>
                <div className="text-sm">
                  <span className="font-medium">Ratio Analysis:</span> Company evaluation metrics
                </div>
                <div className="text-sm">
                  <span className="font-medium">Sector Analysis:</span> Industry comparison tools
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="h-6 w-6 text-orange-600" />
                Learning Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Connect with fellow learners and access educational content.
              </p>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Discussion Forums:</span> Ask questions and share insights
                </div>
                <div className="text-sm">
                  <span className="font-medium">Study Groups:</span> Collaborative learning sessions
                </div>
                <div className="text-sm">
                  <span className="font-medium">Expert Sessions:</span> Live learning opportunities
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Reading</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">For Beginners</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• "The Intelligent Investor" by Benjamin Graham</li>
                    <li>• "One Up On Wall Street" by Peter Lynch</li>
                    <li>• "The Little Book of Common Sense Investing" by John Bogle</li>
                    <li>• "Coffee Can Investing" by Saurabh Mukherjea</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Advanced Learning</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• "Security Analysis" by Benjamin Graham</li>
                    <li>• "The Essays of Warren Buffett" by Warren Buffett</li>
                    <li>• "Valuation" by McKinsey & Company</li>
                    <li>• "The Outsiders" by William Thorndike</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
