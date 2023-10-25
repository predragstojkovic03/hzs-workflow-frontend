interface TeamMember {
  name: string;
  city: string;
  school: string;
  yearOfStudy: 'i' | 'ii' | 'iii' | 'iv';
  phoneNumber: string;
  email: string;
}
interface ApplicationInfo {
  teamName: string;
  captainFirstName: string;
  captainPhone: string;
  points: number | undefined;
}

interface Application {
  _id: any;
  firstMember: TeamMember;
  secondMember: TeamMember;
  thirdMember: TeamMember;
  fourthMember?: TeamMember;
  teamName: string;
  leadSource: string[];
  experience: {
    have: boolean;
    desc?: string;
  };
  technologies: string;
  whyYou: string;
  situational: string;
  goals: string;
  teamMembersDescription: string;
  grades: {
    graded: boolean;
    experience: number;
    technologies: number;
    whyYou: number;
    situational: number;
    goals: number;
    teamMembersDescription: number;
  };
  comments?: {
    primaryComment?: string;
    secondaryComment?: string;
  };
}
