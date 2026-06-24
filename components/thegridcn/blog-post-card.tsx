import * as React from "react"
import { cn } from "@/lib/utils"

interface BlogPostCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string
  excerpt: string
  date: string
  href: string
}

function ArrowRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M4 2.5l4 3.5-4 3.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BlogPostCard({
  title,
  excerpt,
  date,
  href,
  className,
  ...props
}: BlogPostCardProps) {
  return (
    <a
      data-slot="tron-blog-post-card"
      href={href}
      className={cn(
        "group relative block overflow-hidden rounded border border-primary/20 bg-card/80 p-4 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-[0_0_20px_rgba(var(--primary-rgb,0,180,255),0.08)]",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      <div className="relative">
        <div className="flex items-center gap-3 text-foreground/40">
          <span className="font-mono text-[10px] uppercase tracking-widest">{date}</span>
        </div>

        <h3 className="mt-2 text-xs font-bold uppercase tracking-wider text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>

        <p className="mt-1.5 text-xs leading-relaxed text-foreground/50">{excerpt}</p>

        <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-primary/60 transition-colors group-hover:text-primary">
          ler mais
          <span className="transition-transform group-hover:translate-x-0.5">
            <ArrowRightIcon />
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 border-l-2 border-t-2 border-primary/20 transition-colors group-hover:border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 border-b-2 border-r-2 border-primary/20 transition-colors group-hover:border-primary/40" />
    </a>
  )
}
