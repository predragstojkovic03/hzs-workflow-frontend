import { motion } from 'framer-motion';

import styles from './SidebarItem.module.css';

const SidebarItem = ({ icon, text, i, onClick, type }: any) => {
  const itemVariants = {
    closed: {
      opacity: 0,
    },
    open: { opacity: 1 },
  };

  const getType = () => {
    switch (type) {
      case 'gray':
        return styles.gray;

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial='closed'
      animate='open'
      exit='closed'
      variants={itemVariants}
      transition={{ delay: 0.1 * i }}
      className={styles.wrapper}
    >
      <button className={`${styles.button} ${getType()}`} onClick={onClick}>
        {icon}{' '}
        {text && (
          <motion.p
            initial='closed'
            animate='open'
            exit='closed'
            variants={itemVariants}
            className={styles.text}
          >
            {text}
          </motion.p>
        )}
      </button>
    </motion.div>
  );
};

export default SidebarItem;
