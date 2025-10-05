import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, Users, ClipboardList, TrendingUp } from "lucide-react";

interface Profile {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

interface AssessmentResult {
  id: string;
  user_id: string;
  overall_risk_level: string;
  created_at: string;
  profiles: Profile;
}

interface Stats {
  totalUsers: number;
  totalAssessments: number;
  lowRisk: number;
  moderateRisk: number;
  highRisk: number;
}

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalAssessments: 0,
    lowRisk: 0,
    moderateRisk: 0,
    highRisk: 0,
  });
  const [assessments, setAssessments] = useState<AssessmentResult[]>([]);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      // Check if user has admin role
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();

      if (rolesError || !roles) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      await fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*");

      if (profilesError) throw profilesError;

      // Fetch all assessments
      const { data: assessmentsData, error: assessmentsError } = await supabase
        .from("assessment_results")
        .select("*")
        .order("created_at", { ascending: false });

      if (assessmentsError) throw assessmentsError;

      // Join profiles data manually
      const enrichedAssessments = assessmentsData?.map(assessment => {
        const profile = profiles?.find(p => p.id === assessment.user_id);
        return {
          ...assessment,
          profiles: profile || {
            id: assessment.user_id,
            email: "Unknown",
            full_name: "Unknown User",
            created_at: assessment.created_at,
          }
        };
      }) || [];

      // Calculate statistics
      const lowRisk = assessmentsData?.filter(a => a.overall_risk_level === "low").length || 0;
      const moderateRisk = assessmentsData?.filter(a => a.overall_risk_level === "moderate").length || 0;
      const highRisk = assessmentsData?.filter(a => a.overall_risk_level === "high").length || 0;

      setStats({
        totalUsers: profiles?.length || 0,
        totalAssessments: assessmentsData?.length || 0,
        lowRisk,
        moderateRisk,
        highRisk,
      });

      setAssessments(enrichedAssessments);
    } catch (error: any) {
      toast({
        title: "Error fetching data",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "low":
        return "default";
      case "moderate":
        return "secondary";
      case "high":
        return "destructive";
      default:
        return "outline";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-lg text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-primary">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">Monitor users and assessment results</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 animate-slide-up">
          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-primary" />
                Assessments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalAssessments}</div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-success" />
                Low Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{stats.lowRisk}</div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-warning" />
                Moderate Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">{stats.moderateRisk}</div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-destructive" />
                High Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">{stats.highRisk}</div>
            </CardContent>
          </Card>
        </div>

        {/* Assessments Table */}
        <Card className="card-elevated animate-slide-up">
          <CardHeader>
            <CardTitle>Recent Assessments</CardTitle>
            <CardDescription>View all user assessment results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assessments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No assessments yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    assessments.map((assessment) => (
                      <TableRow key={assessment.id}>
                        <TableCell className="font-medium">
                          {assessment.profiles.full_name || "Unknown"}
                        </TableCell>
                        <TableCell>{assessment.profiles.email}</TableCell>
                        <TableCell>
                          <Badge variant={getRiskBadgeVariant(assessment.overall_risk_level)}>
                            {assessment.overall_risk_level}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(assessment.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}