import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosClient';
import DoctorCard from '../../components/doctor/DoctorCard';
import { CardSkeleton } from '../../components/common/LoadingSkeleton';
import {
  Search,
  Calendar,
  Clock,
  ShieldCheck,
  Users,
  Activity,
  ArrowRight,
  Tv,
  CheckCircle2,
  Stethoscope,
  ChevronRight,
  HeartPulse,
  Brain,
  Baby,
  Bone,
  Eye,
  Pill,
} from 'lucide-react';

const departmentList = [
  { name: 'Cardiology', label: 'Cardiology', icon: HeartPulse, count: 'Heart & Vascular' },
  { name: 'Dermatology', label: 'Dermatology', icon: Pill, count: 'Skin Care' },
  { name: 'Pediatrics', label: 'Pediatrics', icon: Baby, count: 'Child Health' },
  { name: 'Orthopedics', label: 'Orthopedics', icon: Bone, count: 'Bones & Joints' },
  { name: 'Neurology', label: 'Neurology', icon: Brain, count: 'Brain & Spine' },
  { name: 'General Medicine', label: 'General Medicine', icon: Stethoscope, count: 'Primary Care' },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [featuredDoctors, setFeaturedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await api.get('/doctors?limit=4');
        if (data.success) {
          setFeaturedDoctors(data.doctors || []);
        }
      } catch (err) {
        console.error('Error fetching featured doctors:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('search', searchQuery.trim());
    if (selectedSpecialty !== 'All') params.append('specialization', selectedSpecialty);
    navigate(`/doctors?${params.toString()}`);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white pt-16 pb-14 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Find and Book Top Specialist Doctors
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
              Schedule verified clinic appointments, monitor your reception queue token in real time, and manage your health records effortlessly.
            </p>
          </div>

          {/* Clean Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white p-2 sm:p-2.5 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center gap-2 max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-2.5 px-3.5 py-2 w-full sm:flex-1">
              <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Doctor name, condition, or specialty..."
                className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
              />
            </div>

            <div className="hidden sm:block w-px h-6 bg-slate-200" />

            <div className="w-full sm:w-44 px-3 py-1">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full text-xs font-medium text-slate-700 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="All">All Specialties</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Neurology">Neurology</option>
                <option value="General Medicine">General Medicine</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 flex-shrink-0"
            >
              <span>Search</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Highlights */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Verified Practitioners
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Sequential Queue Tokens
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Secure Private Records
            </span>
          </div>
        </div>
      </section>

      {/* Specialty Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Browse Specialties
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose a medical department to see available doctors
            </p>
          </div>
          <Link
            to="/doctors"
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>All Specialties</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {departmentList.map((dep) => {
            const Icon = dep.icon;
            return (
              <Link
                key={dep.name}
                to={`/doctors?specialization=${encodeURIComponent(dep.name)}`}
                className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all text-center flex flex-col items-center justify-center space-y-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-brand-50 group-hover:text-brand-600 text-slate-700 flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {dep.label}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{dep.count}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Available Doctors Today
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified specialists ready for appointment booking
            </p>
          </div>
          <Link
            to="/doctors"
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View All Doctors</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredDoctors.map((doc) => (
              <DoctorCard key={doc._id} doctor={doc} />
            ))}
          </div>
        )}
      </section>

      {/* How it Works - 3 Clean Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
          <div className="max-w-xl mx-auto text-center mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              How MediSlot Works
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Simple 3-step appointment and queue management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 font-bold flex items-center justify-center mx-auto text-sm">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900">Choose Specialist & Slot</h3>
              <p className="text-xs text-slate-500">
                Browse doctor profiles, choose an available time slot, and specify your visit reason.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 font-bold flex items-center justify-center mx-auto text-sm">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900">Get Your Token</h3>
              <p className="text-xs text-slate-500">
                A daily queue token is automatically generated with an estimated waiting time.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 font-bold flex items-center justify-center mx-auto text-sm">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900">Attend Consultation</h3>
              <p className="text-xs text-slate-500">
                Report to the clinic reception, consult your physician, and receive authorized digital records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reception Board CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Clinic Reception Queue Display</h3>
              <p className="text-xs text-slate-500">Live reception display designed for hospital waiting lobby monitors</p>
            </div>
          </div>
          <Link
            to="/queue-display"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap"
          >
            Open Reception Display
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
