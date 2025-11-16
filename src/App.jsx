// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { AppProvider } from './contexts/AppContext'
import { NotificationProvider } from './contexts/NotificationContext'
import AuthGuard from './components/auth/AuthGuard'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import MotherLayout from './components/layout/MotherLayout'
import CHWLayout from './components/layout/CHWLayout'
import HospitalLayout from './components/layout/HospitalLayout'
import AdminLayout from './components/layout/AdminLayout'
import MotherDashboard from './pages/mother/MotherDashboard'
import ChildProfile from './pages/mother/ChildProfile'
import MotherVaccinationSchedule from './pages/mother/VaccinationSchedule'
import MotherReminders from './pages/mother/Reminders'
import Profile from './pages/shared/Profile'
import CHWDashboard from './pages/health-worker/CHWDashboard'
import AssignedMothers from './pages/health-worker/AssignedMothers'
import DefaultersList from './pages/health-worker/DefaultersList'
import FieldReports from './pages/health-worker/FieldReports' 
import RecordVaccination from './pages/health-worker/RecordVaccination'
import HospitalDashboard from './pages/hospital/HospitalDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import './styles/globals.css'

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <AppProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Mother Routes */}
                <Route path="/mother" element={
                  <AuthGuard requiredRole="mother">
                    <MotherLayout>
                      <MotherDashboard />
                    </MotherLayout>
                  </AuthGuard>
                } />
                <Route path="/mother/child/:childId" element={
                  <AuthGuard requiredRole="mother">
                    <MotherLayout>
                      <ChildProfile />
                    </MotherLayout>
                  </AuthGuard>
                } />

                <Route path="/mother/vaccination-schedule" element={
                  <AuthGuard requiredRole="mother">
                    <MotherLayout>
                      <MotherVaccinationSchedule />
                    </MotherLayout>
                  </AuthGuard>
                } />

                <Route path="/mother/reminders" element={
                  <AuthGuard requiredRole="mother">
                    <MotherLayout>
                      <MotherReminders />
                    </MotherLayout>
                  </AuthGuard>
                } />
                
                <Route path="/mother/profile" element={
                  <AuthGuard requiredRole="mother">
                    <MotherLayout>
                      <Profile />
                    </MotherLayout>
                  </AuthGuard>
                } />
                {/* Health Worker Routes */}
                <Route path="/health-worker" element={
                  <AuthGuard requiredRole="health-worker">
                    <CHWLayout>
                      <CHWDashboard />
                    </CHWLayout>
                  </AuthGuard>
                } />
                <Route path="/health-worker/record-vaccination" element={
                  <AuthGuard requiredRole="health-worker">
                    <CHWLayout>
                      <RecordVaccination />
                    </CHWLayout>
                  </AuthGuard>
                } />
               <Route path="/health-worker/assigned-mothers" element={
                  <AuthGuard requiredRole="health-worker">
                    <CHWLayout>
                      <AssignedMothers />
                    </CHWLayout>
                  </AuthGuard>
                } />
                <Route path="/health-worker/defaulters-list" element={
                  <AuthGuard requiredRole="health-worker">
                    <CHWLayout>
                      <DefaultersList />
                    </CHWLayout>
                  </AuthGuard>
                } />
                <Route path="/health-worker/field-reports" element={
                  <AuthGuard requiredRole="health-worker">
                    <CHWLayout>
                      <FieldReports />
                    </CHWLayout>
                  </AuthGuard>
                } /> 
                 <Route path="/health-worker/profile" element={
                  <AuthGuard requiredRole="health-worker">
                    <CHWLayout>
                      <Profile />
                    </CHWLayout>
                  </AuthGuard>
                } />
                {/* Hospital Routes */}
                <Route path="/hospital" element={
                  <AuthGuard requiredRole="hospital">
                    <HospitalLayout>
                      <HospitalDashboard />
                    </HospitalLayout>
                  </AuthGuard>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                  <AuthGuard requiredRole="admin">
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  </AuthGuard>
                } />
              </Routes>
            </div>
          </Router>
        </AppProvider>
      </AuthProvider>
    </NotificationProvider>
  )
}

export default App