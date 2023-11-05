import { motion } from 'framer-motion';

import styles from './ApplicationItem.module.css';
import { useNavigate } from 'react-router-dom';
import StateInput from '../Input/StateInput';
import { Tooltip } from 'react-tooltip';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gradeApplication } from '../../lib/api/applications';
import { useUser } from '../../lib/auth';
import { useEffect, useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

interface ApplicationItemProps {
  _id: any;
  position: number;
  teamName: string;
  captainName: string;
  captainEmail?: string;
  captainPhone: string;
  moodlePoints: number;
  workshopPoints: number;
  points?: number | string;
  isMainQueryLoading: boolean;
  onSwitchToggle?: (value: boolean) => void;
  switchActive?: boolean;
}

const spring = {
  type: 'spring',
  damping: 25,
  stiffness: 120,
};

const ApplicationItem = ({
  _id,
  position,
  teamName,
  captainName,
  captainEmail,
  captainPhone,
  moodlePoints,
  workshopPoints,
  points = '/',
  onSwitchToggle,
  switchActive,
}: // isMainQueryLoading,
ApplicationItemProps) => {
  const navigate = useNavigate();

  const user = useUser();

  const [isTimeout, setIsTimeout] = useState(false);
  const [moodleInput, setMoodleInput] = useState(moodlePoints);
  const [workshopInput, setWorkshopInput] = useState(workshopPoints);
  // const isMounted = useRef(false);

  const queryClient = useQueryClient();

  const applicationMutation = useMutation({
    mutationKey: ['applications', _id],
    mutationFn: gradeApplication,
    onSettled: () => {
      queryClient.invalidateQueries(['applications', _id]);
      queryClient.invalidateQueries(['applications']);
      setIsTimeout(false);
    },
  });

  useEffect(() => {
    // if (!isMounted.current) return;

    // isMounted.current = true;

    setIsTimeout(true);
    const timeout = setTimeout(() => {
      applicationMutation.mutate({
        id: _id,
        grades: { moodle: moodleInput, workshop: workshopInput },
        userData: user.data,
      });
    }, 1200);

    return () => clearTimeout(timeout);
  }, [moodleInput, workshopInput]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: position * 0.05 } }}
      transition={spring}
      className={styles.wrapper}
    >
      <div className={styles.element}>#{position}</div>
      <div
        onClick={() => navigate(`/prijave/${_id}`)}
        className={`${styles.element} ${styles.teamName}`}
      >
        {teamName}
      </div>
      <div
        // onClick={handleNameClick}
        className={`${styles.element} ${styles.name}`}
      >
        {captainName}
      </div>
      <div className={styles.element}>{captainPhone}</div>
      <div className={styles.element}>{captainEmail}</div>
      <Tooltip id='moodle-tooltip' />
      <div data-tooltip-id='moodle-tooltip' data-tooltip-content='Moodle'>
        <StateInput
          style={{ width: '100px' }}
          onChange={(e) => setMoodleInput(Number(e.target.value))}
          value={moodleInput}
        />
      </div>
      <Tooltip id='workshops-tooltip' />
      <div data-tooltip-id='workshops-tooltip' data-tooltip-content='Radionice'>
        <StateInput
          style={{ width: '100px' }}
          onChange={(e) => setWorkshopInput(Number(e.target.value))}
          value={workshopInput}
        />
      </div>
      <div className={`${styles.element} ${styles.points}`}>
        {isTimeout ? (
          <ScaleLoader color='#fff' height={16} margin={2} loading radius={3} />
        ) : (
          <>{points} poena</>
        )}
      </div>
      {onSwitchToggle && (
        <ToggleSwitch onChange={onSwitchToggle} active={switchActive} />
      )}
    </motion.div>
  );
};

export default ApplicationItem;
