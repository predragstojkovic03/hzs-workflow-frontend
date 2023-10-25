import { BiUser } from 'react-icons/bi';

import styles from './MemberInfo.module.css';

interface MemberInfoProps {
  teamMember: TeamMember;
  captain?: boolean;
}

const MemberInfo = ({ teamMember, captain }: MemberInfoProps) => {
  const getYearOfStudy = (yearOfStudy: string) => {
    switch (yearOfStudy) {
      case 'i':
        return 'Prva';

      case 'ii':
        return 'Druga';

      case 'iii':
        return 'Treca';

      case 'iv':
        return 'Cetvrta';
    }
  };

  return (
    <div className={`${styles.wrapper} ${captain && styles.captain}`}>
      <div className={styles.icon}>
        <BiUser />
      </div>
      <div className={styles.element}>
        <span>Ime:</span> {teamMember.name}
      </div>
      <div className={styles.element}>
        <span>Skola:</span> {teamMember.school}
      </div>
      <div className={styles.element}>
        <span>Grad:</span> {teamMember.city}
      </div>
      <div className={styles.element}>
        <span>Godina:</span> {getYearOfStudy(teamMember.yearOfStudy)}
      </div>
      <div className={styles.element}>
        <span>Broj telefona:</span> {teamMember.phoneNumber}
      </div>
      <div className={styles.element}>
        <span>E-mail:</span> {teamMember.email}
      </div>
    </div>
  );
};

export default MemberInfo;
