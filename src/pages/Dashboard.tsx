import { Navbar } from "@/components/Navbar";
import { ProgramCard } from "@/components/ProgramCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Heart, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [reminders, setReminders] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error("Please sign in to view your dashboard");
      navigate("/auth");
      return;
    }
    fetchDashboardData(session.user.id);
  };

  const fetchDashboardData = async (userId: string) => {
    setLoading(true);
    try {
      // Fetch favorites with program details
      const { data: favData } = await supabase
        .from("favorites")
        .select("*, programs(*)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      // Fetch reminders with program details
      const { data: remData } = await supabase
        .from("reminders")
        .select("*, programs(*)")
        .eq("user_id", userId)
        .gte("remind_at", new Date().toISOString())
        .order("remind_at", { ascending: true });

      // Fetch applications with program details
      const { data: appData } = await supabase
        .from("applications")
        .select("*, programs(*)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      setFavorites(favData || []);
      setReminders(remData || []);
      setApplications(appData || []);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const favoriteIds = new Set(favorites.map(f => f.program_id));

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Track your saved programs and upcoming deadlines
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Programs</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{favorites.length}</div>
              <p className="text-xs text-muted-foreground">Programs you're tracking</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reminders.length}</div>
              <p className="text-xs text-muted-foreground">Reminders set</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.length}</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="saved" className="space-y-6">
          <TabsList>
            <TabsTrigger value="saved">Saved Programs</TabsTrigger>
            <TabsTrigger value="deadlines">Upcoming Deadlines</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="saved" className="space-y-4">
            {favorites.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>No saved programs yet</CardTitle>
                  <CardDescription>
                    Start browsing grants and loans to save programs you're interested in
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {favorites.map((fav) => (
                  <ProgramCard
                    key={fav.id}
                    program={fav.programs}
                    isFavorite={true}
                    onFavoriteToggle={() => {
                      const session = supabase.auth.getSession();
                      session.then(({ data }) => {
                        if (data.session) fetchDashboardData(data.session.user.id);
                      });
                    }}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="deadlines" className="space-y-4">
            {reminders.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>No upcoming deadlines</CardTitle>
                  <CardDescription>
                    Set reminders for programs to track their application deadlines
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="space-y-4">
                {reminders.map((reminder) => (
                  <Card key={reminder.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{reminder.programs.name}</CardTitle>
                          <CardDescription>{reminder.programs.sponsor}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-primary">
                            {new Date(reminder.remind_at).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-muted-foreground">Reminder</div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            {applications.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>No applications tracked</CardTitle>
                  <CardDescription>
                    Track your grant and loan applications here
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <Card key={app.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{app.programs.name}</CardTitle>
                          <CardDescription>{app.programs.sponsor}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium capitalize">{app.status}</div>
                          <div className="text-xs text-muted-foreground">
                            {app.submitted_at ? `Submitted ${new Date(app.submitted_at).toLocaleDateString()}` : "Draft"}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
