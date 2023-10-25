import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useUser } from '../../lib/auth';
import { ScaleLoader } from 'react-spinners';

import { getApplicationById } from '../../lib/api/applications';

import styles from './ApplicationDetailsPage.module.css';
import Button from '../../components/Button/Button';
import MemberInfo from '../../components/MemberInfo/MemberInfo';
import ApplicationQuestions from '../../components/ApplicationQuestions/ApplicationQuestions';
// import { useState } from 'react';

const ApplicationDetailsPage = () => {
  const { id } = useParams();
  const user = useUser();

  const applicationQuery = useQuery({
    queryKey: ['applications', id],
    queryFn: () => getApplicationById(id, user.data),
  });

  if (applicationQuery.isLoading) {
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
  }

  if (applicationQuery.isError) {
    return <h1>Greska</h1>;
  }

  return (
    <div className='container'>
      <div className={styles.heading}>
        <span className={styles.teamName}>
          {applicationQuery.data.teamName}
        </span>
        <Button>Oceni prijavu</Button>
      </div>
      <div className={styles.info}>
        <MemberInfo
          teamMember={applicationQuery.data.firstMember as TeamMember}
          captain
        />
        <MemberInfo
          teamMember={applicationQuery.data.secondMember as TeamMember}
        />
        <MemberInfo
          teamMember={applicationQuery.data.thirdMember as TeamMember}
        />
        {applicationQuery.data.fourthMember && (
          <MemberInfo
            teamMember={applicationQuery.data.fourthMember as TeamMember}
          />
        )}
      </div>

      <ApplicationQuestions
        applicationId={id}
        applicationQuery={applicationQuery}
        userData={user.data}
      />
    </div>
  );
};

export default ApplicationDetailsPage;
