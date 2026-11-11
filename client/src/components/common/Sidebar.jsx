import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  Clock,
  FileText,
  User,
  Users,
  Settings,
  Stethoscope,
  LogOut,
  Sliders,
  Tv,
  ShieldCheck,
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const role = user.role;

  const patientNav = [
    { name: 'Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
    { name: 'My Appointments', path: '/patient/appointments', icon: Calendar },
    { name: 'Live Token Queue', path: '/patient/tokens', icon: Clock },
    { name: 'Medical Reports', path: '/patient/reports', icon: FileText },
    { name: 'Find Doctors', path: '/doctors', icon: Stethoscope },
    { name: 'Profile', path: '/patient/profile', icon: User },
  ];

  const doctorNav = [
    { name: 'Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
    { name: 'Queue Manager', path: '/doctor/queue', icon: Clock },
    { name: 'Appointments', path: '/doctor/appointments', icon: Calendar },
    { name: 'Availability & Slots', path: '/doctor/availability', icon: Sliders },
    { name: 'Patient Directory', path: '/doctor/patients', icon: Users },
    { name: 'Medical Reports', path: '/doctor/reports', icon: FileText },
    { name: 'Profile', path: '/doctor/profile', icon: User },
  ];

  const adminNav = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Manage Doctors', path: '/admin/doctors', icon: Stethoscope },
    { name: 'Manage Patients', path: '/admin/patients', icon: Users },
    { name: 'Appointments', path: '/admin/appointments', icon: Calendar },
    { name: 'Monitor Queues', path: '/admin/queues', icon: Clock },
    { name: 'Reception Display', path: '/queue-display', icon: Tv },
  ];

  const navItems = role === 'admin' ? adminNav : role === 'doctor' ? doctorNav : patientNav;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-60 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-3.5 flex-shrink-0">
      <div>
        <div className="mb-4 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Portal</p>
            <p className="text-xs font-bold text-slate-800 capitalize">{role} Workspace</p>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>

        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="pt-3 border-t border-slate-100 space-y-1">
        <div className="flex items-center gap-2.5 px-2.5 py-2">
          <img
            src={user.avatar || `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(user.name)}`}
            alt={user.name}
            className="w-7 h-7 rounded-lg object-cover bg-slate-100 border border-slate-200"
          />
          <div className="overflow-hidden flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-800 truncate">{user.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
