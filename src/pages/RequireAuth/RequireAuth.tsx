import { Navigate } from 'react-router-dom';
import { useUser } from '../../lib/auth';
import { ScaleLoader } from 'react-spinners';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();

  if (user.isLoading)
    return (
      <div className='h-100vh full-width flex flex-center'>
        <ScaleLoader
          color='#ffffff'
          height={50}
          loading
          margin={2}
          radius={5}
          width={10}
        />
      </div>
    );

  if (!user.data) return <Navigate to='/login' />;

  return <>{children}</>;
};

export default RequireAuth;
