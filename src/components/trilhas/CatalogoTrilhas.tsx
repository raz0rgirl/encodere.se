import { useMemo, useState } from 'react';

export interface Disciplina {
  fase: 'I' | 'II' | 'III' | 'IV' | 'V';
  nome: string;
  horas: number;
  mestra: string;
  resumo: string;
  tags: string[];
  ordem: number;
}

interface CatalogoTrilhasProps {
  disciplinas: Disciplina[];
}

const FASES = ['I', 'II', 'III', 'IV', 'V'] as const;

export function CatalogoTrilhas({ disciplinas }: CatalogoTrilhasProps) {
  const [faseAtiva, setFaseAtiva] = useState<(typeof FASES)[number] | 'todas'>('todas');

  const filtradas = useMemo(() => {
    const sorted = [...disciplinas].sort((a, b) => a.ordem - b.ordem);
    if (faseAtiva === 'todas') return sorted;
    return sorted.filter((d) => d.fase === faseAtiva);
  }, [disciplinas, faseAtiva]);

  return (
    <div className="encodere-catalogo">
      <div className="encodere-catalogo__filtros" role="group" aria-label="Filtrar por fase">
        <button
          type="button"
          className={faseAtiva === 'todas' ? 'encodere-filtro encodere-filtro--active' : 'encodere-filtro'}
          onClick={() => setFaseAtiva('todas')}
          aria-pressed={faseAtiva === 'todas'}
        >
          todas
        </button>
        {FASES.map((fase) => (
          <button
            key={fase}
            type="button"
            className={faseAtiva === fase ? 'encodere-filtro encodere-filtro--active' : 'encodere-filtro'}
            onClick={() => setFaseAtiva(fase)}
            aria-pressed={faseAtiva === fase}
          >
            fase {fase}
          </button>
        ))}
      </div>
      <p className="encodere-catalogo__status" aria-live="polite">
        {filtradas.length} disciplina{filtradas.length !== 1 ? 's' : ''}
        {faseAtiva !== 'todas' ? ` · fase ${faseAtiva}` : ''}
      </p>
      <ul className="encodere-catalogo__lista">
        {filtradas.map((d) => (
          <li key={`${d.fase}-${d.ordem}-${d.nome}`} className="encodere-catalogo__item encodere-scanline">
            <div className="encodere-catalogo__meta">
              <span className="encodere-catalogo__fase">fase {d.fase}</span>
              <span className="encodere-catalogo__horas">{d.horas}h</span>
            </div>
            <h3 className="encodere-catalogo__nome">{d.nome}</h3>
            <p className="encodere-catalogo__resumo">{d.resumo}</p>
            <p className="encodere-catalogo__mestra">mestra · {d.mestra}</p>
            <div className="encodere-catalogo__tags">
              {d.tags.map((tag) => (
                <span key={tag} className="encodere-catalogo__tag">
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
