"use client"

import { MatrixBackground } from "@/components/matrix-bg"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Save, 
  Shield, 
  Bell, 
  Code,
  Key,
  AlertTriangle
} from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [sensitivity, setSensitivity] = useState("medium")
  const [ruleset, setRuleset] = useState("pep8")
  const [slackEnabled, setSlackEnabled] = useState(false)
  const [emailEnabled, setEmailEnabled] = useState(true)

  return (
    <div className="min-h-screen bg-black text-white">
      <MatrixBackground />
      
      <div className="relative z-10 flex">
        <Sidebar />
        
        <div className="flex-1">
          {/* Header */}
          <header className="border-b border-emerald-500/20 bg-black/80 backdrop-blur-sm">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold font-mono text-emerald-400">Settings</h1>
                  <p className="text-xs text-zinc-400 font-mono">Repository preferences and configuration</p>
                </div>
                <Button variant="terminal">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </header>

          <div className="px-6 py-8">
            <div className="max-w-4xl space-y-6">
            {/* AI Sensitivity */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <CardTitle className="font-mono">AI Sensitivity Level</CardTitle>
                </div>
                <CardDescription className="font-mono">
                  Control how strict the AI review should be
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setSensitivity("low")}
                    className={`p-4 rounded-lg border transition-all ${
                      sensitivity === "low"
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-zinc-800 bg-black/40 hover:border-zinc-700"
                    }`}
                  >
                    <div className="font-mono font-bold text-white mb-2">Low</div>
                    <div className="text-xs text-zinc-400 font-mono">
                      Only critical issues and security vulnerabilities
                    </div>
                  </button>

                  <button
                    onClick={() => setSensitivity("medium")}
                    className={`p-4 rounded-lg border transition-all ${
                      sensitivity === "medium"
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-zinc-800 bg-black/40 hover:border-zinc-700"
                    }`}
                  >
                    <div className="font-mono font-bold text-white mb-2">Medium</div>
                    <div className="text-xs text-zinc-400 font-mono">
                      Balanced approach with security and quality checks
                    </div>
                  </button>

                  <button
                    onClick={() => setSensitivity("strict")}
                    className={`p-4 rounded-lg border transition-all ${
                      sensitivity === "strict"
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-zinc-800 bg-black/40 hover:border-zinc-700"
                    }`}
                  >
                    <div className="font-mono font-bold text-white mb-2">Strict</div>
                    <div className="text-xs text-zinc-400 font-mono">
                      Comprehensive review including style and best practices
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Ruleset Configuration */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-emerald-400" />
                  <CardTitle className="font-mono">Ruleset Configuration</CardTitle>
                </div>
                <CardDescription className="font-mono">
                  Select coding standards and style guides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-mono text-zinc-400 mb-2 block">
                      Primary Ruleset
                    </label>
                    <select
                      value={ruleset}
                      onChange={(e) => setRuleset(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-md px-4 py-3 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="pep8">PEP8 (Python)</option>
                      <option value="airbnb">Airbnb (JavaScript)</option>
                      <option value="google">Google Style Guide</option>
                      <option value="standard">StandardJS</option>
                      <option value="custom">Custom Configuration</option>
                    </select>
                  </div>

                  <div className="p-4 rounded-lg border border-zinc-800 bg-black/40">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm text-white">Enable type checking</span>
                      <div className="relative w-12 h-6 rounded-full bg-emerald-500 cursor-pointer">
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-zinc-800 bg-black/40">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm text-white">Check docstring coverage</span>
                      <div className="relative w-12 h-6 rounded-full bg-emerald-500 cursor-pointer">
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-zinc-800 bg-black/40">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm text-white">Enforce max line length (120)</span>
                      <div className="relative w-12 h-6 rounded-full bg-zinc-700 cursor-pointer">
                        <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Integration Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-emerald-400" />
                  <CardTitle className="font-mono">Integration Settings</CardTitle>
                </div>
                <CardDescription className="font-mono">
                  Configure notifications and external integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg border border-zinc-800 bg-black/40">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-mono text-sm text-white mb-1">Slack Notifications</div>
                      <div className="text-xs text-zinc-400 font-mono">
                        Send alerts to #code-review channel
                      </div>
                    </div>
                    <div
                      onClick={() => setSlackEnabled(!slackEnabled)}
                      className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors ${
                        slackEnabled ? "bg-emerald-500" : "bg-zinc-700"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          slackEnabled ? "right-1" : "left-1"
                        }`}
                      />
                    </div>
                  </div>
                  {slackEnabled && (
                    <input
                      type="text"
                      placeholder="Webhook URL"
                      className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  )}
                </div>

                <div className="p-4 rounded-lg border border-zinc-800 bg-black/40">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-mono text-sm text-white mb-1">Email Notifications</div>
                      <div className="text-xs text-zinc-400 font-mono">
                        Daily summary reports
                      </div>
                    </div>
                    <div
                      onClick={() => setEmailEnabled(!emailEnabled)}
                      className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors ${
                        emailEnabled ? "bg-emerald-500" : "bg-zinc-700"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          emailEnabled ? "right-1" : "left-1"
                        }`}
                      />
                    </div>
                  </div>
                  {emailEnabled && (
                    <input
                      type="email"
                      placeholder="team@example.com"
                      className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  )}
                </div>

                <div className="p-4 rounded-lg border border-zinc-800 bg-black/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-sm text-white mb-1">Jira Integration</div>
                      <div className="text-xs text-zinc-400 font-mono">
                        Create tickets for critical issues
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Keys */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-emerald-400" />
                  <CardTitle className="font-mono">API Keys</CardTitle>
                </div>
                <CardDescription className="font-mono">
                  Manage API access tokens for CI/CD integration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg border border-zinc-800 bg-black/40">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-mono text-sm text-white mb-1">Production API Key</div>
                      <div className="text-xs text-zinc-400 font-mono">
                        sk_prod_••••••••••••1234
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Rotate</Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Key className="w-4 h-4" />
                  Generate New API Key
                </Button>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-500/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <CardTitle className="font-mono text-red-400">Danger Zone</CardTitle>
                </div>
                <CardDescription className="font-mono">
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg border border-red-500/30 bg-red-500/5">
                  <div>
                    <div className="font-mono text-sm text-white mb-1">Reset AI Learning</div>
                    <div className="text-xs text-zinc-400 font-mono">
                      Clear all feedback and start fresh
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                    Reset
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-red-500/30 bg-red-500/5">
                  <div>
                    <div className="font-mono text-sm text-white mb-1">Disconnect Repository</div>
                    <div className="text-xs text-zinc-400 font-mono">
                      Remove SentinelCode from this project
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                    Disconnect
                  </Button>
                </div>
              </CardContent>
            </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
