import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FloatingPaper } from "./floating-paper";
import { useServicesData } from "../hooks/useServicesData";
import { StatsSectionSkeleton } from "./skeletons";

interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

// Hook personalizado para animar números
const useCountUp = (
  end: number,
  duration: number = 2000,
  start: number = 0,
  isInView: boolean,
) => {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);

  useEffect(() => {
    if (!isInView) {
      setCount(start);
      countRef.current = start;
      return;
    }

    const startTime = Date.now();
    const startValue = countRef.current;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Función de easing (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentCount = Math.floor(
        startValue + (end - startValue) * easeOut,
      );
      setCount(currentCount);
      countRef.current = currentCount;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
        countRef.current = end;
      }
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start, isInView]);

  return count;
};

// Componente para cada tarjeta de estadística
const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCountUp(stat.value, 2000, 0, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="flex items-baseline justify-center gap-2 mb-4">
        <motion.span
          key={count}
          initial={{ scale: 1.2, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-cyan-400"
        >
          {count}
        </motion.span>
        {stat.suffix && (
          <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {stat.suffix}
          </span>
        )}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
        className="text-white text-sm md:text-base lg:text-lg uppercase tracking-wide"
      >
        {stat.label}
      </motion.p>
    </motion.div>
  );
};

export default function ProjectsStatsSection() {
  const { data, loading } = useServicesData();
  const stats: Stat[] = data.stats.items as Stat[];

  if (loading) {
    return <StatsSectionSkeleton />;
  }

  return (
    <section className="relative py-20 px-6 min-h-[500px]">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Título de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {data.stats.titlePart1} <span className="text-gradient">{data.stats.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* Grid de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
