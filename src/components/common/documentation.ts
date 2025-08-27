// documentation.ts

/**
 * @file This file contains a structured documentation model for the EduFlow application.
 * @author Gemini
 * @date July 18, 2025
 */

// ## 1. TYPE DEFINITION
export interface DocItem {
    id: string;
    type: 'page' | 'section' | 'navigation' | 'button' | 'card' | 'feature';
    name: string;
    keywords: string[];
    location: string;
    purpose: string;
    path: string;
  }
  
  // ## 2. DOCUMENTATION DATA
  export const docItems: DocItem[] = [
    // --- Login Page ---
    {
      id: 'PAGE_LOGIN',
      type: 'page',
      name: 'Login Page',
      keywords: ['login', 'signin', 'signup', 'access', 'credentials', 'account'],
      location: 'Application Entry',
      purpose: 'Allows **you** to log in or sign up for an EduFlow account.',
      path: '/login',
    },
    {
      id: 'BTN_LOGIN',
      type: 'button',
      name: 'Login Button',
      keywords: ['login', 'signin', 'submit', 'enter'],
      location: 'Login Page',
      purpose: 'Submits **your** credentials to log **you** into the platform.',
      path: './login',
    },
  
    // --- Sidebar Navigation ---
    {
      id: 'NAV_HOME',
      type: 'navigation',
      name: 'Home Navigation',
      keywords: ['home', 'dashboard', 'main', 'overview'],
      location: 'Sidebar',
      purpose: 'Takes **you** to the main student dashboard.',
      path: './student/StudentDashboard',
    },
    {
      id: 'NAV_ASSIGNMENTS',
      type: 'navigation',
      name: 'Assignments Navigation',
      keywords: ['assignment', 'homework', 'task'],
      location: 'Sidebar',
      purpose: 'Takes **you** to the assignments management page.',
      path: './student/AssignmentsPage',
    },
    {
      id: 'NAV_ATTENDANCE',
      type: 'navigation',
      name: 'Attendance Button',
      // CHANGED: Keywords are now more specific to avoid false positives.
      keywords: ['attendance', 'attendance button', 'attendance record', 'present', 'absent'],
      location: 'Sidebar',
      purpose: 'Takes **you** to **your** attendance record page.',
      path: './student/AttendancePage',
    },
    {
      id: 'NAV_DOUBTS',
      type: 'navigation',
      name: 'Doubts Navigation',
      keywords: ['doubts', 'doubt buttons', 'question', 'help', 'ask'],
      location: 'Sidebar',
      purpose: 'Takes **you** to the doubts and questions forum.',
      path: './student/DoubtsPage',
    },
    {
      id: 'NAV_TUTOR_SECTION',
      type: 'navigation',
      name: 'Tutor Section Navigation',
      keywords: ['tutor', 'teacher', 'booking', 'educator'],
      location: 'Sidebar',
      purpose: 'Takes **you** to the tutor marketplace.',
      path: './student/TutorPage',
    },
    {
      id: 'NAV_ABOUT_US',
      type: 'navigation',
      name: 'About Us Navigation',
      keywords: ['about', 'company', 'shyampari', 'info'],
      location: 'Sidebar',
      purpose: 'Takes **you** to the page describing Shyampari Edutech.',
      path: './student/AboutUsPage',
    },
    {
      id: 'INFO_COMPANY',
      type: 'feature',
      name: 'About Shyampari Edutech (EduFlow Provider)',
      keywords: ['about', 'company', 'shyampari', 'pune', 'edutech', 'provider', 'contact', 'phone', 'founder', 'praveen', 'history', 'background', 'eduflow'],
      location: 'About Us Page',
      purpose: 'EduFlow is the online platform from **Shyampari Edutech**, an education company based in **Pune, Maharashtra**. Founded in 2017 by **Praveen Kumar**, it grew from a successful offline tutoring service to an online platform connecting students and teachers across India. They specialize in tutoring for all classes and boards with a focus on in-depth development. ☎️ Contact: **07040272830**',
      path: './student/AboutUsPage',
    },
    {
      id: 'NAV_PROFILE',
      type: 'navigation',
      name: 'Student Profile Navigation',
      keywords: ['profile', 'user', 'settings', 'my account'],
      location: 'Sidebar (Bottom)',
      purpose: 'Takes **you** to **your** personal profile and settings page.',
      path: './student/StudentDashboard',
    },
    // ... other items remain the same
  ];
  
  // ## 3. RESPONSE GENERATION LOGIC
  export const findItemLocation = (query: string): string => {
    const lowerCaseQuery = query.toLowerCase();
    const matchedItems = new Set<DocItem>();
  
    docItems.forEach((item) => {
      const isMatch = item.keywords.some((keyword) => lowerCaseQuery.includes(keyword));
      if (isMatch) {
        matchedItems.add(item);
      }
    });
  
    if (matchedItems.size === 0) {
      return "I'm sorry, I couldn't find any features matching your query.";
    }
  
    const results = Array.from(matchedItems);
    return results
      .map(
        (item) => `The **${item.name}** is in the **${item.location}**. Path: <${item.path}>`
      )
      .join('\n\n---\n\n');
  };