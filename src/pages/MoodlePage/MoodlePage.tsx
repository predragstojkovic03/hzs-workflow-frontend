import { useQuery } from '@tanstack/react-query';
import { getApplications } from '../../lib/api/applications';
import { useUser } from '../../lib/auth';
import ApplicationList from '../../components/ApplicationList/ApplicationList';

import styles from './MoodlePage.module.css';

const MoodlePage = () => {
  const user = useUser();

  const applicationQuery = useQuery({
    queryFn: () => getApplications({ token: user.data.token }),
    queryKey: ['applications'],
  });

  if (applicationQuery.isLoading) return <div>Ucitavanje</div>;
  if (applicationQuery.isError) return <div>Greska</div>;

  return (
    <main className='container'>
      <div className={styles.toggleWrapper}></div>
      <ApplicationList
        showGraded
        applications={applicationQuery.data}
        isLoading={applicationQuery.isLoading}
        toggleType='passedMoodle'
      />
    </main>
  );
};

export default MoodlePage;
