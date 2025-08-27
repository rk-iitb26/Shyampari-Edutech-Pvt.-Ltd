import { Student, Teacher, Assignment, Test, AttendanceEntry, Doubt, Class } from '../types';

export const mockStudents: Student[] = [];

export const mockTeachers: Teacher[] = [];

export const mockClasses: Class[] = [];

export const mockAssignments: Assignment[] = [];

export const mockTests: Test[] = [];

export const mockAttendance: AttendanceEntry[] = [];

export const mockDoubts: Doubt[] = [];

// Mock current user - in a real app, this would come from authentication
export const mockCurrentUser: Student = {
  id: '1',
  name: 'Student User',
  email: 'student@example.com',
  role: 'student',
  class: '10th Grade',
  section: 'A',
  rollNo: '1001',
  subjects: []
};

export const mockCurrentTeacher: Teacher = {
  id: '2',
  name: 'Teacher User',
  email: 'teacher@example.com',
  role: 'teacher',
  teacherId: 'T001',
  subjects: [],
  classes: []
};