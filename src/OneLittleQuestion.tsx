import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import backgroundUrl from "./assets/background.svg";
import gifMain from "./assets/gif-main.gif";
import gifYes from "./assets/gif-yes.gif";
import gifIntro from "./assets/gif-intro.gif";
import bgMusic from "./assets/bg-music.mp3";

const bgAudio = new Audio(bgMusic);
bgAudio.loop = true;
bgAudio.volume = 0.35;

let audioUnlocked = false;

function ensureMusicPlaying() {
  if (audioUnlocked) return;

  bgAudio
    .play()
    .then(() => {
      audioUnlocked = true;
    })
    .catch(() => {
      // still locked by browser — silently ignore
    });
}

function IntroScreen({ onDone }: { onDone: () => void }) {
  const [showHello, setShowHello] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [canContinue, setCanContinue] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowHello(true), 2000);
    const t2 = setTimeout(() => {
      setShowLoading(true);
      setShowGif(true);
      ensureMusicPlaying();
    }, 4000);
    const t3 = setTimeout(() => {
      setShowLoading(false);
      setShowHint(true);
      setCanContinue(true);
    }, 7000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-rose-200 via-pink-300 to-rose-400"
      onClick={() => {
        if (!canContinue) return;
        ensureMusicPlaying(); // unlocks audio if needed
        onDone();
      }}
    >
      {/* Center text */}
      <div className="relative z-10 text-center">
        <AnimatePresence>
          {showHello && (
            <motion.h1
              key="hello"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="mb-3 text-3xl font-bold text-rose-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.9)] drop-shadow-[0_-1px_0_rgba(255,255,255,0.9)] drop-shadow-[1px_0_0_rgba(255,255,255,0.9)] drop-shadow-[-1px_0_0_rgba(255,255,255,0.9)]"
            >
              Hello Narcisa
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showLoading && (
            <motion.p
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-sm text-rose-900"
            >
              Please wait… your page is being loaded...
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showHint && (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="mt-4 text-xs text-rose-900"
            >
              please tap anywhere to continue...
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom GIF */}
      <AnimatePresence>
        {showGif && (
          <motion.div
            key="intro-gif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute bottom-4 flex w-full justify-center pointer-events-none"
          >
            <img
              src={gifIntro}
              alt="Intro"
              className="h-40 w-auto object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Confetti() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, opacity: 1 }}
          animate={{ y: "110vh", rotate: 360, opacity: 0 }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: "easeOut",
          }}
          className="absolute top-0 h-3 w-3 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: ["#fb7185", "#f472b6", "#facc15", "#4ade80"][
              Math.floor(Math.random() * 4)
            ],
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!started ? (
        <motion.div key="intro" exit={{ opacity: 0 }} transition={{ duration: 1 }}>
          <IntroScreen onDone={() => setStarted(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <OneLittleQuestion />
        </motion.div>
      )}
    </AnimatePresence>
  );
}


function OneLittleQuestion() {
  const noSteps: string[] = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Are you positive?",
    "Pookie please...",
    "Just think about it",
    "If you say no, I will be really sad",
    "I will be very sad",
    "I will be very very very sad...",
  ];

  const maxSteps = noSteps.length - 1;

  const [step, setStep] = useState<number>(0);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [viewport, setViewport] = useState<{ width: number; height: number }>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const update = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleNo = () => {
    setStep((s) => Math.min(s + 1, maxSteps));
  };

  const progress = Math.min(step / maxSteps, 1);

  const safeWidth = viewport.width || 360;
  const safeHeight = viewport.height || 640;

  const yesWidth = 160 + progress * Math.max(0, safeWidth - 160);
  const yesHeight = 60 + progress * (safeHeight * 0.6);

  const stackButtons = progress > 0.35;

  const baseNoHeight = 56;
  const baseNoWidth = 140;

  const noHeight = stackButtons ? baseNoHeight : baseNoHeight + step * 10;
  const noWidth = stackButtons
    ? Math.min(260, baseNoWidth + step * 20)
    : Math.max(80, baseNoWidth - step * 10);

  const hideNoButton = step >= maxSteps;

  const buttonsHeight =
    stackButtons && !hideNoButton ? yesHeight + noHeight + 8 : yesHeight;

  const isMobile = viewport.width < 640;

  const buttonsTop = isMobile ? 112 : 144;
  const titleGap = isMobile ? 12 : 20;
  const titleHeight = viewport.width < 640 ? 32 : viewport.width < 768 ? 40 : 48;
  const gifGap = isMobile ? (step < 3 ? 64 : 40) : 12;

  if (accepted) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-pink-100 p-6 overflow-hidden select-none">
        <Confetti />

        <div className="fixed inset-0 -z-10 pointer-events-none">
          <img
            src={backgroundUrl}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <h1 className="mb-6 text-4xl font-bold text-rose-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.9)] drop-shadow-[0_-1px_0_rgba(255,255,255,0.9)] drop-shadow-[1px_0_0_rgba(255,255,255,0.9)] drop-shadow-[-1px_0_0_rgba(255,255,255,0.9)]">
          Knew you would say yes 💖
        </h1>
        <div className="flex h-64 w-full max-w-sm items-center justify-center rounded-2xl">
          <img
            src={gifYes}
            alt="Celebration"
            className="h-full w-full object-contain rounded-2xl"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-pink-50 select-none">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <img
          src={backgroundUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <motion.h1
        animate={{
          top: buttonsTop - titleGap - titleHeight,
          scale: 1 - progress * 0.15,
        }}
        transition={{ type: "spring", stiffness: 140 }}
        className="absolute left-0 right-0 text-center font-bold text-2xl sm:text-3xl md:text-4xl text-rose-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.9)] drop-shadow-[0_-1px_0_rgba(255,255,255,0.9)] drop-shadow-[1px_0_0_rgba(255,255,255,0.9)] drop-shadow-[-1px_0_0_rgba(255,255,255,0.9)]"
      >
        Will you go on a date with me?
      </motion.h1>

      <motion.div
        animate={{
          flexDirection: stackButtons ? "column" : "row",
          gap: stackButtons ? 8 : 24,
        }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
        className="absolute left-1/2 top-36 flex -translate-x-1/2 items-center"
      >
        <motion.button
          animate={{ width: yesWidth, height: yesHeight }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          onClick={() => setAccepted(true)}
          className="flex items-center justify-center rounded-xl bg-green-500/70 text-lg font-bold text-white"
        >
          Yes
        </motion.button>

        {!hideNoButton && (
          <motion.button
            animate={{ width: noWidth, height: noHeight }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            onClick={handleNo}
            className="max-w-[180px] break-words rounded-xl bg-red-500/70 px-3 py-2 text-center text-sm font-semibold leading-snug text-white"
          >
            {noSteps[step]}
          </motion.button>
        )}
      </motion.div>

      <motion.div
        animate={{
          top: buttonsTop + buttonsHeight + gifGap,
          scale: 1 - progress * 0.2,
        }}
        transition={{ type: "spring", stiffness: 120 }}
        className="absolute left-1/2 flex h-60 w-60 max-w-md -translate-x-1/2 items-center justify-center rounded-2xl"
      >
        <img
          src={gifMain}
          alt="OneLittleQuestion"
          className="h-full w-full object-contain rounded-2xl"
        />
      </motion.div>
    </div>
  );
}
