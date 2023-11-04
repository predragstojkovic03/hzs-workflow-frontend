// import { useMutation } from '@tanstack/react-query';
import ApplicationItem from '../ApplicationItem/ApplicationItem';

import styles from './ApplicationList.module.css';
// import { gradeApplication } from '../../lib/api/applications';

const ApplicationList = ({ applications, showGraded, isLoading }: any) => {
  let listedApplications = applications.sort(
    (a: Application, b: Application) => b.grades.gradeSum - a.grades.gradeSum
  );

  if (!showGraded)
    listedApplications = listedApplications.filter(
      (item: Application) => !item.grades.graded
    );

  // const applicationMutation = useMutation({
  //   mutationKey: ['applications'],
  //   mutationFn: gradeApplication,
  // });

  return (
    <div className={styles.wrapper}>
      {listedApplications.map((item: Application, i: number) => (
        <ApplicationItem
          _id={item._id}
          key={item._id}
          position={i + 1}
          captainName={item.firstMember.name}
          teamName={item.teamName}
          captainPhone={item.firstMember.phoneNumber}
          captainEmail={item.firstMember.email}
          moodlePoints={item.grades.moodle}
          workshopPoints={item.grades.workshop}
          points={item.grades.gradeSum}
          isMainQueryLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default ApplicationList;
