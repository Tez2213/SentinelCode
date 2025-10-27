"use client"

import { MatrixBackground } from "@/components/matrix-bg"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const demoSteps = [
  {
    title: "1. Connect Repository",
    description: "Link your GitHub repository to SentinelCode",
    code: `$ git remote add sentinel https://github.com/user/repo.git
✓ Repository connected successfully
→ Installing webhooks...`,
  },
  {
    title: "2. Initial Scan",
    description: "AI performs baseline code analysis",
    code: `$ sentinelcode scan --full
→ Analyzing 47 files...
→ Running security checks...
→ Checking code quality...
✓ Scan complete: 23 issues found`,
  },
  {
    title: "3. Code Review",
    description: "AI reviews new commits automatically",
    code: `Commit: abc123 - "Add user auth"
⚠ 3 security issues detected
✓ 5 improvements suggested
ℹ Quality score: 87/100`,
  },
  {
    title: "4. Apply Fixes",
    description: "One-click patch application",
    code: `$ sentinelcode apply --patch=P001
→ Applying security fix...
✓ Hardcoded secret moved to .env
✓ Created pull request #42`,
  },
  {
    title: "5. Continuous Learning",
    description: "AI adapts to your feedback",
    code: `Feedback received: 👍 Accepted
→ Model accuracy: 94%
→ Learning from team patterns...
✓ AI confidence improved`,
  },
]

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= demoSteps.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isPlaying])

  const handleReset = () => {
    setCurrentStep(0)
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <MatrixBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-emerald-500/20 bg-black/80 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <Link href="/landing">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold font-mono text-emerald-400">
                  Interactive Demo
                </h1>
                <p className="text-xs text-zinc-400 font-mono">
                  See how SentinelCode works in action
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Button
                variant="terminal"
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={currentStep >= demoSteps.length - 1 && !isPlaying}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    {currentStep >= demoSteps.length - 1 ? "Finished" : "Play"}
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-400">Progress</span>
                <span className="text-xs font-mono text-emerald-400">
                  {currentStep + 1} / {demoSteps.length}
                </span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Step Display */}
            <Card className="mb-6">
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold font-mono text-emerald-400 mb-2">
                        {demoSteps[currentStep].title}
                      </h2>
                      <p className="text-zinc-400 font-mono">
                        {demoSteps[currentStep].description}
                      </p>
                    </div>

                    {/* Terminal Output */}
                    <div className="rounded-lg border border-emerald-500/30 bg-black/80 overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                      <div className="bg-zinc-900 px-4 py-2 flex items-center gap-2 border-b border-emerald-500/20">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500/80" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="text-xs text-zinc-400 font-mono ml-2">
                          sentinel-demo
                        </span>
                      </div>
                      <div className="p-6 font-mono text-sm min-h-[200px]">
                        <pre className="text-emerald-400 whitespace-pre-wrap">
                          {demoSteps[currentStep].code}
                        </pre>
                        <div className="mt-4 text-emerald-400 animate-pulse">$ _</div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Step Navigation */}
            <div className="grid grid-cols-5 gap-3">
              {demoSteps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentStep(index)
                    setIsPlaying(false)
                  }}
                  className={`p-4 rounded-lg border transition-all ${
                    index === currentStep
                      ? "border-emerald-500 bg-emerald-500/10"
                      : index < currentStep
                      ? "border-emerald-500/50 bg-emerald-500/5"
                      : "border-zinc-800 bg-black/40 hover:border-zinc-700"
                  }`}
                >
                  <div className="font-mono text-xs text-center">
                    {index < currentStep && (
                      <div className="text-emerald-400 mb-1">✓</div>
                    )}
                    <div
                      className={
                        index === currentStep
                          ? "text-emerald-400"
                          : index < currentStep
                          ? "text-emerald-400/70"
                          : "text-zinc-400"
                      }
                    >
                      Step {index + 1}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* CTA */}
            {currentStep >= demoSteps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <Link href="/setup">
                  <Button variant="terminal" size="lg">
                    Get Started Now
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
