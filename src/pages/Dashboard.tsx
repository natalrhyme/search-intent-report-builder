
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MetricCard from "@/components/dashboard/MetricCard";
import { mockQueries } from "@/utils/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('gsc_auth_status');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  // Calculate mock metrics for the dashboard
  const totalClicks = mockQueries.reduce((sum, query) => sum + query.clicks, 0);
  const totalImpressions = mockQueries.reduce((sum, query) => sum + query.impressions, 0);
  const avgCTR = totalImpressions > 0 
    ? (totalClicks / totalImpressions) * 100 
    : 0;
  const avgPosition = mockQueries.reduce((sum, query) => sum + query.position, 0) / mockQueries.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 container mx-auto px-4 md:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Search Intent Report Builder
          </h1>
          <p className="text-lg text-muted-foreground">
            Create custom reports with GSC data and Gemini intent analysis
          </p>
        </div>

        {isAuthenticated && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard 
                title="Total Clicks" 
                value={totalClicks.toLocaleString()} 
                description="Last 28 days"
                trend={{ value: 5.2, isPositive: true }}
              />
              <MetricCard 
                title="Impressions" 
                value={totalImpressions.toLocaleString()} 
                description="Last 28 days"
                trend={{ value: 3.8, isPositive: true }}
              />
              <MetricCard 
                title="Average CTR" 
                value={`${avgCTR.toFixed(2)}%`} 
                description="Last 28 days"
                trend={{ value: 0.5, isPositive: true }}
              />
              <MetricCard 
                title="Average Position" 
                value={avgPosition.toFixed(1)} 
                description="Last 28 days"
                trend={{ value: 0.3, isPositive: false }}
              />
            </div>
          </div>
        )}

        <Tabs defaultValue="get-started" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="get-started">Get Started</TabsTrigger>
            <TabsTrigger value="build-report">Build Report</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="get-started">
            <Card>
              <CardHeader>
                <CardTitle>Connect to Google Search Console</CardTitle>
                <CardDescription>
                  The first step is to connect your Google Search Console account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Connecting to Google Search Console will give you access to your search data for analysis.
                  This allows the report builder to fetch real data from your properties.
                </p>
                {isAuthenticated ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-center text-green-600 font-medium p-2 bg-green-50 rounded-md w-full">
                      ✓ Successfully connected to Google Search Console
                    </div>
                    <Button 
                      onClick={() => navigate('/builder')}
                      className="w-full md:w-auto"
                    >
                      Continue to Report Builder
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => navigate('/auth')}
                    className="w-full md:w-auto"
                    size="lg"
                  >
                    Connect GSC Account
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="build-report">
            <Card>
              <CardHeader>
                <CardTitle>Create Custom Reports</CardTitle>
                <CardDescription>
                  Use the drag-and-drop interface to build reports with metrics and intent analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  The report builder allows you to select specific metrics like Clicks, Impressions, CTR, and Position
                  across different time periods. Additionally, you can leverage the Gemini API to analyze search intent
                  for your queries.
                </p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/40 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Report Features</h3>
                    <ul className="space-y-1 text-sm list-disc pl-4">
                      <li>Select GSC properties and time ranges</li>
                      <li>Drag-and-drop interface for metric selection</li>
                      <li>AI-powered search intent analysis</li>
                      <li>Export reports to CSV or Google Sheets</li>
                      <li>Customizable report layout</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/40 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Search Intent Analysis</h3>
                    <ul className="space-y-1 text-sm list-disc pl-4">
                      <li>Understand user search intent behind queries</li>
                      <li>Categorize content types based on query analysis</li>
                      <li>Identify informational vs. transactional queries</li>
                      <li>Generate content ideas based on user intent</li>
                      <li>Optimize content strategy with data insights</li>
                    </ul>
                  </div>
                </div>
                
                <Button 
                  onClick={() => navigate('/builder')}
                  className="w-full md:w-auto"
                  disabled={!isAuthenticated}
                >
                  Create New Report
                </Button>
                
                {!isAuthenticated && (
                  <p className="text-xs text-muted-foreground">
                    Please connect to GSC first to enable report building
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="docs">
            <Card>
              <CardHeader>
                <CardTitle>Documentation & Resources</CardTitle>
                <CardDescription>
                  Learn how to use the report builder effectively and interpret results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Our comprehensive documentation will help you get the most out of the Search Intent Report Builder.
                  Find guides, tutorials, and best practices for analyzing your search data.
                </p>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Getting Started</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground">
                        Basic tutorials for new users covering authentication, interface navigation, and creating your first report.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">View Guide</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Advanced Reporting</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground">
                        Learn advanced reporting techniques, data interpretation, and how to extract valuable insights.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">View Guide</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Intent Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground">
                        Detailed explanation of the Gemini intent analysis system and how to use it for content strategy.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">View Guide</Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
