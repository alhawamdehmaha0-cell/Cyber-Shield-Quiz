import { useState, useMemo } from "react";
import { questions, type Difficulty } from "./data/questions";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Trophy,
  Lock,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

type Phase = "intro" | "difficulty" | "quiz" | "result";

const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { label: string; icon: string; color: string; borderColor: string; bgColor: string; description: string; tag: string }
> = {
  beginner: {
    label: "مبتدئ",
    icon: "🌱",
    color: "text-emerald-400",
    borderColor: "border-emerald-500/40",
    bgColor: "bg-emerald-500/10",
    description: "أساسيات الأمن الرقمي — مثالي للبدء",
    tag: "9 أسئلة",
  },
  intermediate: {
    label: "متوسط",
    icon: "⚡",
    color: "text-yellow-400",
    borderColor: "border-yellow-500/40",
    bgColor: "bg-yellow-500/10",
    description: "هجمات معروفة وأساليب حماية أعمق",
    tag: "9 أسئلة",
  },
  advanced: {
    label: "متقدم",
    icon: "🔴",
    color: "text-rose-400",
    borderColor: "border-rose-500/40",
    bgColor: "bg-rose-500/10",
    description: "تقنيات هجوم متقدمة ومفاهيم احترافية",
    tag: "9 أسئلة",
  },
};

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = (current / total) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-cyber-muted mb-2">
        <span>
          السؤال {current + 1} من {total}
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-2 rounded-full bg-cyber-surface overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyber-green to-cyber-cyan"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-cyber-green/10 text-cyber-green border border-cyber-green/20">
      <Lock size={10} />
      {category}
    </span>
  );
}

function IntroScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center gap-8 py-8"
    >
      <div className="relative">
        <div className="w-28 h-28 rounded-full bg-cyber-green/10 border border-cyber-green/30 flex items-center justify-center">
          <Shield size={56} className="text-cyber-green" strokeWidth={1.5} />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-cyber-cyan/20 border border-cyber-cyan/40 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-white leading-tight">
          اختبار الأمن السيبراني
        </h1>
        <p className="text-cyber-muted text-base max-w-sm leading-relaxed">
          اختبر معلوماتك في أساسيات الأمن الرقمي وحماية نفسك على الإنترنت
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
        {[
          { icon: "❓", label: "27 سؤالاً" },
          { icon: "🏷️", label: "3 مستويات" },
          { icon: "📖", label: "شرح تفصيلي" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-cyber-surface border border-cyber-border rounded-xl p-3 text-center"
          >
            <div className="text-2xl mb-1">{item.icon}</div>
            <div className="text-xs text-cyber-muted">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-cyber-surface border border-cyber-border rounded-xl p-4 w-full max-w-sm text-right">
        <p className="text-xs text-cyber-muted leading-relaxed">
          <span className="text-cyber-cyan font-medium">المواضيع المشمولة: </span>
          كلمات المرور · التصيّد الاحتيالي · البرامج الخبيثة · التصفح الآمن ·
          الهندسة الاجتماعية
        </p>
      </div>

      <button
        onClick={onNext}
        className="cyber-btn w-full max-w-sm py-4 text-lg font-bold rounded-xl flex items-center justify-center gap-2"
      >
        <span>ابدأ الاختبار</span>
        <ChevronRight size={20} className="rotate-180" />
      </button>
    </motion.div>
  );
}

function DifficultyScreen({
  onSelect,
  onBack,
}: {
  onSelect: (d: Difficulty) => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-8 py-4"
    >
      <div className="space-y-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-cyber-muted text-sm hover:text-white transition-colors"
        >
          <ArrowRight size={14} />
          <span>رجوع</span>
        </button>
        <h2 className="text-2xl font-bold text-white">اختر مستوى الصعوبة</h2>
        <p className="text-cyber-muted text-sm">
          كل مستوى يحتوي على أسئلة مختلفة تناسب مستوى معرفتك
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {(["beginner", "intermediate", "advanced"] as Difficulty[]).map(
          (level, i) => {
            const cfg = DIFFICULTY_CONFIG[level];
            return (
              <motion.button
                key={level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(level)}
                className={`w-full text-right p-5 rounded-2xl border ${cfg.borderColor} ${cfg.bgColor} bg-opacity-10 transition-all duration-200 group cursor-pointer`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border ${cfg.borderColor} bg-cyber-bg/60`}
                    >
                      {cfg.icon}
                    </div>
                    <div className="text-right">
                      <div className={`font-bold text-lg ${cfg.color}`}>
                        {cfg.label}
                      </div>
                      <div className="text-cyber-muted text-sm mt-0.5">
                        {cfg.description}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${cfg.borderColor} ${cfg.color}`}
                    >
                      {cfg.tag}
                    </span>
                    <ChevronRight
                      size={18}
                      className={`${cfg.color} opacity-60 group-hover:opacity-100 rotate-180 transition-opacity`}
                    />
                  </div>
                </div>
              </motion.button>
            );
          }
        )}
      </div>
    </motion.div>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const cfg = DIFFICULTY_CONFIG[difficulty];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.borderColor} ${cfg.color} bg-transparent`}
    >
      {cfg.icon} {cfg.label}
    </span>
  );
}

function QuizScreen({
  questionIndex,
  filteredQuestions,
  difficulty,
  onAnswer,
}: {
  questionIndex: number;
  filteredQuestions: typeof questions;
  difficulty: Difficulty;
  onAnswer: (correct: boolean) => void;
}) {
  const q = filteredQuestions[questionIndex];
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
  };

  const getOptionClass = (i: number) => {
    if (!answered) return "option-btn";
    if (i === q.correctIndex) return "option-btn option-correct";
    if (i === selected && i !== q.correctIndex) return "option-btn option-wrong";
    return "option-btn option-dim";
  };

  const isCorrect = selected === q.correctIndex;

  return (
    <motion.div
      key={questionIndex}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-6"
    >
      <ProgressBar current={questionIndex} total={filteredQuestions.length} />

      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <CategoryBadge category={q.category} />
          <DifficultyBadge difficulty={difficulty} />
        </div>
        <h2 className="text-xl font-bold text-white leading-relaxed">
          {q.question}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {q.options.map((opt, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: answered ? 1 : 0.98 }}
            onClick={() => handleSelect(i)}
            className={getOptionClass(i)}
          >
            <span className="option-label">{["أ", "ب", "ج", "د"][i]}</span>
            <span className="flex-1 text-right">{opt}</span>
            {answered && i === q.correctIndex && (
              <CheckCircle2 size={18} className="text-cyber-green shrink-0" />
            )}
            {answered && i === selected && i !== q.correctIndex && (
              <XCircle size={18} className="text-cyber-red shrink-0" />
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`rounded-xl p-4 border ${
              isCorrect
                ? "bg-cyber-green/10 border-cyber-green/30"
                : "bg-cyber-red/10 border-cyber-red/30"
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2
                  size={20}
                  className="text-cyber-green shrink-0 mt-0.5"
                />
              ) : (
                <AlertTriangle
                  size={20}
                  className="text-cyber-red shrink-0 mt-0.5"
                />
              )}
              <div className="space-y-1">
                <p
                  className={`font-bold text-sm ${isCorrect ? "text-cyber-green" : "text-cyber-red"}`}
                >
                  {isCorrect ? "إجابة صحيحة!" : "إجابة خاطئة"}
                </p>
                <p className="text-cyber-muted text-sm leading-relaxed">
                  {q.explanation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {answered && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => onAnswer(isCorrect)}
          className="cyber-btn py-3.5 rounded-xl font-bold flex items-center justify-center gap-2"
        >
          {questionIndex < filteredQuestions.length - 1 ? (
            <>
              <span>السؤال التالي</span>
              <ChevronRight size={18} className="rotate-180" />
            </>
          ) : (
            <span>عرض النتائج</span>
          )}
        </motion.button>
      )}
    </motion.div>
  );
}

function ResultScreen({
  score,
  total,
  difficulty,
  onRestart,
  onChangeDifficulty,
}: {
  score: number;
  total: number;
  difficulty: Difficulty;
  onRestart: () => void;
  onChangeDifficulty: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const cfg = DIFFICULTY_CONFIG[difficulty];

  const getMessage = () => {
    if (pct >= 90)
      return { text: "ممتاز! أنت خبير في الأمن السيبراني", color: "text-cyber-cyan" };
    if (pct >= 70)
      return { text: "جيد جداً! معرفتك بالأمن السيبراني قوية", color: "text-cyber-green" };
    if (pct >= 50)
      return { text: "مقبول، لكن ثمة مجال للتحسين", color: "text-yellow-400" };
    return { text: "يحتاج تحسين — راجع المواضيع وحاول مجدداً", color: "text-cyber-red" };
  };

  const msg = getMessage();
  const circumference = 2 * Math.PI * 45;
  const strokeDash = circumference - (pct / 100) * circumference;
  const ringColor = pct >= 70 ? "#00d4aa" : pct >= 50 ? "#fbbf24" : "#f87171";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-8 py-6"
    >
      <div className="relative flex items-center justify-center w-36 h-36">
        <svg
          className="absolute inset-0 -rotate-90"
          width="144"
          height="144"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="6"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={ringColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: strokeDash }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <div className="text-center">
          <div className="text-3xl font-bold text-white">{pct}%</div>
          <div className="text-xs text-cyber-muted">النتيجة</div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Trophy size={24} className="text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">اكتملت النتائج</h2>
        </div>
        <div className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border ${cfg.borderColor} ${cfg.color}`}>
          {cfg.icon} مستوى {cfg.label}
        </div>
        <p className={`font-semibold text-base mt-2 ${msg.color}`}>{msg.text}</p>
        <p className="text-cyber-muted text-sm">
          أجبت بشكل صحيح على{" "}
          <span className="text-white font-bold">{score}</span> من{" "}
          <span className="text-white font-bold">{total}</span> سؤالاً
        </p>
      </div>

      <div className="w-full grid grid-cols-2 gap-3 max-w-xs">
        <div className="bg-cyber-surface border border-cyber-green/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-cyber-green">{score}</div>
          <div className="text-xs text-cyber-muted mt-1">صحيحة</div>
        </div>
        <div className="bg-cyber-surface border border-cyber-red/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-cyber-red">{total - score}</div>
          <div className="text-xs text-cyber-muted mt-1">خاطئة</div>
        </div>
      </div>

      <div className="w-full max-w-xs space-y-3">
        <button
          onClick={onRestart}
          className="cyber-btn w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} />
          <span>إعادة نفس المستوى</span>
        </button>
        <button
          onClick={onChangeDifficulty}
          className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 border border-cyber-border text-cyber-muted hover:text-white hover:border-white/20 transition-colors"
        >
          <span>تغيير المستوى</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const filteredQuestions = useMemo(
    () => questions.filter((q) => q.difficulty === difficulty),
    [difficulty]
  );

  const handleSelectDifficulty = (d: Difficulty) => {
    setDifficulty(d);
    setQuestionIndex(0);
    setScore(0);
    setPhase("quiz");
  };

  const handleAnswer = (correct: boolean) => {
    const newScore = correct ? score + 1 : score;
    if (questionIndex < filteredQuestions.length - 1) {
      setScore(newScore);
      setQuestionIndex((i) => i + 1);
    } else {
      setScore(newScore);
      setPhase("result");
    }
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setScore(0);
    setPhase("quiz");
  };

  const handleChangeDifficulty = () => {
    setQuestionIndex(0);
    setScore(0);
    setPhase("difficulty");
  };

  return (
    <div className="min-h-screen bg-cyber-bg text-white font-arabic" dir="rtl">
      <div className="grid-overlay" />
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="border-b border-cyber-border px-4 py-3 flex items-center gap-2">
          <Shield size={20} className="text-cyber-green" />
          <span className="text-sm font-bold text-cyber-green tracking-widest uppercase">
            CyberSec Quiz
          </span>
          {(phase === "quiz" || phase === "result") && (
            <span
              className={`mr-auto text-xs px-2 py-0.5 rounded-full border ${DIFFICULTY_CONFIG[difficulty].borderColor} ${DIFFICULTY_CONFIG[difficulty].color}`}
            >
              {DIFFICULTY_CONFIG[difficulty].icon} {DIFFICULTY_CONFIG[difficulty].label}
            </span>
          )}
        </header>

        <main className="flex-1 flex items-start justify-center px-4 py-6">
          <div className="w-full max-w-lg">
            <AnimatePresence mode="wait">
              {phase === "intro" && (
                <IntroScreen key="intro" onNext={() => setPhase("difficulty")} />
              )}
              {phase === "difficulty" && (
                <DifficultyScreen
                  key="difficulty"
                  onSelect={handleSelectDifficulty}
                  onBack={() => setPhase("intro")}
                />
              )}
              {phase === "quiz" && (
                <QuizScreen
                  key={`quiz-${questionIndex}`}
                  questionIndex={questionIndex}
                  filteredQuestions={filteredQuestions}
                  difficulty={difficulty}
                  onAnswer={handleAnswer}
                />
              )}
              {phase === "result" && (
                <ResultScreen
                  key="result"
                  score={score}
                  total={filteredQuestions.length}
                  difficulty={difficulty}
                  onRestart={handleRestart}
                  onChangeDifficulty={handleChangeDifficulty}
                />
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
