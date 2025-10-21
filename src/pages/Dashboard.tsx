import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, DollarSign, CheckCircle2, TrendingUp, Lightbulb, ArrowRight, Layers } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import blueprintBg from "@/assets/blueprint-bg.jpg";

export default function Dashboard() {
  const [recentGrants, setRecentGrants] = useState<any[]>([]);
  const [recentLoans, setRecentLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const stats = [
    { 
      title: "ACTIVE GRANTS", 
      value: "6", 
      subtitle: "Available now",
      icon: Award,
      color: "text-primary"
    },
    { 
      title: "LOAN PROGRAMS", 
      value: "6", 
      subtitle: "Ready to apply",
      icon: DollarSign,
      color: "text-primary"
    },
    { 
      title: "SAVED ITEMS", 
      value: "0", 
      subtitle: "Tracking",
      icon: CheckCircle2,
      color: "text-primary"
    },
    { 
      title: "NEW THIS WEEK", 
      value: "0", 
      subtitle: "Fresh opportunities",
      icon: TrendingUp,
      color: "text-primary"
    },
  ];

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
      // Fetch recent grants
      const { data: grantsData } = await supabase
        .from("programs")
        .select("*")
        .eq("type", "GRANT")
        .order("created_at", { ascending: false })
        .limit(2);

      // Fetch recent loans
      const { data: loansData } = await supabase
        .from("programs")
        .select("*")
        .eq("type", "LOAN")
        .order("created_at", { ascending: false })
        .limit(2);

      setRecentGrants(grantsData || []);
      setRecentLoans(loansData || []);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <p className="text-center text-muted-foreground">Loading dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="relative min-h-full">
        {/* Blueprint Background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${blueprintBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        <div className="relative z-10">
          <div className="p-8 space-y-8">
              {/* Hero Section */}
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6">
                  <Layers className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">
                    Arizona Business Platform
                  </span>
                </div>
                
                <h1 className="text-5xl font-bold mb-4">
                  Your Blueprint for Success
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                  Discover grants, secure loans, and navigate Arizona's business landscape with precision.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link to="/grants">
                      Explore Grants
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/idea-lab">
                      <Lightbulb className="mr-2 w-4 h-4" />
                      Generate Ideas
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <Card key={stat.title} className="bg-card/60 backdrop-blur-sm border-border/50">
                    <CardHeader className="space-y-4">
                      <div className="w-12 h-12 rounded-lg border border-border/50 bg-background/50 flex items-center justify-center">
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {stat.title}
                        </p>
                        <p className="text-4xl font-bold">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              {/* Recent Sections */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Grants */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg border border-border/50 bg-background/50 flex items-center justify-center">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold">RECENT GRANTS</h2>
                    </div>
                    <Link to="/grants" className="text-primary hover:underline text-sm font-medium">
                      View All
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {recentGrants.length === 0 ? (
                      <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                        <CardHeader>
                          <p className="text-muted-foreground">No grants available</p>
                        </CardHeader>
                      </Card>
                    ) : (
                      recentGrants.map((grant) => (
                        <Card 
                          key={grant.id} 
                          className="bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
                          onClick={() => navigate(`/program/${grant.id}`)}
                        >
                          <CardHeader>
                            <CardTitle className="text-lg">{grant.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{grant.sponsor}</p>
                          </CardHeader>
                        </Card>
                      ))
                    )}
                  </div>
                </div>

                {/* Recent Loans */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg border border-border/50 bg-background/50 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold">RECENT LOANS</h2>
                    </div>
                    <Link to="/loans" className="text-primary hover:underline text-sm font-medium">
                      View All
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {recentLoans.length === 0 ? (
                      <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                        <CardHeader>
                          <p className="text-muted-foreground">No loans available</p>
                        </CardHeader>
                      </Card>
                    ) : (
                      recentLoans.map((loan) => (
                        <Card 
                          key={loan.id}
                          className="bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
                          onClick={() => navigate(`/program/${loan.id}`)}
                        >
                          <CardHeader>
                            <CardTitle className="text-lg">{loan.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{loan.sponsor}</p>
                          </CardHeader>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
