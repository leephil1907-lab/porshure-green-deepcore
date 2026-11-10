import { useEffect, useRef } from "react";

/**
 * Scroll-reveal without a scroll library.
 *
 * Adds `is-visible` to every `.reveal` descendant of the returned ref as it
 * enters the viewport. This replaced the previous GSAP ScrollTrigger setup,
 * which could leave content stranded at `opacity: 0` — that bug hid all three
 * pricing cards and most of the review list for real visitors.
 *
 * Content is only ever hidden while an IntersectionObserver is watching it, and
 * reduced-motion / unsupported browsers get everything visible immediately.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    if (targets.length === 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}
