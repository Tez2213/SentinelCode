"use client"

import { MatrixBackground } from "@/components/matrix-bg"
import { TerminalText } from "@/components/terminal-text"
import { Button } from "@/components/ui/button"
import { Github, GitBranch, Shield, Zap, Terminal, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <MatrixBackground />
      
      {/* Header */}
      <header className="relative z-10 border-b border-emerald-500/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-emerald-400" />
            <span className="text-xl font-mono font-bold text-emerald-400">SentinelCode</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#docs" className="text-zinc-400 hover:text-emerald-400 transition-colors">Docs</Link>
            <Link href="#api" className="text-zinc-400 hover:text-emerald-400 transition-colors">API</Link>
            <Link href="#about" className="text-zinc-400 hover:text-emerald-400 transition-colors">About</Link>
            <Link href="#privacy" className="text-zinc-400 hover:text-emerald-400 transition-colors">Privacy</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-block mb-6 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm">
            <span className="text-emerald-400 text-sm font-mono">v1.0.0 // SYSTEM ACTIVE</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-mono">
            <span className="text-white">Welcome to </span>
            <span className="text-emerald-400 inline-block">
              <TerminalText text="SentinelCode" delay={100} />
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-400 mb-4 font-mono">
            Automated, Intelligent Code Review
          </p>
          <p className="text-lg text-emerald-400/70 mb-12 font-mono">
            Continuous. Adaptive. Secure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="terminal" 
              size="lg" 
              className="group text-base px-8 py-6"
              onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/github`}
            >
              <Github className="w-5 h-5" />
              Login with GitHub
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="outline" size="lg" className="text-base px-8 py-6" disabled>
              <GitBranch className="w-5 h-5" />
              Login with GitLab
              <span className="ml-2 text-xs text-zinc-500">(Coming Soon)</span>
            </Button>
          </div>

          <div className="mt-8">
            <Link 
              href="/demo" 
              className="text-emerald-400 hover:text-emerald-300 underline decoration-dotted underline-offset-4 font-mono text-sm"
            >
              → See SentinelCode in action
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative p-6 rounded-lg border border-zinc-800 bg-black/60 backdrop-blur-sm hover:border-emerald-500/50 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
            <Shield className="w-10 h-10 text-emerald-400 mb-4" />
            <h3 className="text-xl font-mono font-bold text-emerald-400 mb-2">Security First</h3>
            <p className="text-zinc-400 text-sm font-mono">
              AI-powered vulnerability detection with real-time threat analysis
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="group relative p-6 rounded-lg border border-zinc-800 bg-black/60 backdrop-blur-sm hover:border-emerald-500/50 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
            <Zap className="w-10 h-10 text-emerald-400 mb-4" />
            <h3 className="text-xl font-mono font-bold text-emerald-400 mb-2">Lightning Fast</h3>
            <p className="text-zinc-400 text-sm font-mono">
              Average review time reduced by 62% with intelligent automation
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="group relative p-6 rounded-lg border border-zinc-800 bg-black/60 backdrop-blur-sm hover:border-emerald-500/50 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
            <Terminal className="w-10 h-10 text-emerald-400 mb-4" />
            <h3 className="text-xl font-mono font-bold text-emerald-400 mb-2">Adaptive Learning</h3>
            <p className="text-zinc-400 text-sm font-mono">
              Continuously improves from your feedback and coding patterns
            </p>
          </motion.div>
        </div>
      </section>

      {/* How to Use Guide */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-mono text-emerald-400 mb-3">
              How It Works
            </h2>
            <p className="text-zinc-400 font-mono">Get started in 4 simple steps</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center font-mono font-bold text-emerald-400 text-xl">
                1
              </div>
              <div className="p-6 rounded-lg border border-zinc-800 bg-black/60 backdrop-blur-sm hover:border-emerald-500/50 transition-all h-full">
                <h3 className="text-lg font-mono font-bold text-white mb-3 mt-2">Connect</h3>
                <p className="text-sm text-zinc-400 font-mono leading-relaxed">
                  Link your GitHub or GitLab repositories with one click. SentinelCode integrates seamlessly.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center font-mono font-bold text-emerald-400 text-xl">
                2
              </div>
              <div className="p-6 rounded-lg border border-zinc-800 bg-black/60 backdrop-blur-sm hover:border-emerald-500/50 transition-all h-full">
                <h3 className="text-lg font-mono font-bold text-white mb-3 mt-2">Scan</h3>
                <p className="text-sm text-zinc-400 font-mono leading-relaxed">
                  AI analyzes your codebase automatically on every commit. Get instant security and quality insights.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center font-mono font-bold text-emerald-400 text-xl">
                3
              </div>
              <div className="p-6 rounded-lg border border-zinc-800 bg-black/60 backdrop-blur-sm hover:border-emerald-500/50 transition-all h-full">
                <h3 className="text-lg font-mono font-bold text-white mb-3 mt-2">Review</h3>
                <p className="text-sm text-zinc-400 font-mono leading-relaxed">
                  Get detailed AI-powered code reviews with suggested fixes, explanations, and security alerts.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center font-mono font-bold text-emerald-400 text-xl">
                4
              </div>
              <div className="p-6 rounded-lg border border-zinc-800 bg-black/60 backdrop-blur-sm hover:border-emerald-500/50 transition-all h-full">
                <h3 className="text-lg font-mono font-bold text-white mb-3 mt-2">Improve</h3>
                <p className="text-sm text-zinc-400 font-mono leading-relaxed">
                  Apply fixes with one click. AI learns from your feedback and gets smarter over time.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Terminal Demo Preview */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-mono text-emerald-400 mb-2">
              Live Demo
            </h2>
            <p className="text-zinc-400 font-mono text-sm">See SentinelCode in action</p>
          </div>

          <div className="rounded-lg border border-emerald-500/30 bg-black/80 backdrop-blur-md overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)]">
            <div className="bg-zinc-900 px-4 py-2 flex items-center gap-2 border-b border-emerald-500/20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs text-zinc-400 font-mono ml-2">sentinel-terminal</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="text-emerald-400">$ sentinelcode analyze --repo myapp</div>
              <div className="text-zinc-400 mt-2">→ Analyzing codebase...</div>
              <div className="text-zinc-400">→ Running AI models...</div>
              <div className="text-yellow-400 mt-2">⚠ Found 3 security issues</div>
              <div className="text-emerald-400">✓ Suggested 12 improvements</div>
              <div className="text-blue-400">ℹ Quality score: A+ (94/100)</div>
              <div className="text-emerald-400 mt-4">$ _</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg border border-zinc-800 bg-black/60 backdrop-blur-sm">
              <div className="text-4xl font-bold font-mono text-emerald-400 mb-2">62%</div>
              <div className="text-sm text-zinc-400 font-mono">Faster Reviews</div>
            </div>
            <div className="text-center p-6 rounded-lg border border-zinc-800 bg-black/60 backdrop-blur-sm">
              <div className="text-4xl font-bold font-mono text-emerald-400 mb-2">94%</div>
              <div className="text-sm text-zinc-400 font-mono">AI Accuracy</div>
            </div>
            <div className="text-center p-6 rounded-lg border border-zinc-800 bg-black/60 backdrop-blur-sm">
              <div className="text-4xl font-bold font-mono text-emerald-400 mb-2">10K+</div>
              <div className="text-sm text-zinc-400 font-mono">Issues Fixed</div>
            </div>
            <div className="text-center p-6 rounded-lg border border-zinc-800 bg-black/60 backdrop-blur-sm">
              <div className="text-4xl font-bold font-mono text-emerald-400 mb-2">24/7</div>
              <div className="text-sm text-zinc-400 font-mono">Monitoring</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-emerald-500/20 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-zinc-400 text-sm font-mono">
              © 2025 SentinelCode. All systems operational.
            </div>
            <div className="flex gap-6 text-sm font-mono">
              <Link href="#about" className="text-zinc-400 hover:text-emerald-400 transition-colors">About</Link>
              <Link href="#docs" className="text-zinc-400 hover:text-emerald-400 transition-colors">Docs</Link>
              <Link href="#api" className="text-zinc-400 hover:text-emerald-400 transition-colors">API</Link>
              <Link href="#privacy" className="text-zinc-400 hover:text-emerald-400 transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
