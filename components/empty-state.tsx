"use client";

import { motion } from "framer-motion";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      {icon && <div className="flex justify-center mb-4">{icon}</div>}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-6">{description}</p>
      )}
      {action && action}
    </motion.div>
  );
}
