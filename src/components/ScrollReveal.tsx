import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  id?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.5,
  distance = 30,
  className = '',
  id
}) => {
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, suppress vertical/lateral translation
  const actualDistance = shouldReduceMotion ? 0 : distance;

  const variants = {
    hidden: {
      opacity: 0,
      y: variant === 'fade-up' ? actualDistance : 0,
      x: variant === 'fade-left' ? actualDistance : variant === 'fade-right' ? -actualDistance : 0,
      scale: variant === 'scale' ? (shouldReduceMotion ? 1 : 0.96) : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 75,
        damping: 18,
        duration: duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants as any}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  delayChildren?: number;
  staggerDelay?: number;
  className?: string;
  id?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  delayChildren = 0,
  staggerDelay = 0.08,
  className = '',
  id
}) => {
  const variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren,
      },
    },
  };

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants as any}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-in' | 'scale';
  distance?: number;
  duration?: number;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  variant = 'fade-up',
  distance = 20,
  duration = 0.4,
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();
  const actualDistance = shouldReduceMotion ? 0 : distance;

  const variants = {
    hidden: {
      opacity: 0,
      y: variant === 'fade-up' ? actualDistance : 0,
      scale: variant === 'scale' ? (shouldReduceMotion ? 1 : 0.97) : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 75,
        damping: 18,
        duration: duration,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.div variants={variants as any} className={className}>
      {children}
    </motion.div>
  );
};
