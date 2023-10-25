import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  getApplicationById,
  gradeApplication,
} from '../../lib/api/applications';

import styles from './ApplicationQuestions.module.css';
import ApplicationQuestion from '../ApplicationQuestion/ApplicationQuestion';

const ApplicationQuestions = ({
  applicationQuery,
  applicationId,
  userData,
}: any) => {
  const [grades, setGrades] = useState({
    experience: applicationQuery.data.grades.experience,
    technologies: applicationQuery.data.grades.technologies,
    whyYou: applicationQuery.data.grades.whyYou,
    situational: applicationQuery.data.grades.situational,
    goals: applicationQuery.data.grades.goals,
    teamMembersDescription: applicationQuery.data.grades.teamMembersDescription,
    moodle: applicationQuery.data.grades.moodle,
    workshop: applicationQuery.data.grades.workshop,
  });

  const queryClient = useQueryClient();

  const applicationMutation = useMutation({
    mutationKey: ['applications', applicationId],
    mutationFn: () => gradeApplication({ id: applicationId, grades, userData }),
    onSettled: () =>
      queryClient.invalidateQueries(['applications', applicationId]),
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>Pitanja</div>

      <ApplicationQuestion
        text='Experience'
        body={
          applicationQuery.data.experience.have
            ? applicationQuery.data.experience.desc
            : 'Nema prethodnog iskustva'
        }
        setGrades={setGrades}
        grades={grades}
        stateKey='experience'
        onClick={() => applicationMutation.mutate()}
        styles={styles}
        isLoading={applicationMutation.isLoading}
        isSuccess={applicationMutation.isSuccess}
      />
    </div>
  );
};

export default ApplicationQuestions;