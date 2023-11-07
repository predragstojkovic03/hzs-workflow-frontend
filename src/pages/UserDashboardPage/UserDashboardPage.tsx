import { useLogout, useUser } from '../../lib/auth';

type UserDashboardPageProps = {};

import styles from './UserDashboardPage.module.css';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';
import Button from '../../components/Button/Button';

const UserDashboardPage = ({}: UserDashboardPageProps) => {
  const user = useUser();
  const logout = useLogout();

  return (
    <main className='container'>
      <div className={styles.heading}>
        Helou,{' '}
        <span
          className={styles.name}
        >{`${user.data.firstName} ${user.data.lastName}`}</span>
      </div>

      <div className={styles.passwordFormWrapper}>
        <ResetPasswordForm />
      </div>

      <Button onClick={() => logout.mutate()} styleType='purple'>
        Izloguj se
      </Button>
    </main>
  );
};

export default UserDashboardPage;
