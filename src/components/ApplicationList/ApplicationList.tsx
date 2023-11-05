// import { useMutation } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setPassedStages } from '../../lib/api/applications';
import ApplicationItem from '../ApplicationItem/ApplicationItem';

import styles from './ApplicationList.module.css';
import { useUser } from '../../lib/auth';
// import { gradeApplication } from '../../lib/api/applications';

interface ApplicationListProps {
  applications: Application[];
  showGraded: boolean;
  isLoading: boolean;
  toggleType: 'passedApplication' | 'passedMoodle' | 'passedWorkshop' | 'none';
}

const ApplicationList = ({
  applications,
  showGraded,
  isLoading,
  toggleType,
}: ApplicationListProps) => {
  const user = useUser();
  const queryClient = useQueryClient();

  let listedApplications = applications.sort(
    (a: Application, b: Application) => b.grades.gradeSum - a.grades.gradeSum
  );

  if (toggleType === 'passedApplication')
    listedApplications = listedApplications.sort(
      (a: Application, b: Application) =>
        a.passedStages.application === b.passedStages.application
          ? 0
          : a.passedStages.application
          ? -1
          : 1
    );

  if (!showGraded)
    listedApplications = listedApplications.filter(
      (item: Application) => !item.grades.graded
    );

  const applicationMutation = useMutation({
    mutationKey: ['applications'],
    mutationFn: setPassedStages,
  });

  const getSwitchBundle = (application: Application) => {
    switch (toggleType) {
      case 'none':
        return null;

      case 'passedApplication':
        return {
          onChange: (value: boolean) => {
            applicationMutation.mutate(
              {
                id: application._id,
                passedStages: { application: value },
                userData: user.data,
              },
              {
                onSettled: () => {
                  queryClient.invalidateQueries(['applications']);
                  queryClient.invalidateQueries([
                    'applications',
                    application._id,
                  ]);
                },
              }
            );
          },
          toggleActive: application.passedStages.application,
        };
    }
  };

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
          switchActive={getSwitchBundle(item)?.toggleActive}
          onSwitchToggle={getSwitchBundle(item)?.onChange}
        />
      ))}
    </div>
  );
};

export default ApplicationList;
