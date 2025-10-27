"use client"

import { MatrixBackground } from "@/components/matrix-bg"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Shield,
  Clock,
  GitCommit,
  User,
  Code2,
  Copy,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  Terminal,
  ChevronRight
} from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

interface Issue {
  id: number
  file: string
  line: number
  type: string
  severity: "critical" | "high" | "medium" | "low"
  message: string
  suggestedPatch: string
  explanation: string
}

const mockIssues: Issue[] = [
  {
    id: 1,
    file: "api/auth.py",
    line: 48,
    type: "Security",
    severity: "critical",
    message: "Hardcoded secret detected. Move credentials to environment variables.",
    suggestedPatch: `- API_KEY = "sk_live_12345678900"
+ API_KEY = os.getenv("API_KEY")`,
    explanation: "Hardcoded secrets in source code pose a significant security risk. If this code is committed to version control, the secret becomes exposed. Use environment variables or secure secret management systems instead."
  },
  {
    id: 2,
    file: "api/auth.py",
    line: 72,
    type: "Security",
    severity: "high",
    message: "SQL injection vulnerability detected. Use parameterized queries.",
    suggestedPatch: `- query = f"SELECT * FROM users WHERE id = {user_id}"
+ query = "SELECT * FROM users WHERE id = %s"
+ cursor.execute(query, (user_id,))`,
    explanation: "String concatenation in SQL queries allows attackers to inject malicious SQL code. Always use parameterized queries to prevent SQL injection attacks."
  },
  {
    id: 3,
    file: "api/auth.py",
    line: 95,
    type: "Code Quality",
    severity: "medium",
    message: "Unused import detected. Remove 'datetime' import.",
    suggestedPatch: `- from datetime import datetime
- import os`,
    explanation: "Unused imports clutter the codebase and can slightly impact load time. Clean code should only import what's necessary."
  }
]

const commitInfo = {
  hash: "abcd1234",
  author: "@tejasvi",
  timestamp: "2 hours ago",
  message: "Add user authentication endpoint",
  branch: "feature/auth"
}

export default function ReviewReportPage() {
  const [activeTab, setActiveTab] = useState<"ai" | "static" | "combined">("ai")
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null)
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const handleCopy = (patch: string, id: number) => {
    navigator.clipboard.writeText(patch)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-400 bg-red-500/10 border-red-500/30"
      case "high": return "text-orange-400 bg-orange-500/10 border-orange-500/30"
      case "medium": return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30"
      case "low": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
      default: return "text-zinc-400 bg-zinc-500/10 border-zinc-500/30"
    }
  }

  const severityCount = {
    critical: mockIssues.filter(i => i.severity === "critical").length,
    high: mockIssues.filter(i => i.severity === "high").length,
    medium: mockIssues.filter(i => i.severity === "medium").length,
    low: mockIssues.filter(i => i.severity === "low").length,
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <MatrixBackground />
      
      <div className="relative z-10 flex">
        <Sidebar />
        
        <div className="flex-1">
          {/* Top Bar */}
          <header className="border-b border-emerald-500/20 bg-black/80 backdrop-blur-sm">
            <div className="px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h1 className="text-xl font-bold font-mono text-emerald-400">
                    Review Report
                  </h1>
                  <p className="text-xs text-zinc-400 font-mono">
                    Commit #{commitInfo.hash} • {commitInfo.branch}
                  </p>
                </div>
                <Button variant="terminal" size="sm">
                  <Terminal className="w-4 h-4" />
                  Re-run AI Review
                </Button>
              </div>
            </div>
          </header>

          <div className="px-6 py-8">
          {/* Commit Info Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <GitCommit className="w-5 h-5 text-emerald-400 mt-1" />
                  <div>
                    <div className="font-mono text-white font-semibold mb-1">
                      {commitInfo.message}
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {commitInfo.author}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {commitInfo.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-mono border ${getSeverityColor("critical")}`}>
                    {severityCount.critical} Critical
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-mono border ${getSeverityColor("high")}`}>
                    {severityCount.high} High
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-mono border ${getSeverityColor("medium")}`}>
                    {severityCount.medium} Medium
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Tabs */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 border-b border-zinc-800">
                    <button
                      onClick={() => setActiveTab("ai")}
                      className={`px-4 py-2 font-mono text-sm transition-colors border-b-2 ${
                        activeTab === "ai"
                          ? "border-emerald-500 text-emerald-400"
                          : "border-transparent text-zinc-400 hover:text-zinc-300"
                      }`}
                    >
                      AI Suggestions
                    </button>
                    <button
                      onClick={() => setActiveTab("static")}
                      className={`px-4 py-2 font-mono text-sm transition-colors border-b-2 ${
                        activeTab === "static"
                          ? "border-emerald-500 text-emerald-400"
                          : "border-transparent text-zinc-400 hover:text-zinc-300"
                      }`}
                    >
                      Static Analysis
                    </button>
                    <button
                      onClick={() => setActiveTab("combined")}
                      className={`px-4 py-2 font-mono text-sm transition-colors border-b-2 ${
                        activeTab === "combined"
                          ? "border-emerald-500 text-emerald-400"
                          : "border-transparent text-zinc-400 hover:text-zinc-300"
                      }`}
                    >
                      Combined Summary
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockIssues.map((issue, index) => (
                      <motion.div
                        key={issue.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-lg border border-zinc-800 bg-black/40 overflow-hidden"
                      >
                        {/* Issue Header */}
                        <div className="p-4 border-b border-zinc-800">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex items-start gap-3 flex-1">
                              <Shield className={`w-5 h-5 mt-0.5 ${
                                issue.severity === "critical" ? "text-red-400" :
                                issue.severity === "high" ? "text-orange-400" :
                                issue.severity === "medium" ? "text-yellow-400" : "text-emerald-400"
                              }`} />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className={`px-2 py-0.5 rounded text-xs font-mono border ${getSeverityColor(issue.severity)}`}>
                                    {issue.severity.toUpperCase()}
                                  </span>
                                  <span className="text-xs font-mono text-zinc-400">{issue.type}</span>
                                </div>
                                <div className="font-mono text-sm text-white mb-1">
                                  {issue.message}
                                </div>
                                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                                  <Code2 className="w-3 h-3" />
                                  <span>{issue.file}</span>
                                  <span>•</span>
                                  <span>Line {issue.line}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Suggested Patch */}
                        <div className="p-4 bg-zinc-900/50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono text-emerald-400">Suggested Patch</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopy(issue.suggestedPatch, issue.id)}
                            >
                              {copiedId === issue.id ? (
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </Button>
                          </div>
                          <pre className="bg-black/60 border border-zinc-800 rounded p-3 text-xs font-mono overflow-x-auto">
                            <code className="text-zinc-300">{issue.suggestedPatch}</code>
                          </pre>
                        </div>

                        {/* Actions */}
                        <div className="p-4 flex items-center justify-between border-t border-zinc-800">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                          >
                            <HelpCircle className="w-4 h-4" />
                            Explain Why
                          </Button>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <XCircle className="w-4 h-4" />
                              Ignore
                            </Button>
                            <Button variant="terminal" size="sm">
                              <CheckCircle2 className="w-4 h-4" />
                              Apply Fix
                              <ChevronRight className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Explanation (Expandable) */}
                        {expandedIssue === issue.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-zinc-800 bg-emerald-500/5 p-4"
                          >
                            <div className="text-xs font-mono text-zinc-300 leading-relaxed">
                              {issue.explanation}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Feedback */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono text-sm">Reviewer Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-zinc-400 font-mono mb-4">
                    Help improve AI accuracy by rating this review
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ThumbsUp className="w-4 h-4" />
                      Accept
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <ThumbsDown className="w-4 h-4" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Project Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono text-sm">Review Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-400">Total Issues</span>
                    <span className="text-white font-bold">{mockIssues.length}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-400">Files Scanned</span>
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-400">Lines Changed</span>
                    <span className="text-white font-bold">47</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-400">Confidence</span>
                    <span className="text-emerald-400 font-bold">94%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <GitCommit className="w-4 h-4" />
                    View Diff
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Code2 className="w-4 h-4" />
                    Open in IDE
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <AlertTriangle className="w-4 h-4" />
                    Create Issue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
