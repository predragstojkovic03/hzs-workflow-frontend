import { useQuery } from '@tanstack/react-query';
import { getApplications } from '../../lib/api/applications';
import { useUser } from '../../lib/auth';
import ApplicationItem from '../../components/ApplicationItem/ApplicationItem';

const Home = () => {
  const user = useUser();

  const applicationQuery = useQuery({
    queryFn: () => getApplications({ token: user.data.token }),
    queryKey: ['applications'],
  });

  if (applicationQuery.isLoading) return <div>Ucitavanje</div>;
  if (applicationQuery.isError) return <div>Greska</div>;

  console.log(applicationQuery.data);

  return (
    <main className='container'>
      {applicationQuery.data.map((item: any, i: number) => (
        <ApplicationItem
          position={i + 1}
          captainName={item.firstMember.firstName}
          teamName={item.teamName}
          captainPhone={item.firstMember.phoneNumber}
          captainEmail={item.firstMember.email}
        />
      ))}
    </main>
  );
};

export default Home;
