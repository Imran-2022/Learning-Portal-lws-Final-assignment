import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AddAssignment, AddQuiz, AddVideo, AdminLogin, Assignments, AssignmentsMark, CoursePlayer, DashBoard, EditQuiz, LeaderBorad, Quiz, Quizzes, StudentLogin, StudentRegistration, UpdateVideo, Videos } from './AllRoutes'
import AssignmentStatus from './components/students/Assignments'
import UpdateAssignment from './components/UpdateAssignment'
import useAuthCheck from './hooks/useAuthCheck'
import PrivateRoute from './components/PrivateRoute'
import PrivateRouteAdmin from './components/PrivateRouteAdmin'

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
        <Route path='/studentPortal/coursePlayer' element={<PrivateRoute><CoursePlayer /></PrivateRoute>} />
        <Route path='/studentPortal/leaderBoard' element={<PrivateRoute><LeaderBorad /></PrivateRoute>} />
        <Route path='/studentPortal/quiz/:quizId' element={<Quiz />} />
        <Route path='/studentPortal/assignment/:assignmentId' element={<AssignmentStatus />} />
        <Route path='/studentPortal/studentLogin' element={<StudentLogin />} />
        <Route path='/studentPortal/studentReistration' element={<StudentRegistration />} />
        {/* Admin Portal */}
        <Route path='/admin/dashboard' element={<PrivateRouteAdmin><DashBoard /></PrivateRouteAdmin>} />
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/admin/dashboard/assignment' element={<PrivateRouteAdmin><Assignments /></PrivateRouteAdmin>} />
        <Route path='/admin/dashboard/assignment/update/:updateAssignmentId' element={<PrivateRouteAdmin><UpdateAssignment /></PrivateRouteAdmin>} />
        <Route path='/admin/dashboard/assignment/add' element={<PrivateRouteAdmin><AddAssignment /></PrivateRouteAdmin>} />
        <Route path='/admin/dashboard/assignmentMark' element={<PrivateRouteAdmin><AssignmentsMark /></PrivateRouteAdmin>} />
        <Route path='/admin/dashboard/quizzes' element={<PrivateRouteAdmin><Quizzes /></PrivateRouteAdmin>} />
        <Route path='/admin/dashboard/videos' element={<PrivateRouteAdmin><Videos /></PrivateRouteAdmin>} />
        <Route path='/admin/dashboard/videos/add' element={<PrivateRouteAdmin><AddVideo /></PrivateRouteAdmin>} />
        <Route path='/admin/dashboard/quizzes/add' element={<PrivateRouteAdmin><AddQuiz /></PrivateRouteAdmin>} />
        <Route path='/admin/dashboard/quizzes/update/:updateQuizId' element={<PrivateRouteAdmin><EditQuiz /></PrivateRouteAdmin>} />
        <Route path='/admin/dashboard/videos/update/:updateVideoId' element={<PrivateRouteAdmin><UpdateVideo /></PrivateRouteAdmin>} />
      </Routes>
    </div>
  )
}

export default App
