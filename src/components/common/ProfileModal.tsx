import React from 'react';
import { X, User as UserIcon, Mail, Phone, Settings } from 'lucide-react';
import { User, Student, Teacher } from '../../types';

interface ProfileModalProps {
	isOpen: boolean;
	onClose: () => void;
	user: User;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user }) => {
	if (!isOpen) return null;

	const isStudent = user.role === 'student';
	const isTeacher = user.role === 'teacher';
	const student = (isStudent ? (user as Student) : undefined);
	const teacher = (isTeacher ? (user as Teacher) : undefined);

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center">
			<div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
			<div className="relative bg-white w-full max-w-md mx-4 rounded-xl shadow-lg border border-gray-200">
				<div className="flex items-center justify-between p-4 border-b border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900">User Profile</h3>
					<button onClick={onClose} className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100">
						<X className="w-5 h-5" />
					</button>
				</div>
				<div className="p-6 space-y-6">
					<div className="flex items-center">
						<div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mr-4">
							<UserIcon className="w-6 h-6 text-white" />
						</div>
						<div>
							<p className="text-base font-medium text-gray-900">{user.name}</p>
							<p className="text-sm text-gray-500 capitalize">{user.role}</p>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-4">
						<div className="bg-gray-50 rounded-lg p-4">
							<p className="text-xs text-gray-500">User ID</p>
							<p className="text-sm font-medium text-gray-900 break-all">{user.id}</p>
						</div>
						{isStudent && (
							<div className="bg-gray-50 rounded-lg p-4">
								<p className="text-xs text-gray-500">Roll Number</p>
								<p className="text-sm font-medium text-gray-900">{student?.rollNo}</p>
							</div>
						)}
						{isTeacher && (
							<div className="bg-gray-50 rounded-lg p-4">
								<p className="text-xs text-gray-500">Teacher ID</p>
								<p className="text-sm font-medium text-gray-900">{teacher?.teacherId}</p>
							</div>
						)}
						<div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
							<div className="flex items-center text-gray-700">
								<Mail className="w-4 h-4 mr-2" />
								<span className="text-sm">{user.email}</span>
							</div>
						</div>
						<div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
							<div className="flex items-center text-gray-700">
								<Phone className="w-4 h-4 mr-2" />
								<span className="text-sm">{(user as any).phoneNumber || 'Not provided'}</span>
							</div>
						</div>
					</div>

					<div className="flex items-center justify-between pt-4 border-t border-gray-200">
						<button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
							<Settings className="w-4 h-4 mr-2" />
							Settings
						</button>
						<button className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700">
							Complete Profile
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileModal;

