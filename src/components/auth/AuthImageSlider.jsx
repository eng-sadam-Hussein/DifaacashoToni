import { useEffect, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  FileKey2,
  FolderLock,
  ShieldCheck,
  Shield,
} from "lucide-react";

const slides = [
  {
    id: "encryption",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=85",
    label: "Enterprise File Security",
    title: "Protect every corporate file.",
    description:
      "Encrypt sensitive information and protect it throughout storage, access, download, and sharing.",
    icon: FolderLock,
    metric: "AES-256",
    metricLabel: "Enterprise encryption",
  },
  {
    id: "sharing",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=85",
    label: "Controlled Collaboration",
    title: "Share files with complete control.",
    description:
      "Apply recipient permissions, expiration dates, approval workflows, OTP verification, and download restrictions.",
    icon: FileKey2,
    metric: "24/7",
    metricLabel: "Security monitoring",
  },
  {
    id: "monitoring",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85",
    label: "Corporate Data Protection",
    title: "Monitor every security event.",
    description:
      "Track authentication, file access, downloads, secure links, administrative actions, and suspicious activity.",
    icon: Shield,
    metric: "100%",
    metricLabel: "Activity visibility",
  },
];

export default function AuthImageSlider() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [failedImages, setFailedImages] =
    useState({});

  const activeSlide = slides[activeIndex];
  const ActiveIcon = activeSlide.icon;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        currentIndex === slides.length - 1
          ? 0
          : currentIndex + 1
      );
    }, 6500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const showPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0
        ? slides.length - 1
        : currentIndex - 1
    );
  };

  const showNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === slides.length - 1
        ? 0
        : currentIndex + 1
    );
  };

  return (
    <section className="relative hidden h-full min-h-0 overflow-hidden bg-slate-950 lg:block">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition duration-1000 ${
            index === activeIndex
              ? "scale-100 opacity-100"
              : "scale-105 opacity-0"
          }`}
        >
          {!failedImages[slide.id] ? (
            <img
              src={slide.image}
              alt=""
              onError={() =>
                setFailedImages((current) => ({
                  ...current,
                  [slide.id]: true,
                }))
              }
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
          )}
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/30" />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/30" />

      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="absolute -bottom-40 right-0 h-[450px] w-[450px] rounded-full bg-green-500/15 blur-3xl" />

      <div className="relative z-10 flex h-full min-h-0 flex-col px-10 py-8 xl:px-14 xl:py-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-xl backdrop-blur-md">
              <FolderLock size={25} />
            </div>

            <div>
              <p className="font-bold text-white">
                AFESS SecureShare
              </p>

              <p className="text-xs text-white/55">
                Corporate Data Protection
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur-md">
            <ShieldCheck
              size={16}
              className="text-green-400"
            />

            Secure Environment
          </div>
        </header>

        <div className="my-auto max-w-2xl">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur-md">
            <ActiveIcon size={28} />
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-300">
            {activeSlide.label}
          </p>

          <h2 className="mt-4 max-w-xl text-4xl font-bold leading-[1.12] tracking-tight text-white xl:text-5xl">
            {activeSlide.title}
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
            {activeSlide.description}
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-2 gap-4">
            <article className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <p className="text-2xl font-bold text-white">
                {activeSlide.metric}
              </p>

              <p className="mt-1 text-xs text-white/55">
                {activeSlide.metricLabel}
              </p>
            </article>

            <article className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={20}
                  className="text-green-400"
                />

                <p className="font-semibold text-white">
                  System Protected
                </p>
              </div>

              <p className="mt-2 text-xs leading-5 text-white/55">
                Authentication, encryption, permissions and
                monitoring controls are enabled.
              </p>
            </article>
          </div>
        </div>

        <footer className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() =>
                    setActiveIndex(index)
                  }
                  aria-label={`Open slide ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-10 bg-white"
                      : "w-4 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            <p className="mt-4 text-xs text-white/45">
              Automated File Encryption and Secure Sharing System
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={showNext}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}