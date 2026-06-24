import { useEffect, useMemo, useState } from 'react';
import { AnomalyBanner } from '@/components/thegridcn/anomaly-banner';
import { CoordinateDisplay } from '@/components/thegridcn/coordinate-display';
import { DataStream, type DataStreamEntry } from '@/components/thegridcn/data-stream';
import { DiagnosticsPanel } from '@/components/thegridcn/diagnostics-panel';
import { Gauge } from '@/components/thegridcn/gauge';
import { Heatmap } from '@/components/thegridcn/heatmap';
import { MapMarker } from '@/components/thegridcn/map-marker';
import { Radar } from '@/components/thegridcn/radar';

const BREACH_LOG: DataStreamEntry[] = [
	{ timestamp: '00:00:02', text: 'SCAN: 847 endpoints indexados — 23 sem autenticação', type: 'warning' },
	{ timestamp: '00:00:07', text: 'GET /api/users?limit=9999 → 12.438 registros com e-mail + CPF', type: 'error' },
	{ timestamp: '00:00:11', text: 'JWT em localStorage — token roubado via XSS refletido', type: 'error' },
	{ timestamp: '00:00:16', text: 'S3 bucket "prod-backups" — ACL público detectado', type: 'error' },
	{ timestamp: '00:00:21', text: 'EXFIL: 2,1 GB enviados para 185.x.x.x (Rússia)', type: 'error' },
	{ timestamp: '00:00:28', text: 'Stripe webhook sem assinatura — pagamentos manipuláveis', type: 'warning' },
	{ timestamp: '00:00:34', text: 'LGPD: prazo ANPD 72h — playbook de incidente AUSENTE', type: 'error' },
	{ timestamp: '00:00:41', text: 'CHURN: 34% dos usuários cancelaram nas primeiras 48h', type: 'error' },
	{ timestamp: '00:00:48', text: 'CUSTO EST.: R$ 180.000 — multa + remediação + reputação', type: 'error' },
];

const SURFACE_MARKERS = [
	{ label: 'API REST', variant: 'danger' as const, x: '18%', y: '28%', coords: 'AUTH: OFF' },
	{ label: 'PostgreSQL', variant: 'danger' as const, x: '62%', y: '22%', coords: 'PII: 12k' },
	{ label: 'S3 backups', variant: 'danger' as const, x: '78%', y: '55%', coords: 'ACL: PUBLIC' },
	{ label: 'Admin panel', variant: 'primary' as const, x: '42%', y: '68%', coords: '2FA: NO' },
	{ label: 'Webhooks', variant: 'highlight' as const, x: '12%', y: '72%', coords: 'SIG: NONE' },
];

const RADAR_TARGETS = [
	{ x: 72, y: 28, label: 'API' },
	{ x: 58, y: 62, label: 'DB' },
	{ x: 35, y: 44, label: 'JWT' },
	{ x: 82, y: 70, label: 'S3' },
	{ x: 22, y: 78, label: 'WHK' },
];

const HEATMAP_DATA = [
	[12, 45, 88, 95, 72],
	[8, 38, 76, 91, 68],
	[5, 52, 94, 98, 81],
	[22, 61, 85, 92, 74],
	[3, 28, 55, 78, 90],
];

export default function BreachThreatMap() {
	const [heading, setHeading] = useState(127);
	const [recordsExposed, setRecordsExposed] = useState(0);

	const diagnostics = useMemo(
		() => [
			{ label: 'Superfície de ataque', value: 91, status: 'critical' as const },
			{ label: 'Registros expostos', value: 87, status: 'critical' as const },
			{ label: 'Multa LGPD (est.)', value: 94, status: 'critical' as const },
			{ label: 'Tempo até detecção', value: 78, status: 'warning' as const },
			{ label: 'Bypass de auth', value: 83, status: 'critical' as const },
		],
		[],
	);

	useEffect(() => {
		const headingTimer = setInterval(() => {
			setHeading((prev) => (prev + 7) % 360);
		}, 900);

		const recordsTimer = setInterval(() => {
			setRecordsExposed((prev) => (prev >= 12438 ? 12438 : prev + Math.floor(Math.random() * 800 + 200)));
		}, 1200);

		return () => {
			clearInterval(headingTimer);
			clearInterval(recordsTimer);
		};
	}, []);

	return (
		<div className="ms-breach-map">
			<AnomalyBanner
				title="VAZAMENTO IMINENTE"
				subtitle="SIMULAÇÃO · MICRO SAAS SEM HARDENING"
				className="ms-breach-map__alert"
			/>

			<div className="ms-breach-map__hud">
				<CoordinateDisplay
					heading={heading}
					bearing="NE"
					latitude="-23.5505"
					longitude="-46.6333"
					label="ALVO: SAAS BR · MRR ATIVO"
				/>
				<div className="ms-breach-map__live">
					<span className="ms-breach-map__live-dot" aria-hidden="true" />
					<span>exfiltração simulada ao vivo</span>
				</div>
			</div>

			<div className="ms-breach-map__grid">
				<div className="ms-breach-map__surface encodere-tron-panel">
					<div className="encodere-tron-panel__scanlines" aria-hidden="true" />
					<div className="encodere-tron-panel__content">
						<p className="ms-breach-map__panel-label">mapa de superfície · vetores de ataque</p>
						<div className="ms-breach-map__terrain">
							<div className="ms-breach-map__terrain-grid" aria-hidden="true" />
							{SURFACE_MARKERS.map((marker) => (
								<div
									key={marker.label}
									className="ms-breach-map__marker-slot"
									style={{ left: marker.x, top: marker.y }}
								>
									<MapMarker
										label={marker.label}
										variant={marker.variant}
										coordinates={marker.coords}
										showBeam={marker.variant === 'danger'}
									/>
								</div>
							))}
							<div className="ms-breach-map__radar-wrap">
								<Radar size={140} targets={RADAR_TARGETS} sweepSpeed={2.2} />
							</div>
							<p className="ms-breach-map__terrain-caption">
								Cada ponto vermelho é um caminho real de exfiltração em produtos com 2 devs e zero
								security review.
							</p>
						</div>
					</div>
					<span className="encodere-tron-panel__corner encodere-tron-panel__corner--tl" aria-hidden="true" />
					<span className="encodere-tron-panel__corner encodere-tron-panel__corner--tr" aria-hidden="true" />
					<span className="encodere-tron-panel__corner encodere-tron-panel__corner--bl" aria-hidden="true" />
					<span className="encodere-tron-panel__corner encodere-tron-panel__corner--br" aria-hidden="true" />
				</div>

				<div className="ms-breach-map__metrics">
					<div className="ms-breach-map__gauges">
						<Gauge
							value={89}
							label="Prob. breach 12m"
							unit="%"
							size="sm"
							variant="danger"
						/>
						<Gauge
							value={Math.min(recordsExposed, 12438)}
							max={15000}
							label="Registros vazados"
							size="sm"
							variant="danger"
						/>
						<Gauge value={72} label="Horas p/ ANPD" unit="h" size="sm" variant="warning" />
					</div>
					<DiagnosticsPanel
						title="DIAGNÓSTICO DE EXFILTRAÇÃO"
						status="degraded"
						metrics={diagnostics}
					/>
				</div>
			</div>

			<div className="ms-breach-map__bottom">
				<Heatmap
					data={HEATMAP_DATA}
					rowLabels={['Auth', 'API', 'DB', 'Storage', 'Logs']}
					columnLabels={['Scan', 'Exploit', 'Exfil', 'Dark web', 'Churn']}
					variant="danger"
					label="Intensidade do dano · timeline típica pós-breach (dias)"
					className="ms-breach-map__heatmap"
				/>
				<DataStream
					entries={BREACH_LOG}
					title="LOG DE INCIDENTE · SIMULADO"
					maxVisible={7}
					className="ms-breach-map__stream"
				/>
			</div>

			<p className="ms-breach-map__disclaimer">
				Simulação educativa com dados agregados de incidentes reais em PMEs. Seu produto pode estar
				melhor — ou pior. Faça o diagnóstico abaixo para estimar sua exposição.
			</p>
		</div>
	);
}
