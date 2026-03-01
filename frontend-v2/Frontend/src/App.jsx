import { Routes, Route } from 'react-router-dom'
import Login from './authComponents/login'
import Register from './authComponents/Register'
import Courses from './principalComponents/Courses'
import Modules from './principalComponents/Modules'
import StudentList from './principalComponents/StudentList'
import TeacherList from './principalComponents/TeacherList'
import RegistrationForm from './studentComponents/makeRegistration'
import UndoRegistration from './studentComponents/UndoRegistration'
import AdminDashboard from './panels/adminDashboarad'
import AddCourse from './adminComponents/addCourse'
import DeleteModule from './adminComponents/deleteModule'
import DeleteCourse from './adminComponents/deleteCourse'
import DeleteTeacher from './adminComponents/deleteTeacher'
import DeleteStudent from './adminComponents/deleteStudent'
import AssignTutor from "./adminComponents/assingTutor"
import StudentDashboard from './panels/StudentDashboard'
import TeacherDashboard from './panels/TeacherDashboard'
import MyStudents from './teacherComponents/MyStudents'
import UpdateIncidence from './teacherComponents/UpdataIncidence'
import UpdateMark from './teacherComponents/UpdateMark'
import AddMark from './teacherComponents/addMark'
import AddIncidence from './teacherComponents/addIncidence'
import Profile from './principalComponents/Porfile'
import UpdateMail from './principalComponents/UpdateMail'
import UpdatePassword from './principalComponents/UpdatePassword'
import UpdateUsername from './principalComponents/UpdateUsername'
import ResetPassword from './principalComponents/RecoverPassword'
import StudentDetails from './teacherComponents/StudentDetails'
import AddTeacher from './adminComponents/addTeacher'

import LenguageChanger from './subcomponents/LenguageChanger'
import AddModule from './adminComponents/addModule'
import AdminOptions from './adminComponents/adminOptions'

function App() {
  return (
    <div>
      <LenguageChanger></LenguageChanger>

      <Routes>
        {/* General / Auth routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/updateUsername" element={<UpdateUsername />} />
        <Route path="/updateEmail" element={<UpdateMail />} />
        <Route path="/updatePassword" element={<UpdatePassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />

        {/* Student layout con rutas anidadas */}
        <Route path="/student" element={<StudentDashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="students" element={<StudentList />} />
          <Route path="courses" element={<Courses />} />
          <Route path="modules" element={<Modules />} />
          <Route path="teachers" element={<TeacherList />} />
          <Route path="registrationByCourse" element={<RegistrationForm />} />
          <Route path="undoRegistration" element={<UndoRegistration />} />
        </Route>

        {/* Teacher layout con rutas anidadas */}
        <Route path="/teacher" element={<TeacherDashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="students" element={<StudentList />} />
          <Route path="courses" element={<Courses />} />
          <Route path="modules" element={<Modules />} />
          <Route path="teachers" element={<TeacherList />} />
          <Route path="student/:id" element={<StudentDetails />} />
          <Route path="myStudents" element={<MyStudents />} />
          <Route path="addMark" element={<AddMark />} />
          <Route path="addIncidence" element={<AddIncidence />} />
          <Route path="updateMark/:id" element={<UpdateMark />} />
          <Route path="updateIncidence/:id" element={<UpdateIncidence />} /> {/* <-- con :id */}
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="students" element={<StudentList />} />
          <Route path="courses" element={<Courses />} />
          <Route path="modules" element={<Modules />} />
          <Route path="teachers" element={<TeacherList />} />
          <Route path="options" element={<AdminOptions />} />
          <Route path="addTeacher" element={<AddTeacher />} />
          <Route path="addModule" element={<AddModule />} />
          <Route path="addCourse" element={<AddCourse />} />
          <Route path="deleteModule" element={<DeleteModule />} />
          <Route path="deleteCourse" element={<DeleteCourse />} />
          <Route path="deleteTeacher" element={<DeleteTeacher />} />
          <Route path="deleteStudent" element={<DeleteStudent />} />
          <Route path="assignTutor" element={<AssignTutor />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App