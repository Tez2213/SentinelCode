"use client"

import { MatrixBackground } from "@/components/matrix-bg"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, GitBranch, Code, Lock, ChevronRight, Check } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"

interface Repository {
  id: number
  name: string
  language: string
  visibility: "public" | "private"
  lastUpdated: string
  enabled: boolean
}

const mockRepos: Repository[] = [
  { id: 1, name: "ai-backend", language: "Python", visibility: "private", lastUpdated: "2 hours ago", enabled: false },
  { id: 2, name: "frontend-app", language: "TypeScript", visibility: "public", lastUpdated: "5 hours ago", enabled: false },
  { id: 3, name: "mobile-client", language: "Kotlin", visibility: "private", lastUpdated: "1 day ago", enabled: false },
  { id: 4, name: "api-gateway", language: "Go", visibility: "public", lastUpdated: "3 days ago", enabled: false },
  { id: 5, name: "data-pipeline", language: "Python", visibility: "private", lastUpdated: "1 week ago", enabled: false },
]

export default function SetupPage() {
  const [repos, setRepos] = useState<Repository[]>(mockRepos)
  const [searchTerm, setSearchTerm] = useState("")
  const [languageFilter, setLanguageFilter] = useState<string>("all")

  const toggleRepo = (id: number) => {
    setRepos(repos.map(repo => 
      repo.id === id ? { ...repo, enabled: !repo.enabled } : repo
    ))
  }

  const filteredRepos = repos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLanguage = languageFilter === "all" || repo.language === languageFilter
    return matchesSearch && matchesLanguage
  })

  const enabledCount = repos.filter(r => r.enabled).length

  return (
    <div className="min-h-screen bg-black text-white">
      <MatrixBackground />
      
      <div className="relative z-10 flex">
        <Sidebar />
        
        <div className="flex-1 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-mono text-emerald-400 mb-2">
            Connect Your Repositories
          </h1>
          <p className="text-zinc-400 font-mono text-sm">
            Select repositories for AI-powered continuous code review
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-emerald-400 font-mono">{repos.length}</div>
              <div className="text-xs text-zinc-400 font-mono">Total Repos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-emerald-400 font-mono">{enabledCount}</div>
              <div className="text-xs text-zinc-400 font-mono">Enabled</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-400 font-mono">
                {repos.filter(r => r.visibility === "private").length}
              </div>
              <div className="text-xs text-zinc-400 font-mono">Private</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-400 font-mono">
                {new Set(repos.map(r => r.language)).size}
              </div>
              <div className="text-xs text-zinc-400 font-mono">Languages</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search repositories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-md pl-10 pr-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none font-mono"
                />
              </div>
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="bg-black border border-zinc-800 rounded-md px-4 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none font-mono"
              >
                <option value="all">All Languages</option>
                <option value="Python">Python</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Go">Go</option>
                <option value="Kotlin">Kotlin</option>
              </select>
              <Button variant="outline">
                <GitBranch className="w-4 h-4" />
                Add from GitHub
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Repository List */}
        <Card>
          <CardHeader>
            <CardTitle className="font-mono">Available Repositories</CardTitle>
            <CardDescription className="font-mono">
              Toggle repositories to enable AI code review monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredRepos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    p-4 rounded-lg border transition-all cursor-pointer
                    ${repo.enabled 
                      ? 'border-emerald-500/50 bg-emerald-500/5' 
                      : 'border-zinc-800 bg-black/40 hover:border-zinc-700'
                    }
                  `}
                  onClick={() => toggleRepo(repo.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`
                        w-10 h-10 rounded-md flex items-center justify-center
                        ${repo.enabled ? 'bg-emerald-500/20' : 'bg-zinc-800'}
                      `}>
                        {repo.enabled ? (
                          <Check className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Code className="w-5 h-5 text-zinc-400" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-mono font-semibold text-white">{repo.name}</h3>
                          {repo.visibility === "private" && (
                            <Lock className="w-3 h-3 text-zinc-400" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                          <span className="text-emerald-400">{repo.language}</span>
                          <span>•</span>
                          <span>Updated {repo.lastUpdated}</span>
                        </div>
                      </div>
                    </div>

                    <div className={`
                      relative w-12 h-6 rounded-full transition-colors
                      ${repo.enabled ? 'bg-emerald-500' : 'bg-zinc-700'}
                    `}>
                      <div className={`
                        absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform
                        ${repo.enabled ? 'translate-x-6' : 'translate-x-0'}
                      `} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Bar */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between items-center p-6 rounded-lg border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-sm">
          <div className="font-mono text-sm">
            <span className="text-zinc-400">Selected: </span>
            <span className="text-emerald-400 font-bold">{enabledCount} repositories</span>
          </div>
          <Link href="/dashboard">
            <Button 
              variant="terminal" 
              size="lg"
              disabled={enabledCount === 0}
              className="group"
            >
              Activate Continuous AI Review
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}
