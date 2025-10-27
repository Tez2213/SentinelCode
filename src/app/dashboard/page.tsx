"use client"

import { MatrixBackground } from "@/components/matrix-bg"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Shield, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  GitCommit,
  User,
  Menu,
  Bell,
  Eye
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

const trendData = [
  { date: "Mon", critical: 8, high: 12, medium: 20, low: 15 },
  { date: "Tue", critical: 6, high: 10, medium: 18, low: 12 },
  { date: "Wed", critical: 5, high: 8, medium: 15, low: 10 },
  { date: "Thu", critical: 3, high: 6, medium: 12, low: 8 },
  { date: "Fri", critical: 2, high: 4, medium: 10, low: 6 },
  { date: "Sat", critical: 1, high: 3, medium: 8, low: 5 },
  { date: "Sun", critical: 1, high: 2, medium: 6, low: 4 },
]

const severityData = [
  { name: "Critical", value: 8, color: "#ef4444" },
  { name: "High", value: 15, color: "#f59e0b" },
  { name: "Medium", value: 23, color: "#eab308" },
  { name: "Low", value: 31, color: "#10b981" },
]

const recentReviews = [
  { id: 1, commit: "api/auth.py", author: "@tejasvi", issues: 3, status: "pending", severity: "high" },
  { id: 2, commit: "frontend/home.tsx", author: "@aditya", issues: 1, status: "reviewed", severity: "low" },
  { id: 3, commit: "backend/database.py", author: "@priya", issues: 5, status: "pending", severity: "critical" },
  { id: 4, commit: "utils/helper.js", author: "@rahul", issues: 2, status: "reviewed", severity: "medium" },
  { id: 5, commit: "config/settings.yml", author: "@sneha", issues: 0, status: "reviewed", severity: "low" },
]

const topContributors = [
  { name: "@tejasvi", score: 98, issues: 12, fixed: 10 },
  { name: "@aditya", score: 95, issues: 8, fixed: 8 },
  { name: "@priya", score: 92, issues: 15, fixed: 12 },
  { name: "@rahul", score: 88, issues: 20, fixed: 15 },
]

const qualityScore = 87

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <MatrixBackground />
      
      <div className="relative z-10 flex">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1">
          {/* Top Bar */}
          <header className="border-b border-emerald-500/20 bg-black/80 backdrop-blur-sm">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold font-mono text-emerald-400">Dashboard</h1>
                  <p className="text-xs text-zinc-400 font-mono">Project Overview</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                  <User className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* Metrics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between mb-2">
                      <Shield className="w-8 h-8 text-emerald-400" />
                      <div className="text-right">
                        <div className="text-3xl font-bold font-mono text-emerald-400">{qualityScore}</div>
                        <div className="text-xs text-zinc-400 font-mono">/ 100</div>
                      </div>
                    </div>
                    <div className="text-sm font-mono text-zinc-400">Code Quality Score</div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-emerald-400 font-mono">
                      <TrendingUp className="w-3 h-3" />
                      <span>+5% this week</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between mb-2">
                      <AlertTriangle className="w-8 h-8 text-red-400" />
                      <div className="text-right">
                        <div className="text-3xl font-bold font-mono text-red-400">77</div>
                        <div className="text-xs text-zinc-400 font-mono">issues</div>
                      </div>
                    </div>
                    <div className="text-sm font-mono text-zinc-400">Security Issues</div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-emerald-400 font-mono">
                      <TrendingUp className="w-3 h-3 rotate-180" />
                      <span>-12% this week</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between mb-2">
                      <Clock className="w-8 h-8 text-blue-400" />
                      <div className="text-right">
                        <div className="text-3xl font-bold font-mono text-blue-400">62%</div>
                        <div className="text-xs text-zinc-400 font-mono">faster</div>
                      </div>
                    </div>
                    <div className="text-sm font-mono text-zinc-400">Review Time Saved</div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-blue-400 font-mono">
                      <Clock className="w-3 h-3" />
                      <span>Avg: 12 min</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle2 className="w-8 h-8 text-purple-400" />
                      <div className="text-right">
                        <div className="text-3xl font-bold font-mono text-purple-400">94%</div>
                        <div className="text-xs text-zinc-400 font-mono">accuracy</div>
                      </div>
                    </div>
                    <div className="text-sm font-mono text-zinc-400">AI Accuracy</div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-purple-400 font-mono">
                      <TrendingUp className="w-3 h-3" />
                      <span>+2% this week</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Trend Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="font-mono text-lg">Issues Over Time</CardTitle>
                  <CardDescription className="font-mono">Weekly trend analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="critical" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="high" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="medium" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                      <XAxis dataKey="date" stroke="#71717a" style={{ fontSize: '12px', fontFamily: 'monospace' }} />
                      <YAxis stroke="#71717a" style={{ fontSize: '12px', fontFamily: 'monospace' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#000', 
                          border: '1px solid #10b981',
                          borderRadius: '8px',
                          fontFamily: 'monospace'
                        }} 
                      />
                      <Area type="monotone" dataKey="critical" stroke="#ef4444" fill="url(#critical)" />
                      <Area type="monotone" dataKey="high" stroke="#f59e0b" fill="url(#high)" />
                      <Area type="monotone" dataKey="medium" stroke="#eab308" fill="url(#medium)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Severity Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono text-lg">Severity Distribution</CardTitle>
                  <CardDescription className="font-mono">Current status</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={severityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {severityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#000', 
                          border: '1px solid #10b981',
                          borderRadius: '8px',
                          fontFamily: 'monospace'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    {severityData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-zinc-400">{item.name}</span>
                        </div>
                        <span className="text-white font-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reviews & Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Reviews */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="font-mono text-lg">Recent Reviews</CardTitle>
                  <CardDescription className="font-mono">Latest AI code analysis results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {recentReviews.map((review) => (
                      <div
                        key={review.id}
                        className="p-4 rounded-lg border border-zinc-800 bg-black/40 hover:border-emerald-500/50 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <GitCommit className="w-4 h-4 text-emerald-400" />
                            <div className="flex-1">
                              <div className="font-mono text-sm text-white mb-1">{review.commit}</div>
                              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                                <span>{review.author}</span>
                                <span>•</span>
                                <span className={
                                  review.severity === 'critical' ? 'text-red-400' :
                                  review.severity === 'high' ? 'text-orange-400' :
                                  review.severity === 'medium' ? 'text-yellow-400' : 'text-emerald-400'
                                }>
                                  {review.issues} issues
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className={`px-3 py-1 rounded-full text-xs font-mono ${
                              review.status === 'pending' 
                                ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' 
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            }`}>
                              {review.status}
                            </div>
                            <Link href={`/review/${review.id}`}>
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Contributors */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono text-lg">Leaderboard</CardTitle>
                  <CardDescription className="font-mono">Top contributors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topContributors.map((contributor, index) => (
                      <div key={contributor.name} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold ${
                          index === 0 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                          index === 1 ? 'bg-zinc-400/20 text-zinc-400 border border-zinc-400/50' :
                          index === 2 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50' :
                          'bg-zinc-800 text-zinc-400'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-mono text-sm text-white">{contributor.name}</div>
                          <div className="text-xs text-zinc-400 font-mono">
                            {contributor.fixed}/{contributor.issues} fixed
                          </div>
                        </div>
                        <div className="text-emerald-400 font-mono font-bold text-lg">
                          {contributor.score}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
