import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';

import PublicLayout from './components/layouts/PublicLayout';
import DashboardLayout from './components/layouts/DashboardLayout';

const PageLoader = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-3">
    <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
      Loading MediSlot View...
    </p>
  </div>
);

const Home = lazy(() => import('./pages/public/Home'));
const Doctors = lazy(() => import('./pages/public/Doctors'));
const DoctorDetails = lazy(() => import('./pages/public/DoctorDetails'));
const Login = lazy(() => import('./pages/public/Login'));
const Register = lazy(() => import('./pages/public/Register'));
const QueueDisplay = lazy(() => import('./pages/public/QueueDisplay'));
const Unauthorized = lazy(() => import('./pages/public/Unauthorized'));
const NotFound = lazy(() => import('./pages/public/NotFound'));

const PatientDashboard = lazy(() => import('./pages/patient/PatientDashboard'));
const PatientAppointments = lazy(() => import('./pages/patient/PatientAppointments'));
const BookAppointment = lazy(() => import('./pages/patient/BookAppointment'));
const BookingConfirmation = lazy(() => import('./pages/patient/BookingConfirmation'));
const PatientTokens = lazy(() => import('./pages/patient/PatientTokens'));
const PatientReports = lazy(() => import('./pages/patient/PatientReports'));
const PatientProfile = lazy(() => import('./pages/patient/PatientProfile'));

const DoctorDashboard = lazy(() => import('./pages/doctor/DoctorDashboard'));
const DoctorAppointments = lazy(() => import('./pages/doctor/DoctorAppointments'));
const DoctorQueue = lazy(() => import('./pages/doctor/DoctorQueue'));
const DoctorAvailability = lazy(() => import('./pages/doctor/DoctorAvailability'));
const DoctorPatients = lazy(() => import('./pages/doctor/DoctorPatients'));
const DoctorReports = lazy(() => import('./pages/doctor/DoctorReports'));
const DoctorProfile = lazy(() => import('./pages/doctor/DoctorProfile'));

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminDoctors = lazy(() => import('./pages/admin/AdminDoctors'));
const AdminPatients = lazy(() => import('./pages/admin/AdminPatients'));
const AdminAppointments = lazy(() => import('./pages/admin/AdminAppointments'));
const AdminQueues = lazy(() => import('./pages/admin/AdminQueues'));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#ffffff',
              color: '#0f172a',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
              fontSize: '13px',
              fontWeight: 500,
            },
            success: {
              iconTheme: {
                primary: '#0284c7',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#e11d48',
                secondary: '#ffffff',
              },
            },
          }}
        />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/doctors/:id" element={<DoctorDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/queue-display" element={<QueueDisplay />} />

            <Route element={<DashboardLayout allowedRoles={['patient']} />}>
              <Route path="/patient/dashboard" element={<PatientDashboard />} />
              <Route path="/patient/appointments" element={<PatientAppointments />} />
              <Route path="/patient/book/:doctorId" element={<BookAppointment />} />
              <Route path="/patient/confirmation/:appointmentId" element={<BookingConfirmation />} />
              <Route path="/patient/tokens" element={<PatientTokens />} />
              <Route path="/patient/reports" element={<PatientReports />} />
              <Route path="/patient/profile" element={<PatientProfile />} />
            </Route>

            <Route element={<DashboardLayout allowedRoles={['doctor']} />}>
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor/appointments" element={<DoctorAppointments />} />
              <Route path="/doctor/queue" element={<DoctorQueue />} />
              <Route path="/doctor/availability" element={<DoctorAvailability />} />
              <Route path="/doctor/patients" element={<DoctorPatients />} />
              <Route path="/doctor/reports" element={<DoctorReports />} />
              <Route path="/doctor/profile" element={<DoctorProfile />} />
            </Route>

            <Route element={<DashboardLayout allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/doctors" element={<AdminDoctors />} />
              <Route path="/admin/patients" element={<AdminPatients />} />
              <Route path="/admin/appointments" element={<AdminAppointments />} />
              <Route path="/admin/queues" element={<AdminQueues />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
