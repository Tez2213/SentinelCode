"use client"

import { Terminal, BarChart3, FileCode, TrendingUp, AlertTriangle, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    name: "Reviews",
    href: "/review/1",
    icon: FileCode,
  },
  {
    name: "AI Insights",
    href: "/insights",
    icon: TrendingUp,
  },
  {
    name: "Repositories",
    href: "/setup",
    icon: AlertTriangle,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:block w-64 border-r border-emerald-500/20 bg-black/80 backdrop-blur-sm min-h-screen">
      <div className="p-6">
        <Link href="/landing" className="flex items-center gap-2 mb-8 group">
          <Terminal className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-mono font-bold text-emerald-400">SentinelCode</span>
        </Link>
        
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || 
                           (item.href === "/review/1" && pathname?.startsWith("/review"))
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-md transition-all",
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    : "text-zinc-400 hover:text-emerald-400 hover:bg-white/5"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="font-mono text-sm">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 p-4 rounded-lg border border-zinc-800 bg-black/60">
          <div className="text-xs text-zinc-400 font-mono mb-2">System Status</div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-mono">All systems operational</span>
          </div>
          <div className="text-xs text-zinc-500 font-mono">Uptime: 99.9%</div>
        </div>
      </div>
    </aside>
  )
}
