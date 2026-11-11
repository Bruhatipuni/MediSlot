import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Clock, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">MediSlot</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Doctor appointment scheduling and real-time reception queue management system.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Encrypted Patient Data</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-white transition-colors">Specialist Doctors</Link>
              </li>
              <li>
                <Link to="/queue-display" className="hover:text-white transition-colors">Reception Board</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">Register</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Specialties</h4>
            <ul className="space-y-2">
              <li>Cardiology & Heart</li>
              <li>Dermatology & Skin</li>
              <li>Pediatrics & Child Health</li>
              <li>Orthopedics & Spine</li>
              <li>Neurology & Brain</li>
              <li>General Medicine</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Clinic Information</h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>Metro Healthcare Tech Park, Suite 400</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>Helpline: +91 (022) 4900-5500</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>Mon - Sat: 08:30 AM - 07:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} MediSlot Healthcare System. All rights reserved.</p>
          <p>Third-Year CSE Semester Capstone Project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
