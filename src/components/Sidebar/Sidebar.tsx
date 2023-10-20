import { useEffect, useState } from 'react';
// import { IoStatsChart } from 'react-icons/io5';
// import { BsPeopleFill } from 'react-icons/bs';
// import { BsCheckLg } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
// import { IoMdDoneAll } from 'react-icons/io';
import { BiUser } from 'react-icons/bi';
// import { AiFillStar } from 'react-icons/ai';
import { motion } from 'framer-motion';

import SidebarItem from '../SidebarItem/SidebarItem';
import styles from './Sidebar.module.css';
import { useLogout, useUser } from '../../lib/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

const sideVariants = {
  closed: {
    width: 0,
  },
  showing: {
    width: '80px',
    transition: {
      staggerChildren: 0.2,
      when: 'beforeChildren',
    },
  },
  open: {
    width: '280px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 8px 0px',
  },
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const handlers = useSwipeable({
    onSwipedRight: () => {
      console.log('right');
      setIsOpen(true);
    },
    onSwipedLeft: () => setIsOpen(false),
  });

  const showText = () => {
    setIsOpen(true);
  };

  const hideText = () => {
    setIsOpen(false);
  };

  const user = useUser();
  const logout = useLogout();
  const navigate = useNavigate();

  const isHr = () => {
    return (
      user.data && (user.data.role === 'hr' || user.data.role === 'superuser')
    );
  };

  const isLog = () => {
    return (
      user.data && (user.data.role === 'log' || user.data.role === 'superuser')
    );
  };

  const isSuperuser = () => {
    return user.data && user.data.role === 'superuser';
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.div
      {...handlers}
      className={styles.wrapper}
      initial='closed'
      animate={isOpen ? 'open' : 'showing'}
      exit='closed'
      onMouseEnter={showText}
      onMouseLeave={hideText}
      variants={sideVariants}
    >
      <h5 className={styles.logo}>{isOpen ? 'Workflow' : 'Wf'}</h5>
      <div className={styles.items}>
        {isHr() && (
          <SidebarItem
            i={1}
            sidebarTextVisible={isOpen}
            icon={<FaHome />}
            text={isOpen ? 'Pocetna' : ''}
            onClick={() => navigate('/')}
          />
        )}
      </div>
      {user.data && (
        <div className={styles.logoutItemWrapper}>
          <SidebarItem
            key='logoutItem'
            type='gray'
            sidebarTextVisible={isOpen}
            icon={<BiUser />}
            text={isOpen ? `${user.data.firstName}, Logout` : ''}
            onClick={() => isOpen && logout.mutate({})}
          />
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;
