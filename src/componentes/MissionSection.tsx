import { motion } from "framer-motion";
import { FloatingPaper } from "./floating-paper";

export interface MissionContent {
  title: string;
  paragraph1: string;
  paragraph2: string;
}

interface MissionSectionProps {
  mission: MissionContent | null | undefined;
}

export default function MissionSection({ mission }: MissionSectionProps) {
  if (!mission?.title) return null;

  return (
    <section className="relative w-full text-white">
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient text-center mb-12"
          >
            {mission.title}
          </motion.h2>

          <div className="space-y-6 text-left">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white text-lg md:text-xl leading-relaxed"
            >
              {mission.paragraph1}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white text-lg md:text-xl leading-relaxed"
            >
              {mission.paragraph2}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
