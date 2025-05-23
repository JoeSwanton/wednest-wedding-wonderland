
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface QuestionContainerProps {
  question: string;
  description?: string;
  children: ReactNode;
  icon?: ReactNode;
}

export const QuestionContainer = ({ question, description, children, icon }: QuestionContainerProps) => {
  return (
    <div className="flex flex-col h-full py-8">
      <div className="flex items-center gap-3 mb-6">
        {icon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex-shrink-0"
          >
            {icon}
          </motion.div>
        )}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-serif text-theme-brown leading-tight"
        >
          {question}
        </motion.h2>
      </div>
      
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-theme-text-secondary mb-6 text-lg leading-relaxed"
        >
          {description}
        </motion.p>
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex-1"
      >
        {children}
      </motion.div>
    </div>
  );
};
