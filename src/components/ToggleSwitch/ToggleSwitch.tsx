import { useState } from 'react';
import styles from './ToggleSwitch.module.css';

interface ToggleSwitchProps {
  active?: boolean;
  onChange: (active: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  active = false,
  onChange,
}) => {
  const activeClass = active ? styles.active : '';

  return (
    <div
      className={`${styles.container} ${activeClass}`}
      onClick={() => onChange(!active)}
    >
      <div className={styles.circle}></div>
    </div>
  );
};

export default ToggleSwitch;
