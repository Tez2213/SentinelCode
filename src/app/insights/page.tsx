"use client"

import { MatrixBackground } from "@/components/matrix-bg"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Brain, Target, AlertCircle } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const accuracyData = [
  { week: "Week 1", accuracy: 78, accepted: 45, ignored: 12 },
  { week: "Week 2", accuracy: 82, accepted: 52, ignored: 11 },
  { week: "Week 3", accuracy: 85, accepted: 58, ignored: 10 },
  { week: "Week 4", accuracy: 89, accepted: 65, ignored: 8 },
  { week: "Week 5", accuracy: 91, accepted: 71, ignored: 7 },
  { week: "Week 6", accuracy: 94, accepted: 78, ignored: 5 },
]

const falsePositives = [
  { pattern: "Unused variable in lambda", count: 23, category: "Code Quality" },
  { pattern: "Import order suggestion", count: 18, category: "Style" },
  { pattern: "Line length warning", count: 15, category: "Style" },
  { pattern: "Type hint missing", count: 12, category: "Documentation" },
  { pattern: "Docstring format", count: 9, category: "Documentation" },
]

const confidenceData = [
  { type: "Security", low: 5, medium: 12, high: 45, critical: 38 },
  { type: "Quality", low: 8, medium: 25, high: 42, critical: 25 },
  { type: "Style", low: 15, medium: 35, high: 35, critical: 15 },
  { type: "Performance", low: 10, medium: 20, high: 40, critical: 30 },
]

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <MatrixBackground />
      
      <div className="relative z-10 flex">
        <Sidebar />
        
        <div className="flex-1">
          {/* Header */}
          <header className="border-b border-emerald-500/20 bg-black/80 backdrop-blur-sm">
            <div className="px-6 py-4">
              <div>
                <h1 className="text-2xl font-bold font-mono text-emerald-400">
                  AI Learning Insights
                </h1>
                <p className="text-xs text-zinc-400 font-mono">
                  Model performance and continuous improvement metrics
                </p>
              </div>
            </div>
          </header>

          <div className="px-6 py-8 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Brain className="w-6 h-6 text-purple-400" />
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-purple-400 font-mono mb-1">94%</div>
                <div className="text-xs text-zinc-400 font-mono">Current Accuracy</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-6 h-6 text-emerald-400" />
                  <span className="text-xs text-emerald-400 font-mono">+16%</span>
                </div>
                <div className="text-2xl font-bold text-emerald-400 font-mono mb-1">6 weeks</div>
                <div className="text-xs text-zinc-400 font-mono">Learning Period</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <AlertCircle className="w-6 h-6 text-yellow-400" />
                  <span className="text-xs text-yellow-400 font-mono">-73%</span>
                </div>
                <div className="text-2xl font-bold text-yellow-400 font-mono mb-1">5</div>
                <div className="text-xs text-zinc-400 font-mono">False Positives/Week</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                  <span className="text-xs text-blue-400 font-mono">↑</span>
                </div>
                <div className="text-2xl font-bold text-blue-400 font-mono mb-1">467</div>
                <div className="text-xs text-zinc-400 font-mono">Total Feedback Events</div>
              </CardContent>
            </Card>
          </div>

          {/* Accuracy Improvement Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Accuracy Improvement Over Time</CardTitle>
              <CardDescription className="font-mono">
                AI model performance based on accepted vs rejected fixes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={accuracyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis 
                    dataKey="week" 
                    stroke="#71717a" 
                    style={{ fontSize: '12px', fontFamily: 'monospace' }} 
                  />
                  <YAxis 
                    stroke="#71717a" 
                    style={{ fontSize: '12px', fontFamily: 'monospace' }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#000', 
                      border: '1px solid #10b981',
                      borderRadius: '8px',
                      fontFamily: 'monospace'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="accepted" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ignored" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 flex items-center justify-center gap-6 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-zinc-400">Accuracy %</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-1 bg-blue-500" />
                  <span className="text-zinc-400">Accepted Fixes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-1 bg-red-500" />
                  <span className="text-zinc-400">Ignored Suggestions</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top False Positives */}
            <Card>
              <CardHeader>
                <CardTitle className="font-mono">Top False Positives</CardTitle>
                <CardDescription className="font-mono">
                  Most commonly ignored patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {falsePositives.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="font-mono text-sm text-white mb-1">{item.pattern}</div>
                        <div className="text-xs text-zinc-400 font-mono">{item.category}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-yellow-400 font-mono font-bold">{item.count}</div>
                        <Button variant="outline" size="sm">
                          Ignore
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Model Confidence Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="font-mono">Model Confidence Distribution</CardTitle>
                <CardDescription className="font-mono">
                  Confidence levels by issue type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={confidenceData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis 
                      type="number" 
                      stroke="#71717a" 
                      style={{ fontSize: '12px', fontFamily: 'monospace' }} 
                    />
                    <YAxis 
                      type="category" 
                      dataKey="type" 
                      stroke="#71717a" 
                      style={{ fontSize: '12px', fontFamily: 'monospace' }} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#000', 
                        border: '1px solid #10b981',
                        borderRadius: '8px',
                        fontFamily: 'monospace'
                      }} 
                    />
                    <Bar dataKey="critical" stackId="a" fill="#ef4444" />
                    <Bar dataKey="high" stackId="a" fill="#f59e0b" />
                    <Bar dataKey="medium" stackId="a" fill="#eab308" />
                    <Bar dataKey="low" stackId="a" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-zinc-400">Critical Confidence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="text-zinc-400">High Confidence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-zinc-400">Medium Confidence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-zinc-400">Low Confidence</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Customization */}
          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Team Customization</CardTitle>
              <CardDescription className="font-mono">
                Fine-tune AI behavior for your codebase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-zinc-800 bg-black/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-white">Ignore style warnings for test files</span>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono">
                    Reduce noise by ignoring formatting issues in *_test.py files
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-zinc-800 bg-black/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-white">Prioritize security over style</span>
                    <Button variant="terminal" size="sm">Enabled</Button>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono">
                    Focus AI attention on security vulnerabilities first
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-zinc-800 bg-black/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-white">Auto-apply low-risk fixes</span>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono">
                    Automatically commit fixes with confidence score {'>'} 95%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
