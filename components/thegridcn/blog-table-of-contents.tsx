import * as React from "react"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  label: string
  level: number
}

interface BlogTableOfContentsProps {
  contentSelector?: string
  className?: string
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function BlogTableOfContents({
  contentSelector = ".encodere-blog-post__content",
  className,
}: BlogTableOfContentsProps) {
  const [items, setItems] = React.useState<TocItem[]>([])
  const [activeId, setActiveId] = React.useState("")

  React.useEffect(() => {
    const content = document.querySelector(contentSelector)
    if (!content) return

    const headings = content.querySelectorAll("h2, h3")
    const tocItems: TocItem[] = []

    headings.forEach((heading) => {
      const el = heading as HTMLElement
      if (!el.id) {
        el.id = slugify(el.textContent ?? "")
      }
      if (!el.id) return

      tocItems.push({
        id: el.id,
        label: el.textContent ?? "",
        level: Number(el.tagName.slice(1)),
      })
    })

    setItems(tocItems)
    if (tocItems.length > 0) {
      setActiveId(tocItems[0].id)
    }

    function handleScroll() {
      const ids = tocItems.map((item) => item.id)
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveId(ids[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [contentSelector])

  if (items.length === 0) return null

  return (
    <div
      data-slot="tron-toc"
      className={cn(
        "relative overflow-hidden rounded border border-primary/20 bg-card/80 p-4 backdrop-blur-sm",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      <div className="relative">
        <div className="mb-3 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="text-primary/60">
            <path d="M2 3.5h10M2 7h10M2 10.5h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
            índice
          </span>
        </div>

        <nav className="space-y-0.5" aria-label="Índice do artigo">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "flex items-center gap-2 rounded px-2.5 py-1.5 font-mono text-[11px] transition-colors",
                item.level === 3 && "pl-5",
                activeId === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/50 hover:bg-primary/5 hover:text-foreground/80"
              )}
            >
              <span
                className={cn(
                  "h-1 w-1 shrink-0 rounded-full",
                  activeId === item.id ? "bg-primary" : "bg-foreground/20"
                )}
              />
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/30" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/30" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/30" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/30" />
    </div>
  )
}
