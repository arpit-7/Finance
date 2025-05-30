import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">The definitive collection</h2>
          <h1 className="text-2xl font-light mb-6">Finance education for beginners</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Demystifying finance terms and jargon through my equity cohort journey. 
            Learn alongside me as I analyze markets and break down complex financial concepts.
          </p>
          
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold">Weekly</div>
                <div className="text-sm opacity-80">New educational content from my learning journey</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => scrollToSection("latest-posts")}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold"
            >
              Start Learning
            </Button>
            <Button 
              onClick={() => scrollToSection("term-of-week")}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold"
            >
              View Latest Insights
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
