import Header from "@/components/header";
import Hero from "@/components/hero";
import TermOfWeek from "@/components/term-of-week";
import EducationalSections from "@/components/educational-sections";
import LatestPosts from "@/components/latest-posts";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TermOfWeek />
        <EducationalSections />
        <LatestPosts />
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}
