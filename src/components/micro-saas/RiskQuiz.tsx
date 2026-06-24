import { useMemo, useState } from 'react';
import { calculateRisk, formatBRL } from '@/lib/micro-saas/risk-calculator';
import { getTierById } from '@/lib/micro-saas/pricing';
import {
	QUIZ_QUESTIONS,
	type QuizAnswers,
	type QuizField,
	type QuizQuestion,
} from '@/lib/micro-saas/quiz-questions';
import { buildQuizWhatsAppMessage, buildWhatsAppUrl } from '@/lib/micro-saas/whatsapp';

function isStepValid(question: QuizQuestion, answers: QuizAnswers): boolean {
	const value = answers[question.id];

	if (question.type === 'text') {
		return question.required ? Boolean(String(value ?? '').trim()) : true;
	}

	if (question.type === 'single') {
		return typeof value === 'string' && value.length > 0;
	}

	return Array.isArray(value) && value.length > 0;
}

export default function RiskQuiz() {
	const [step, setStep] = useState(0);
	const [answers, setAnswers] = useState<QuizAnswers>({});
	const [finished, setFinished] = useState(false);

	const current = QUIZ_QUESTIONS[step];
	const progress = Math.round(((step + (finished ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100);

	const assessment = useMemo(
		() => (finished ? calculateRisk(answers) : null),
		[finished, answers],
	);

	const recommendedTier = assessment ? getTierById(assessment.recommendedTier) : null;

	const whatsAppUrl = assessment
		? buildWhatsAppUrl(
				buildQuizWhatsAppMessage(assessment.summaryLines, assessment.recommendedTier),
			)
		: null;

	function setSingleAnswer(id: QuizField, value: string) {
		setAnswers((prev) => ({ ...prev, [id]: value }));
	}

	function toggleMultiAnswer(id: QuizField, value: string) {
		setAnswers((prev) => {
			const currentValues = (prev[id] as string[] | undefined) ?? [];
			const hasValue = currentValues.includes(value);

			if (value === 'none') {
				return { ...prev, [id]: hasValue ? [] : ['none'] };
			}

			const withoutNone = currentValues.filter((v) => v !== 'none');
			const next = hasValue
				? withoutNone.filter((v) => v !== value)
				: [...withoutNone, value];

			return { ...prev, [id]: next };
		});
	}

	function handleNext() {
		if (!isStepValid(current, answers)) return;

		if (step >= QUIZ_QUESTIONS.length - 1) {
			setFinished(true);
			return;
		}

		setStep((s) => s + 1);
	}

	function handleBack() {
		if (finished) {
			setFinished(false);
			return;
		}
		setStep((s) => Math.max(0, s - 1));
	}

	function handleRestart() {
		setAnswers({});
		setStep(0);
		setFinished(false);
	}

	if (finished && assessment) {
		return (
			<div className="ms-quiz ms-quiz--result">
				<div
					className="ms-quiz__progress"
					role="progressbar"
					aria-valuenow={100}
					aria-valuemin={0}
					aria-valuemax={100}
				>
					<div className="ms-quiz__progress-bar" style={{ width: '100%' }} />
				</div>

				<p className="encodere-section__eyebrow">seu diagnóstico</p>
				<h2 className="ms-quiz__result-title">
					exposição estimada:{' '}
					<span className={`ms-quiz__risk ms-quiz__risk--${assessment.riskLevel}`}>
						{formatBRL(assessment.annualExposureBRL)}/ano
					</span>
				</h2>

				<div className="ms-quiz__result-grid">
					<div className="ms-quiz__result-card">
						<span className="ms-quiz__result-label">score de risco</span>
						<strong className="ms-quiz__result-value">{assessment.riskScore}/100</strong>
						<span className={`ms-quiz__risk-badge ms-quiz__risk--${assessment.riskLevel}`}>
							{assessment.riskLevel}
						</span>
					</div>
					<div className="ms-quiz__result-card">
						<span className="ms-quiz__result-label">pacote sugerido</span>
						<strong className="ms-quiz__result-value">{recommendedTier?.name}</strong>
						<span className="ms-quiz__result-price">
							{recommendedTier?.price}
							{recommendedTier?.priceNote ?? ''}
						</span>
					</div>
				</div>

				<ul className="ms-quiz__summary">
					{assessment.summaryLines.map((line) => (
						<li key={line}>{line}</li>
					))}
				</ul>

				<p className="ms-quiz__disclaimer">
					Estimativa educativa com base em benchmarks de incidentes em micro SaaS. Não
					substitui auditoria profissional.
				</p>

				<div className="ms-quiz__actions">
					{whatsAppUrl && (
						<a
							className="btn btn--primary btn--lg ms-quiz__whatsapp"
							href={whatsAppUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							enviar diagnóstico no WhatsApp
						</a>
					)}
					<button type="button" className="btn btn--ghost btn--md" onClick={handleRestart}>
						refazer trivia
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="ms-quiz">
			<div
				className="ms-quiz__progress"
				role="progressbar"
				aria-valuenow={progress}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label={`Progresso do diagnóstico: ${progress}%`}
			>
				<div className="ms-quiz__progress-bar" style={{ width: `${progress}%` }} />
			</div>

			<p className="ms-quiz__step-meta">
				pergunta {step + 1} de {QUIZ_QUESTIONS.length}
			</p>

			<fieldset className="ms-quiz__fieldset">
				<legend className="ms-quiz__question">{current.question}</legend>
				{current.helper && <p className="ms-quiz__helper">{current.helper}</p>}

				{current.type === 'text' && (
					<input
						className="ms-quiz__input"
						type="text"
						value={(answers[current.id] as string) ?? ''}
						onChange={(e) => setSingleAnswer(current.id, e.target.value)}
						placeholder="Ex.: TaskFlow, NotionClone..."
						aria-label={current.question}
					/>
				)}

				{current.type === 'single' && (
					<div className="ms-quiz__options" role="radiogroup" aria-label={current.question}>
						{current.options?.map((option) => (
							<label key={option.value} className="ms-quiz__option">
								<input
									type="radio"
									name={current.id}
									value={option.value}
									checked={answers[current.id] === option.value}
									onChange={() => setSingleAnswer(current.id, option.value)}
								/>
								<span>{option.label}</span>
							</label>
						))}
					</div>
				)}

				{current.type === 'multi' && (
					<div className="ms-quiz__options" role="group" aria-label={current.question}>
						{current.options?.map((option) => {
							const selected = ((answers[current.id] as string[]) ?? []).includes(option.value);
							return (
								<label key={option.value} className="ms-quiz__option">
									<input
										type="checkbox"
										value={option.value}
										checked={selected}
										onChange={() => toggleMultiAnswer(current.id, option.value)}
									/>
									<span>{option.label}</span>
								</label>
							);
						})}
					</div>
				)}
			</fieldset>

			<div className="ms-quiz__actions">
				{step > 0 && (
					<button type="button" className="btn btn--ghost btn--md" onClick={handleBack}>
						voltar
					</button>
				)}
				<button
					type="button"
					className="btn btn--primary btn--md"
					onClick={handleNext}
					disabled={!isStepValid(current, answers)}
				>
					{step >= QUIZ_QUESTIONS.length - 1 ? 'ver diagnóstico' : 'próxima'}
				</button>
			</div>
		</div>
	);
}
