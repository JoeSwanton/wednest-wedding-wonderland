
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface QuestionContainerProps {
  question: string;
  description?: string;
  children: ReactNode;
}

export const QuestionContainer = ({ question, description, children }: QuestionContainerProps) => {
  return (
    <div className="flex flex-col h-full">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-serif text-wednest-brown mb-2"
      >
        {question}
      </motion.h2>
      
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-wednest-brown-light mb-6"
        >
          {description}
        </motion.p>
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-1"
      >
        {children}
      </motion.div>
    </div>
  );
};
