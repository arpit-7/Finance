import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react";
import type { Post, FinanceTerm } from "@shared/schema";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("posts");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Post form state
  const [postForm, setPostForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    readTime: 5,
    imageUrl: ""
  });

  // Finance term form state
  const [termForm, setTermForm] = useState({
    term: "",
    definition: "",
    formula: "",
    example: "",
    category: "",
    featured: false
  });

  // Fetch existing content
  const { data: posts, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const { data: terms, isLoading: termsLoading } = useQuery<FinanceTerm[]>({
    queryKey: ["/api/finance-terms"],
  });

  // Mutations
  const createPostMutation = useMutation({
    mutationFn: async (post: typeof postForm) => {
      return apiRequest("POST", "/api/posts", post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      setPostForm({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        readTime: 5,
        imageUrl: ""
      });
      toast({
        title: "Success!",
        description: "Blog post created successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create blog post.",
        variant: "destructive",
      });
    },
  });

  const createTermMutation = useMutation({
    mutationFn: async (term: typeof termForm) => {
      return apiRequest("POST", "/api/finance-terms", term);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/finance-terms"] });
      setTermForm({
        term: "",
        definition: "",
        formula: "",
        example: "",
        category: "",
        featured: false
      });
      toast({
        title: "Success!",
        description: "Finance term created successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create finance term.",
        variant: "destructive",
      });
    },
  });

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postForm.title && postForm.excerpt && postForm.content && postForm.category) {
      createPostMutation.mutate(postForm);
    }
  };

  const handleTermSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (termForm.term && termForm.definition && termForm.category) {
      createTermMutation.mutate(termForm);
    }
  };

  const categories = [
    "Market Insights",
    "Finance Terms",
    "Learning Journey", 
    "Beginner Guides",
    "Market Analysis",
    "Stock Analysis"
  ];

  const termCategories = [
    "Valuation Metrics",
    "Risk Management",
    "Trading Terms",
    "Financial Statements",
    "Market Fundamentals",
    "Investment Types"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage your finance blog content and educational resources
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Blog Posts</TabsTrigger>
            <TabsTrigger value="terms">Finance Terms</TabsTrigger>
            <TabsTrigger value="manage">Manage Content</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusCircle className="h-5 w-5" />
                  Create New Blog Post
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePostSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <Input
                        placeholder="Enter post title"
                        value={postForm.title}
                        onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <Select value={postForm.category} onValueChange={(value) => setPostForm({...postForm, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Excerpt</label>
                    <Textarea
                      placeholder="Brief description of the post"
                      value={postForm.excerpt}
                      onChange={(e) => setPostForm({...postForm, excerpt: e.target.value})}
                      rows={2}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <Textarea
                      placeholder="Write your blog post content here..."
                      value={postForm.content}
                      onChange={(e) => setPostForm({...postForm, content: e.target.value})}
                      rows={10}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Read Time (minutes)</label>
                      <Input
                        type="number"
                        min="1"
                        value={postForm.readTime}
                        onChange={(e) => setPostForm({...postForm, readTime: parseInt(e.target.value)})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        value={postForm.imageUrl}
                        onChange={(e) => setPostForm({...postForm, imageUrl: e.target.value})}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={createPostMutation.isPending}
                  >
                    {createPostMutation.isPending ? "Creating..." : "Create Blog Post"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusCircle className="h-5 w-5" />
                  Create New Finance Term
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTermSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Term</label>
                      <Input
                        placeholder="e.g., P/E Ratio"
                        value={termForm.term}
                        onChange={(e) => setTermForm({...termForm, term: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <Select value={termForm.category} onValueChange={(value) => setTermForm({...termForm, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {termCategories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Definition</label>
                    <Textarea
                      placeholder="Explain the term in simple language"
                      value={termForm.definition}
                      onChange={(e) => setTermForm({...termForm, definition: e.target.value})}
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Formula (optional)</label>
                    <Input
                      placeholder="e.g., P/E = Market Price per Share ÷ Earnings per Share"
                      value={termForm.formula}
                      onChange={(e) => setTermForm({...termForm, formula: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Example (optional)</label>
                    <Textarea
                      placeholder="Provide a practical example"
                      value={termForm.example}
                      onChange={(e) => setTermForm({...termForm, example: e.target.value})}
                      rows={2}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={termForm.featured}
                      onChange={(e) => setTermForm({...termForm, featured: e.target.checked})}
                      className="rounded"
                    />
                    <label htmlFor="featured" className="text-sm font-medium">
                      Feature this term (appears as Term of the Week)
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={createTermMutation.isPending}
                  >
                    {createTermMutation.isPending ? "Creating..." : "Create Finance Term"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Existing Posts */}
              <Card>
                <CardHeader>
                  <CardTitle>Existing Blog Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  {postsLoading ? (
                    <div className="text-center py-8">Loading posts...</div>
                  ) : posts && posts.length > 0 ? (
                    <div className="space-y-4">
                      {posts.slice(0, 5).map((post) => (
                        <div key={post.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium line-clamp-1">{post.title}</h4>
                              <p className="text-sm text-gray-600 line-clamp-2 mt-1">{post.excerpt}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary">{post.category}</Badge>
                                <span className="text-xs text-gray-500">{post.readTime} min read</span>
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">No posts yet</div>
                  )}
                </CardContent>
              </Card>

              {/* Existing Terms */}
              <Card>
                <CardHeader>
                  <CardTitle>Existing Finance Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  {termsLoading ? (
                    <div className="text-center py-8">Loading terms...</div>
                  ) : terms && terms.length > 0 ? (
                    <div className="space-y-4">
                      {terms.slice(0, 5).map((term) => (
                        <div key={term.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium">{term.term}</h4>
                              <p className="text-sm text-gray-600 line-clamp-2 mt-1">{term.definition}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary">{term.category}</Badge>
                                {term.featured && <Badge>Featured</Badge>}
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">No terms yet</div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}