import { useQuery } from '@tanstack/react-query';
import { getApplications } from '../../lib/api/applications';
import { useUser } from '../../lib/auth';
import ApplicationList from '../../components/ApplicationList/ApplicationList';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import { useState } from 'react';

import styles from './Home.module.css';

const Home = () => {
  const user = useUser();

  const [showGraded, setShowGraded] = useState(false);

  const applicationQuery = useQuery({
    queryFn: () => getApplications({ token: user.data.token }),
    queryKey: ['applications'],
  });

  if (applicationQuery.isLoading) return <div>Ucitavanje</div>;
  if (applicationQuery.isError) return <div>Greska</div>;

  const onChangeHandler = (active: boolean) => {
    setShowGraded(active);
  };

  return (
    <main className='container'>
      <div className={styles.toggleWrapper}>
        <ToggleSwitch active={showGraded} onChange={onChangeHandler} />
        Prikazi ocenjene
      </div>
      <ApplicationList
        showGraded={showGraded}
        applications={applicationQuery.data}
      />
    </main>
  );
};

export default Home;
