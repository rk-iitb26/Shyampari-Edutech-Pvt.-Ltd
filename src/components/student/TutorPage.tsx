import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Student } from '../../types';
import { Link } from 'react-router-dom';
import ChatbotWidget from '../common/ChatbotWidget';
import ProfileModal from '../common/ProfileModal';

import { 
  Menu,
  X,
  Home,
  FileText,
  TrendingUp,
  HelpCircle,
  User,
  BookOpen,
  MessageSquare,
  Star,
  Clock,
  DollarSign,
  Award,
  Calendar,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
  Users
} from 'lucide-react';

interface Tutor {
  id: string;
  name: string;
  photo: string;
  subject: string;
  experience: string;
  rating: number;
  hourlyRate: number;
  location: string;
  email: string;
  phone: string;
  education: string;
  achievements: string[];
  workingExperience: string[];
  specializations: string[];
  availability: string[];
  bio: string;
}

const mockTutors: Tutor[] = [
  {
    id: '1',
    name: 'Dr. Prasanna',
    photo: 'https://ik.imagekit.io/siddhardha/prasanna.png?updatedAt=1749144563555',
    subject: 'Mathematics',
    experience: '8 years',
    rating: 4.9,
    hourlyRate: 45,
    location: 'Telangana, India',
    email: 'prasanna@email.com',
    phone: '+1 (555) 123-4567',
    education: 'Ph.D. in Mathematics, MIT',
    achievements: [
      'Published 15+ research papers in top mathematics journals',
      'Awarded Best Teacher of the Year 2022',
      'Member of Indian Mathematical Society',
      'Certified Advanced Placement Instructor'
    ],
    workingExperience: [
      'Senior Mathematics Professor at Hyderabad University (2018-Present)',
      'Mathematics Department Head at St. Mary\'s High School (2015-2018)',
      'Research Associate at MIT (2012-2015)',
      'Graduate Teaching Assistant at MIT (2010-2012)'
    ],
    specializations: ['Calculus', 'Linear Algebra', 'Statistics', 'Number Theory'],
    availability: ['Monday: 3:00 PM - 8:00 PM', 'Wednesday: 3:00 PM - 8:00 PM', 'Saturday: 9:00 AM - 2:00 PM'],
    bio: 'Dr. Prasanna is a passionate mathematics educator with over 8 years of experience in teaching advanced mathematics concepts. She specializes in making complex mathematical theories accessible to students of all levels.'
  },
  {
    id: '2',
    name: 'Prof. Karthik',
    photo: 'https://ik.imagekit.io/siddhardha/karthik.jpg?updatedAt=1749187467753',
    subject: 'Physics',
    experience: '12 years',
    rating: 4.8,
    hourlyRate: 50,
    location: 'Maharashtra, India',
    email: 'karthik@email.com',
    phone: '+1 (555) 234-5678',
    education: 'Ph.D. in Physics, IIT Bombay',
    achievements: [
      'Nobel Prize nominee for research in Quantum Mechanics',
      'Author of 3 bestselling physics textbooks',
      'Fellow of the Indian Physical Society',
      'Recipient of National Science Foundation Grant'
    ],
    workingExperience: [
      'Professor of Physics at IIT Bombay (2019-Present)',
      'Research Scientist at IIT Bombay (2016-2019)',
      'Assistant Professor at IIT Bombay (2012-2016)',
      'Postdoctoral Fellow at IIT Bombay (2010-2012)'
    ],
    specializations: ['Quantum Mechanics', 'Thermodynamics', 'Electromagnetism', 'Astrophysics'],
    availability: ['Tuesday: 4:00 PM - 9:00 PM', 'Thursday: 4:00 PM - 9:00 PM', 'Sunday: 10:00 AM - 3:00 PM'],
    bio: 'Professor Karthik is a distinguished physicist with expertise in quantum mechanics and theoretical physics. He has published over 50 research papers and is known for his innovative teaching methods.'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    subject: 'Chemistry',
    experience: '6 years',
    rating: 4.7,
    hourlyRate: 40,
    location: 'Boston, MA',
    email: 'emily.rodriguez@email.com',
    phone: '+1 (555) 345-6789',
    education: 'Ph.D. in Chemistry, IIT Madras',
    achievements: [
      'Young Scientist Award from Indian Chemical Society',
      'Published 20+ papers in high-impact chemistry journals',
      'Inventor of 3 patented chemical processes',
      'Speaker at International Chemistry Conference 2023'
    ],
    workingExperience: [
      'Research Chemist at IIT Madras (2020-Present)',
      'Chemistry Lecturer at IIT Madras (2018-2020)',
      'Postdoctoral Researcher at IIT Madras (2016-2018)',
      'Graduate Researcher at IIT Madras (2014-2016)'
    ],
    specializations: ['Organic Chemistry', 'Biochemistry', 'Analytical Chemistry', 'Physical Chemistry'],
    availability: ['Monday: 5:00 PM - 9:00 PM', 'Friday: 5:00 PM - 9:00 PM', 'Saturday: 1:00 PM - 5:00 PM'],
    bio: 'Dr. Emily Rodriguez is a dynamic chemistry educator who combines her research expertise with practical teaching methods. She specializes in organic chemistry and biochemistry, making complex chemical concepts easy to understand.'
  },
  {
    id: '4',
    name: 'Prof. David Thompson',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    subject: 'Computer Science',
    experience: '10 years',
    rating: 4.9,
    hourlyRate: 55,
    location: 'Delhi, India',
    email: 'david.thompson@email.com',
    phone: '+1 (555) 456-7890',
    education: 'Ph.D. in Computer Science, IIT Delhi',
    achievements: [
      'Former Senior Software Engineer at Microsoft',
      'Author of "Advanced Algorithms" textbook',
      'ACM Distinguished Scientist Award',
      'Speaker at major tech conferences including Google I/O'
    ],
    workingExperience: [
      'Professor of Computer Science at IIT Delhi (2021-Present)',
      'Senior Software Engineer at Microsoft (2018-2021)',
      'Assistant Professor at IIT Delhi (2015-2018)',
      'Research Scientist at IIT Delhi (2013-2015)'
    ],
    specializations: ['Data Structures', 'Algorithms', 'Machine Learning', 'Software Engineering'],
    availability: ['Wednesday: 6:00 PM - 10:00 PM', 'Friday: 6:00 PM - 10:00 PM', 'Sunday: 2:00 PM - 6:00 PM'],
    bio: 'Professor David Thompson brings real-world industry experience to his teaching. He has worked at top tech companies and specializes in algorithms, data structures, and software engineering principles.'
  }
];

const TutorPage: React.FC = () => {
  const { user } = useAuth();
  const student = user as Student;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [expandedTutor, setExpandedTutor] = useState<string | null>(null);

  const navigationItems = [
    { name: 'Home', icon: Home, path: '/student-dashboard' },
    { name: 'Assignments', icon: FileText, path: '/assignments' },
    { name: 'Attendance', icon: TrendingUp, path: '/attendance' },
    { name: 'Doubts', icon: HelpCircle, path: '/doubts' },
    { name: 'Tutor Section', icon: User, path: '/tutor' },
    { name: 'About Us', icon: BookOpen, path: '/aboutus' },
  ];

  const toggleExpanded = (tutorId: string) => {
    setExpandedTutor(expandedTutor === tutorId ? null : tutorId);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Student Portal</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    item.name === 'Tutor Section' 
                      ? 'bg-orange-50 text-orange-700' 
                      : 'text-gray-700 hover:bg-orange-50 hover:text-orange-700'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Student Info (Profile Button) */}
        <button
          onClick={() => setIsProfileOpen(true)}
          className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 text-left hover:bg-gray-50"
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {student.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{student.name}</p>
              <p className="text-xs text-gray-500">{student.class} - {student.section}</p>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">View Profile</p>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold text-gray-900">Tutor Section</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Roll No: {student.rollNo}</span>
            </div>
          </div>
        </div>

        {/* Tutor Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Tutor</h1>
              <p className="text-gray-600 mt-2">Connect with experienced educators to enhance your learning journey</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{mockTutors.length}</div>
                    <div className="text-sm text-gray-500">Available Tutors</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">4.8</div>
                    <div className="text-sm text-gray-500">Average Rating</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">8</div>
                    <div className="text-sm text-gray-500">Subjects Covered</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">24/7</div>
                    <div className="text-sm text-gray-500">Booking Available</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tutor Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockTutors.map((tutor) => (
                <div key={tutor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Basic Info */}
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={tutor.photo} 
                        alt={tutor.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900">{tutor.name}</h3>
                        <p className="text-orange-600 font-medium">{tutor.subject}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm text-gray-600">{tutor.rating}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="ml-1 text-sm text-gray-600">{tutor.experience} exp</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            <span className="ml-1 text-sm text-gray-600">${tutor.hourlyRate}/hr</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 mt-4">
                      <button
                        onClick={() => toggleExpanded(tutor.id)}
                        className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center"
                      >
                        <span className="mr-2">More Info</span>
                        {expandedTutor === tutor.id ? <X className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                      </button>
                      <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedTutor === tutor.id && (
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                      <div className="space-y-6">
                        {/* Contact Info */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            Contact Information
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 text-gray-400 mr-2" />
                              <span>{tutor.email}</span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 text-gray-400 mr-2" />
                              <span>{tutor.phone}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                              <span>{tutor.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Education */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <GraduationCap className="w-4 h-4 mr-2" />
                            Education
                          </h4>
                          <p className="text-sm text-gray-600">{tutor.education}</p>
                        </div>

                        {/* Specializations */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Specializations</h4>
                          <div className="flex flex-wrap gap-2">
                            {tutor.specializations.map((spec, index) => (
                              <span key={index} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Achievements */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Award className="w-4 h-4 mr-2" />
                            Achievements
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            {tutor.achievements.map((achievement, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-orange-500 mr-2">•</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Work Experience */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Briefcase className="w-4 h-4 mr-2" />
                            Work Experience
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            {tutor.workingExperience.map((exp, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                {exp}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Availability */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Availability
                          </h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            {tutor.availability.map((time, index) => (
                              <li key={index} className="flex items-center">
                                <span className="text-green-500 mr-2">•</span>
                                {time}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Bio */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">About</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{tutor.bio}</p>
                        </div>

                        {/* Booking Button */}
                        <div className="pt-4 border-t border-gray-200">
                          <button className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Book Session - ${tutor.hourlyRate}/hour
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <ChatbotWidget />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={student} />
    </div>
  );
};

export default TutorPage;
