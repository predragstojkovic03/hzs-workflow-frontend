import ApplicationItem from '../ApplicationItem/ApplicationItem';

import styles from './ApplicationList.module.css';

const ApplicationList = ({ applications, showGraded }: any) => {
  let listedApplications = applications.sort(
    (a: Application, b: Application) => b.grades.gradeSum - a.grades.gradeSum
  );

  if (!showGraded)
    listedApplications = listedApplications.filter(
      (item: Application) => !item.grades.graded
    );

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
          points={item.grades.gradeSum}
        />
      ))}
    </div>
  );
};

export default ApplicationList;
