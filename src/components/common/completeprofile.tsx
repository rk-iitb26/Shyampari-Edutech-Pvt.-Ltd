import React, { useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Student, Teacher, User } from '../../types';

type StudentForm = {
  name: string;
  email: string;
  phoneNumber: string;
  className: string;
  section: string;
  rollNo: string;
};

type TeacherForm = {
  name: string;
  email: string;
  phoneNumber: string;
  teacherId: string;
  subjects: string;
  classes: string;
};

const CompleteProfile: React.FC = () => {
  const { user } = useAuth();
  const typedUser = user as User | Student | Teacher | null;
  const role = typedUser?.role;

  const initialStudent: StudentForm = useMemo(() => ({
    name: (typedUser as Student)?.name || '',
    email: (typedUser as Student)?.email || '',
    phoneNumber: (typedUser as any)?.phoneNumber || '',
    className: (typedUser as Student)?.class || '',
    section: (typedUser as Student)?.section || '',
    rollNo: (typedUser as Student)?.rollNo || ''
  }), [typedUser]);

  const initialTeacher: TeacherForm = useMemo(() => ({
    name: (typedUser as Teacher)?.name || '',
    email: (typedUser as Teacher)?.email || '',
    phoneNumber: (typedUser as any)?.phoneNumber || '',
    teacherId: (typedUser as Teacher)?.teacherId || '',
    subjects: ((typedUser as Teacher)?.subjects || []).join(', '),
    classes: ((typedUser as Teacher)?.classes || []).join(', ')
  }), [typedUser]);

  const [studentForm, setStudentForm] = useState<StudentForm>(initialStudent);
  const [teacherForm, setTeacherForm] = useState<TeacherForm>(initialTeacher);
  const [status, setStatus] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'student') {
      // TODO: Replace with API call to update student profile
      // For now, just log and show a confirmation
      // eslint-disable-next-line no-console
      console.log('Submitting Student Profile:', studentForm);
      setStatus('Profile saved successfully');
      return;
    }
    if (role === 'teacher') {
      // TODO: Replace with API call to update teacher profile
      // eslint-disable-next-line no-console
      console.log('Submitting Teacher Profile:', teacherForm);
      setStatus('Profile saved successfully');
      return;
    }
  };

  if (!typedUser) {
    return (
      <div className="p-6">
        <p className="text-gray-700">You need to be logged in to complete your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Profile</h1>

        {status && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={role === 'student' ? studentForm.name : teacherForm.name}
                onChange={(e) => role === 'student' 
                  ? setStudentForm({ ...studentForm, name: e.target.value })
                  : setTeacherForm({ ...teacherForm, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={role === 'student' ? studentForm.email : teacherForm.email}
                onChange={(e) => role === 'student' 
                  ? setStudentForm({ ...studentForm, email: e.target.value })
                  : setTeacherForm({ ...teacherForm, email: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={role === 'student' ? studentForm.phoneNumber : teacherForm.phoneNumber}
                onChange={(e) => role === 'student' 
                  ? setStudentForm({ ...studentForm, phoneNumber: e.target.value })
                  : setTeacherForm({ ...teacherForm, phoneNumber: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g. +91 98765 43210"
              />
            </div>
          </div>

          {/* Role-specific Fields */}
          {role === 'student' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <input
                  type="text"
                  value={studentForm.className}
                  onChange={(e) => setStudentForm({ ...studentForm, className: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g. 10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                <input
                  type="text"
                  value={studentForm.section}
                  onChange={(e) => setStudentForm({ ...studentForm, section: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g. A"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Roll No</label>
                <input
                  type="text"
                  value={studentForm.rollNo}
                  onChange={(e) => setStudentForm({ ...studentForm, rollNo: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          )}

          {role === 'teacher' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teacher ID</label>
                <input
                  type="text"
                  value={teacherForm.teacherId}
                  onChange={(e) => setTeacherForm({ ...teacherForm, teacherId: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Subjects</label>
                <input
                  type="text"
                  value={teacherForm.subjects}
                  onChange={(e) => setTeacherForm({ ...teacherForm, subjects: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g. Math, Science"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Classes</label>
                <input
                  type="text"
                  value={teacherForm.classes}
                  onChange={(e) => setTeacherForm({ ...teacherForm, classes: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g. 10A, 10B"
                />
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;


