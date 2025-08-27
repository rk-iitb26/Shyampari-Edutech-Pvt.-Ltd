export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  profilePicture?: string;
  phoneNumber?: string;
}

export interface Student extends User {
  class: string;
  section: string;
  rollNo: string;
  subjects: string[];
}

export interface Teacher extends User {
  teacherId: string;
  subjects: string[];
  classes: string[];
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  dueDate: string;
  attachments?: string[];
  maxScore: number;
  status: 'pending' | 'submitted' | 'graded';
  submittedAt?: string;
  score?: number;
  feedback?: string;
  createdBy: string;
  classId: string;
}

export interface Test {
  id: string;
  title: string;
  subject: string;
  date: string;
  duration: number;
  description: string;
  maxScore: number;
  status: 'scheduled' | 'completed' | 'graded';
  score?: number;
  createdBy: string;
  classId: string;
}

export interface AttendanceEntry {
  id: string;
  studentId: string;
  subject: string;
  date: string;
  status: 'present' | 'absent';
  markedBy: string;
  classId: string;
}

export interface Doubt {
  id: string;
  question: string;
  subject: string;
  askedBy: string;
  askedAt: string;
  answers: Answer[];
  status: 'pending' | 'answered';
}

export interface Answer {
  id: string;
  answer: string;
  answeredBy: string;
  answeredAt: string;
  isTeacher: boolean;
}

export interface Class {
  id: string;
  name: string;
  section: string;
  subjects: string[];
  students: string[];
  teachers: string[];
}