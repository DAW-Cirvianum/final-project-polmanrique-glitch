import { useState } from 'react'
import Login from './components/login';
import { Routes, Route } from 'react-router-dom';
import Modules from './components/modules';
import Register from './components/register';
import ModuleDetails from './components/moduleDatails';
import Students from './components/students';
import RegistrationForm from './components/registrationForm';
import Landing from './components/landingPage';
import Profile from './components/porfile';
import AdminDashboard from './components/adminDashboard';
import AddModule from './components/adminComponents/addModule';
import AddCourse from './components/adminComponents/addCourse';
import AddTeacher from './components/adminComponents/addTeacher';
import Courses from './components/courses';
import CourseDetails from './components/courseDetails';
import AssignTutor from './components/adminComponents/assignTutor';
import DeleteModule from './components/adminComponents/deleteModule';
import DeleteCourse from './components/adminComponents/deleteCourse';
import Teachers from './components/teachers';
import DeleteTeacher from './components/adminComponents/deleteTeacher';
import DeleteStudent from './components/adminComponents/deleteStudent';
import MyStudents from './components/myStudents';
import AddMark from './components/addMark';
import AddIncidence from './components/addIncidence';
import SelectNavBar from './components/navBars/selectNabBar.jsx';
import ChangeLenguage from './components/subComponents/changeLenguage';
import StudentDetails from './components/studentDetails';
import UpdateMark from './components/updateMark';
import UpdateIncidence from './components/updateIncidence';
import UndoRegistration from './components/undoRegistration';
import RecoverPassword from './components/recoverPassword';
import UpdatePassword from './components/updatePassword';
import UpdateUsername from './components/updateUsername';
import UpdateEmail from './components/updateMail';

/**
 * Component principal de l'aplicació.
 * Gestiona l'encapçalament (Header) i les rutes (Routes) per a la navegació.
 * @returns {JSX.Element} L'element JSX que representa l'aplicació.
 */
function App() {

  return (
    <div className=''>

      <header>
        <SelectNavBar />
        <ChangeLenguage />
      </header>

      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recoverPassword" element={<RecoverPassword />} />

        {/* ================= AUTHENTICATED USER ================= */}

        <Route path="/profile" element={<Profile />} />
        <Route path="/updateUsername" element={<UpdateUsername />} />
        <Route path="/updateEmail" element={<UpdateEmail />} />
        <Route path="/updatePassword" element={<UpdatePassword />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/undoRegistration" element={<UndoRegistration />} />

        {/* ================= MODULES & COURSES ================= */}

        <Route path="/modules" element={<Modules />} />
        <Route path="/modules/:id" element={<ModuleDetails />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courseDetails/:id" element={<CourseDetails />} />

        {/* ================= STUDENTS ================= */}

        <Route path="/students" element={<Students />} />
        <Route path="/student/:id" element={<StudentDetails />} />
        <Route path="/myStudents" element={<MyStudents />} />

        {/* ================= MARKS ================= */}

        <Route path="/addMark" element={<AddMark />} />
        <Route path="/updateMark/:id" element={<UpdateMark />} />

        {/* ================= INCIDENCES ================= */}

        <Route path="/addIncidence" element={<AddIncidence />} />
        <Route path="/updateIncidence/:id" element={<UpdateIncidence />} />

        {/* ================= TEACHERS ================= */}

        <Route path="/teachers" element={<Teachers />} />
        <Route path="/assignTutor" element={<AssignTutor />} />
        <Route path="/deleteTeacher" element={<DeleteTeacher />} />

        {/* ================= ADMIN ================= */}

        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/addTeacher" element={<AddTeacher />} />
        <Route path="/admin/addCourse" element={<AddCourse />} />
        <Route path="/admin/addModule" element={<AddModule />} />
        <Route path="/deleteCourse" element={<DeleteCourse />} />
        <Route path="/deleteModule" element={<DeleteModule />} />
        <Route path="/deleteStudent" element={<DeleteStudent />} />

      </Routes>

      <footer className='w-full bottom-0 bg-slate-900 p-7 text-center text-white'>
        <p>© 2025 Projecte Final</p>
      </footer>
    </div>
  )
}

export default App