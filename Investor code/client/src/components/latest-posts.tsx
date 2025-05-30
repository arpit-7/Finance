import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import type { Post } from "@shared/schema";

export default function LatestPosts() {
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  if (isLoading) {
    return (
      <section id="latest-posts" className="mb-16">
        <div className="flex items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mr-4">Latest Posts</h2>
          <div className="h-1 bg-blue-600 flex-1 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-xl"></div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-16 bg-gray-200 rounded"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="latest-posts" className="mb-16">
        <div className="flex items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mr-4">Latest Posts</h2>
          <div className="h-1 bg-blue-600 flex-1 rounded"></div>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">Failed to load posts. Please try again later.</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "finance terms":
        return "bg-blue-600";
      case "market analysis":
        return "bg-green-500";
      case "learning journey":
        return "bg-purple-500";
      default:
        return "bg-gray-600";
    }
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  return (
    <section id="latest-posts">
      <div className="flex items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mr-4">Latest Posts</h2>
        <div className="h-1 bg-blue-600 flex-1 rounded"></div>
      </div>

      {posts && posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 6).map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                {post.imageUrl && (
                  <img 
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                )}
                <CardContent className="p-6">
                  <Badge className={`${getCategoryColor(post.category)} text-white mb-3`}>
                    {post.category}
                  </Badge>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.createdAt!)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3">
              View All Posts
            </Button>
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-semibold mb-4">No Posts Yet</h3>
            <p className="text-gray-600">
              Posts will appear here as content is added to the blog.
            </p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
