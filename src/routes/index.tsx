import { Navigate, Route, Routes } from 'react-router-dom'
import {
  AuthHomePage,
  ClassPage,
  DashboardSchoolPage,
  DataDashboardSchoolPage,
  EditPasswordPage,
  EditProfilePage,
  FrequencyPage,
  HomePage,
  Login,
  PasswordPage,
  PeriodPage,
  Register,
  RequestPage,
  RetrieveClassPage,
  RetrievePeriodPage,
  RetrieveSchoolPage,
  RetrieveUserPage,
  SchoolPage,
  StudentPage,
  UserPage,
  ViewClassPage,
  ViewDashboardSchoolPage,
  ViewSchoolPage,
  ViewUserPage,
} from '../pages'
import { ProtectedAdmin, ProtectedAuth } from '../shared/components'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password/:userId/:token" element={<PasswordPage />} />
      <Route element={<ProtectedAuth />}>
        <Route element={<ProtectedAdmin />}>
          <Route path="/dash" element={<AuthHomePage isHome />} />
          <Route path="/user" element={<UserPage />}>
            <Route path=":user_id" element={<RetrieveUserPage />}>
              <Route path=":view" element={<ViewUserPage />} />
            </Route>
          </Route>
          <Route path="/school" element={<SchoolPage />}>
            <Route path=":school_id" element={<RetrieveSchoolPage />}>
              <Route path=":view" element={<ViewSchoolPage />} />
            </Route>
          </Route>
          <Route path="/class" element={<ClassPage />}>
            <Route path=":class_id" element={<RetrieveClassPage />}>
              <Route path=":view" element={<ViewClassPage />} />
            </Route>
          </Route>
          <Route path="/student" element={<StudentPage />}>
            <Route path=":student_id" element={<RetrieveSchoolPage />}>
              <Route path=":view" element={<ViewSchoolPage />} />
            </Route>
          </Route>
          <Route path="/frequency" element={<FrequencyPage />} />
          <Route path="/period" element={<PeriodPage />}>
            <Route path=":year_id" element={<RetrievePeriodPage />} />
          </Route>
          <Route path="/request" element={<RequestPage />} />
        </Route>
        <Route path="/home" element={<AuthHomePage />} />
        <Route path="/:school_id" element={<DashboardSchoolPage />}>
          <Route path=":view" element={<ViewDashboardSchoolPage />}>
            <Route path=":id" element={<DataDashboardSchoolPage />} />
          </Route>
        </Route>
        <Route path="/profile/edit" element={<EditProfilePage />}>
          <Route path=":view" element={<EditPasswordPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes