// import { useMutation } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setPassedStages } from '../../lib/api/applications';
import ApplicationItem from '../ApplicationItem/ApplicationItem';

import styles from './ApplicationList.module.css';
import { useUser } from '../../lib/auth';
import ExcelExport from '../ExcelExport/ExcelExport';

// import { gradeApplication } from '../../lib/api/applications';

interface ApplicationListProps {
  applications: Application[];
  showGraded: boolean;
  isLoading: boolean;
  toggleType:
    | 'passedApplication'
    | 'passedMoodle'
    | 'passedWorkshop'
    | 'final'
    | 'none';
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

  if (toggleType === 'passedMoodle')
    listedApplications = listedApplications
      .sort((a: Application, b: Application) =>
        a.passedStages.moodle === b.passedStages.moodle
          ? 0
          : a.passedStages.moodle
          ? -1
          : 1
      )
      .filter((application) => application.passedStages.application);

  if (toggleType === 'passedWorkshop')
    listedApplications = listedApplications
      .sort((a: Application, b: Application) =>
        a.passedStages.workshop === b.passedStages.workshop
          ? 0
          : a.passedStages.workshop
          ? -1
          : 1
      )
      .filter((application) => application.passedStages.moodle);

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
                passedStages: value
                  ? { application: true }
                  : { application: false, moodle: false, workshop: false },
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

      case 'passedMoodle':
        return {
          onChange: (value: boolean) => {
            applicationMutation.mutate(
              {
                id: application._id,
                passedStages: value
                  ? { moodle: true }
                  : { moodle: false, workshop: false },
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
          toggleActive: application.passedStages.moodle,
        };

      case 'passedWorkshop':
        return {
          onChange: (value: boolean) => {
            applicationMutation.mutate(
              {
                id: application._id,
                passedStages: { workshop: value },
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
          toggleActive: application.passedStages.workshop,
        };
    }
  };

  const getExportData = () => {
    if (toggleType == 'passedApplication')
      return listedApplications.filter(
        (application) => application.passedStages.application
      );

    if (toggleType == 'passedMoodle')
      return listedApplications.filter(
        (application) => application.passedStages.moodle
      );

    if (toggleType == 'passedWorkshop')
      return listedApplications.filter(
        (application) => application.passedStages.workshop
      );

    return listedApplications;
  };

  const getNotPassedExportData = () => {
    if (toggleType == 'passedApplication')
      return listedApplications.filter(
        (application) => !application.passedStages.application
      );

    if (toggleType == 'passedMoodle')
      return listedApplications.filter(
        (application) => !application.passedStages.moodle
      );

    if (toggleType == 'passedWorkshop')
      return listedApplications.filter(
        (application) => !application.passedStages.workshop
      );

    return listedApplications;
  };

  const getFileName = (passed: boolean) => {
    switch (toggleType) {
      case 'passedApplication':
        return passed ? 'Prosli prijavu' : 'Nisu prosli prijavu';

      case 'passedMoodle':
        return passed ? 'Prosli moodle' : 'Nisu prosli moodle';

      case 'passedWorkshop':
        return passed ? 'Prosli domaci' : 'Nisu prosli domaci';
    }

    return 'Podaci';
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.exportWrapper}>
        <ExcelExport
          data={getExportData().map((application) => ({
            ['Ime tima']: application.teamName,
            ['Ime kapitena']: application.firstMember.name,
            ['Mejl kapitena']: application.firstMember.email,
            ['Broj telefona kapitena']: application.firstMember.phoneNumber,
            ['Moodle lozinka']: application.moodlePassword,
          }))}
          fileName={getFileName(true)}
          type='passed'
        />
        <ExcelExport
          data={getNotPassedExportData().map((application) => ({
            ['Ime tima']: application.teamName,
            ['Ime kapitena']: application.firstMember.name,
            ['Mejl kapitena']: application.firstMember.email,
            ['Broj telefona kapitena']: application.firstMember.phoneNumber,
          }))}
          fileName={getFileName(false)}
          type='notPassed'
        />
      </div>
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
