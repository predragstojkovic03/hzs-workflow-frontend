import Button from '../Button/Button';
import { ScaleLoader } from 'react-spinners';

interface ApplicationQuestionProps {
  text: string;
  body?: string;
  styles: CSSModuleClasses;
  onClick: any;
  setGrades: React.Dispatch<any>;
  stateKey: string;
  grades: any;
  isLoading: boolean;
  isSuccess: boolean;
}

const ApplicationQuestion = ({
  text,
  body,
  styles,
  stateKey,
  setGrades,
  grades,
  onClick,
  isLoading,
  isSuccess,
}: ApplicationQuestionProps) => {
  return (
    <div className={styles.question}>
      <div className={styles.questionText}>{text}</div>
      <div className={styles.questionBody}>{body}</div>
      <div className={styles.gradeForm}>
        <input
          value={grades[stateKey]}
          disabled={isLoading}
          onChange={(e) =>
            setGrades((grades: any) => {
              return { ...grades, [stateKey]: e.target.value };
            })
          }
        />
        <Button disabled={isLoading} onClick={onClick}>
          {isLoading ? (
            <ScaleLoader
              color='var(--dark-bg)'
              height={12}
              margin={1}
              loading
              radius={5}
            />
          ) : isSuccess ? (
            'Uspesno'
          ) : (
            'Sacuvaj ocenu'
          )}
        </Button>
      </div>
    </div>
  );
};

export default ApplicationQuestion;
