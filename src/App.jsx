import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AdminLogin, Assignments, AssignmentsMark, CoursePlayer, DashBoard, LeaderBorad, Quiz, Quizzes, StudentLogin, StudentRegistration, Videos } from './AllRoutes'
import Navigation from './components/Navigation'
import useAuthCheck from './hooks/useAuthCheck'

function App() {

  const authChecked = useAuthCheck();


  return !authChecked ? <div className="flex bg-white gap-3 justify-center items-center h-screen font-bold">
    <p className="text-cyan-700">Auth Checking ....</p>
    <div className="w-12 h-12 rounded-full animate-spin border-x-2 border-solid border-blue-500 border-t-transparent"></div>
  </div> : (
    <div>
      <Routes>
        <Route path='/' element={<StudentLogin />} />
        {/* Student Portal */}
        <Route path='/studentPortal/coursePlayer' element={<CoursePlayer />} />
        <Route path='/studentPortal/leaderBoard' element={<LeaderBorad />} />
        <Route path='/studentPortal/quiz/:quizId' element={<Quiz />} />
        <Route path='/studentPortal/studentLogin' element={<StudentLogin />} />
        <Route path='/studentPortal/studentReistration' element={<StudentRegistration />} />
        {/* Admin Portal */}
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/dashboard/assignment' element={<Assignments />} />
        <Route path='/dashboard/assignmentMark' element={<AssignmentsMark />} />
        <Route path='/dashboard/quizzes' element={<Quizzes />} />
        <Route path='/dashboard/videos' element={<Videos />} />
      </Routes>
    </div>
  )
}

export default App
