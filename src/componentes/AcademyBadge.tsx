import { motion } from "framer-motion";

interface AcademyBadgeProps {
  image: string;
  level: string;
  delay?: number;
}

export default function AcademyBadge({ image, level, delay = 0 }: AcademyBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="overflow-hidden rounded-xl shadow-lg"
    >
      <img
        src={image}
        alt={`Make Academy - ${level}`}
        className="w-full h-auto object-cover aspect-[4/5]"
      />
    </motion.div>
  );
}
