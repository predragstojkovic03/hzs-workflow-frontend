import { AnimatePresence, motion } from 'framer-motion';

import styles from './Input.module.css';

interface InputProps {
  label: string;
  name: string;
  register: any;
  error: any;
  type?: React.HTMLInputTypeAttribute | undefined;
}

const Input = ({ label, name, register, error, type }: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <input className={styles.input} type={type} {...register(name)} />
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

export default Input;
