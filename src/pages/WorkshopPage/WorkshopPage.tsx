import { useQuery } from '@tanstack/react-query';
import { getApplications } from '../../lib/api/applications';
import { useUser } from '../../lib/auth';
import ApplicationList from '../../components/ApplicationList/ApplicationList';

import styles from './WorkshopPage.module.css';

const WorkshopPage = () => {
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
        toggleType='passedWorkshop'
      />
    </main>
  );
};

export default WorkshopPage;
