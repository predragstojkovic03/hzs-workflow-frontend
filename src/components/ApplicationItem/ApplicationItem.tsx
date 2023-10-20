import { motion } from 'framer-motion';

import styles from './ApplicationItem.module.css';

interface ApplicationItemProps {
  position: number;
  teamName: string;
  captainName: string;
  captainEmail?: string;
  captainPhone: string;
  points?: number | string;
}

const spring = {
  type: 'spring',
  damping: 25,
  stiffness: 120,
};

const ApplicationItem = ({
  position,
  teamName,
  captainName,
  // captainEmail,
  captainPhone,
  points = '/',
}: ApplicationItemProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: position * 0.05 } }}
      transition={spring}
      className={styles.wrapper}
    >
      <div className={styles.element}>#{position}</div>
      <div className={styles.element}>{teamName}</div>
      <div
        // onClick={handleNameClick}
        className={`${styles.element} ${styles.name}`}
      >
        {captainName}
      </div>
      <div className={styles.element}>{captainPhone}</div>
      <div className={`${styles.element} ${styles.points}`}>{points} poena</div>
    </motion.div>
  );
};

export default ApplicationItem;
