import { Navigate, Route, Routes } from 'react-router-dom'
import {
  DisplayRecordPage,
  EditPasswordPage,
  EditProfilePage,
  HomeAuthPage,
  LoginPage,
  PasswordPage,
  PeriodPage,
  RecordPage,
  RegisterPage,
  RetrievePeriodPage,
  RetrieveRecordPage,
  RetrieveSchoolPage,
  RetrieveUserPage,
  SchoolPage,
  UserPage,
  ViewSchoolPage,
  ViewUserPage,
} from '../pages'
import { ProtectedAdmin, ProtectedAuth } from '../shared'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeAuthPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/password/:userId/:token" element={<PasswordPage />} />
      <Route element={<ProtectedAuth />}>
        <Route element={<ProtectedAdmin />}>
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
          <Route path="/period" element={<PeriodPage />}>
            <Route path=":year_id" element={<RetrievePeriodPage />} />
          </Route>
          <Route path="/record" element={<RecordPage />}>
            <Route path=":record_id" element={<RetrieveRecordPage />}>
              <Route path=":view" element={<DisplayRecordPage />} />
            </Route>
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
