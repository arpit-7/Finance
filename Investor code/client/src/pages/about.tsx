import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Target, Book, TrendingUp } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About The Investor's Notebook</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A beginner's journey through the world of finance and equity analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Finance education and learning materials" 
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">My Journey</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Welcome to The Investor's Notebook! I'm a finance enthusiast on a mission to demystify 
              the complex world of investing and equity analysis. As someone who started with little 
              knowledge of financial markets, I understand the challenges beginners face.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Through my participation in an equity cohort program, I'm learning the fundamentals 
              of financial analysis, valuation techniques, and market dynamics. This blog serves 
              as my learning journal, where I break down complex financial concepts into digestible, 
              practical insights.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every post, explanation, and analysis shared here reflects my real learning experience. 
              Join me as we explore the fascinating world of finance together, one concept at a time.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <User className="h-6 w-6 text-blue-600" />
                Who I Am
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                A passionate learner exploring finance through structured education and hands-on analysis.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="h-6 w-6 text-green-600" />
                Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                To make financial concepts accessible and understandable for fellow beginners and aspiring investors.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Book className="h-6 w-6 text-purple-600" />
                What I Share
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Finance term explanations, market analysis insights, learning experiences, and beginner-friendly guides.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-orange-600" />
                Focus Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Equity analysis, valuation metrics, market fundamentals, and practical investment insights.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Learning Philosophy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-600">Learning by Doing</h4>
                <p className="text-gray-600 text-sm">
                  I believe in hands-on learning through real market analysis and practical application 
                  of financial concepts.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-green-600">Simplicity First</h4>
                <p className="text-gray-600 text-sm">
                  Complex financial jargon broken down into simple, understandable explanations 
                  that anyone can grasp.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-purple-600">Continuous Growth</h4>
                <p className="text-gray-600 text-sm">
                  Every mistake is a learning opportunity, and every analysis is a step toward 
                  better understanding.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Let's Learn Together</h3>
              <p className="text-gray-600 mb-6">
                Whether you're a complete beginner or someone looking to refresh your knowledge, 
                this space is designed for learners at all levels. Feel free to reach out with 
                questions, suggestions, or just to share your own learning journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:hello@investorsnotebook.com" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Get in Touch
                </a>
                <a 
                  href="#newsletter" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Subscribe to Updates
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
