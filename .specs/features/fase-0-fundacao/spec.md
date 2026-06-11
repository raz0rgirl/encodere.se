# F-00 · Fundação

## Requirements

| ID | Requirement | Priority |
|---|---|---|
| R-00-01 | Design tokens `--encodere-*` em `src/styles/tokens.css` | Must |
| R-00-02 | `global.css` consome tokens; keyframes glitch/scanline | Must |
| R-00-03 | `BaseLayout` com script anti-flash de tema | Must |
| R-00-04 | JetBrains Mono self-host | Must |
| R-00-05 | `site: https://encodere.se` em astro.config | Must |
| R-00-06 | `ThemeToggle` ilha React (`client:idle`) | Must |
| R-00-07 | `SiteLayout` com nav + footer + slot | Must |

## Done when

- Build passa sem erros
- Tema persiste em localStorage
- Nenhuma cor literal hardcoded nos novos arquivos de fundação
