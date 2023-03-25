import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AdminLogin, Assignments, AssignmentMark, CoursePlayer, DashBoard, LeaderBorad, Quiz, Quizzes, StudentLogin, StudentRegistration, Videos } from './AllRoutes'
import Navigation from './components/Navigation'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigation />} />
        {/* Student Portal */}
        <Route path='/studentPortal/coursePlayer' element={<CoursePlayer />} />
        <Route path='/studentPortal/leaderBoard' element={<LeaderBorad />} />
        <Route path='/studentPortal/quiz' element={<Quiz />} />
        <Route path='/studentPortal/studentLogin' element={<StudentLogin />} />
        <Route path='/studentPortal/studentReistration' element={<StudentRegistration />} />
        {/* Admin Portal */}
        <Route path='/dashboard/dashboard' element={<DashBoard />} />
        <Route path='/dashboard/adminLogin' element={<AdminLogin />} />
        <Route path='/dashboard/assignment' element={<Assignments />} />
        <Route path='/dashboard/assignmentMark' element={<AssignmentMark />} />
        <Route path='/dashboard/quizzes' element={<Quizzes />} />
        <Route path='/dashboard/videos' element={<Videos />} />
      </Routes>
    </div>
  )
}

export default App
