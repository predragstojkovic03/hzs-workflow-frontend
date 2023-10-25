import ApplicationItem from '../ApplicationItem/ApplicationItem';

import styles from './ApplicationList.module.css';

const ApplicationList = ({ applications }: any) => {
  // console.log(applications);
  return (
    <div className={styles.wrapper}>
      {applications.map((item: Application, i: number) => (
        <ApplicationItem
          _id={item._id}
          key={item._id}
          position={i + 1}
          captainName={item.firstMember.name}
          teamName={item.teamName}
          captainPhone={item.firstMember.phoneNumber}
          captainEmail={item.firstMember.email}
        />
      ))}
    </div>
  );
};

export default ApplicationList;
