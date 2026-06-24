import * as React from "react"

export function BlogScrollTop() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="encodere-blog-post__scroll-top"
      aria-label="Voltar ao topo"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 3.5v9M4.5 7 8 3.5 11.5 7"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
