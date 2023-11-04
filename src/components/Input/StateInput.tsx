import { AnimatePresence, motion } from 'framer-motion';

import styles from './Input.module.css';
import { ChangeEvent } from 'react';

interface InputProps {
  label?: string;
  name?: string;
  error?: any;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute | undefined;
  style?: React.CSSProperties;
  fullWidth?: boolean;
}

const StateInput = ({
  label,
  onChange,
  error,
  type,
  style,
  value,
  fullWidth,
}: InputProps) => {
  return (
    <div
      style={style}
      className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''}`}
    >
      {label && <label className={styles.label}>{label}</label>}
      <input
        onChange={onChange}
        value={value}
        className={`${styles.input}`}
        type={type}
      />
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.errorMessage}
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StateInput;
