import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../api/axiosClient';
import DoctorCard from '../../components/doctor/DoctorCard';
import { CardSkeleton } from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import { useDebounce } from '../../hooks/useDebounce';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Stethoscope,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Clock,
} from 'lucide-react';

const Doctors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialSpecialization = searchParams.get('specialization') || 'All';

  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(initialSearch);
  const [selectedSpecialization, setSelectedSpecialization] = useState(initialSpecialization);
  const [availability, setAvailability] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDoctors, setTotalDoctors] = useState(0);

  const debouncedSearch = useDebounce(search, 350);

  useEffect(() => {
    let isSubscribed = true;
    const fetchSpecializations = async () => {
      try {
        const { data } = await api.get('/doctors/meta/specializations');
        if (data.success && isSubscribed) {
          setSpecializations(data.specializations || []);
        }
      } catch (err) {
        console.error('Failed to load specializations:', err);
      }
    };

    fetchSpecializations();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.append('search', debouncedSearch);
      if (selectedSpecialization && selectedSpecialization !== 'All') {
        params.append('specialization', selectedSpecialization);
      }
      if (availability !== '') {
        params.append('availability', availability);
      }
      params.append('sortBy', sortBy);
      params.append('page', currentPage);
      params.append('limit', 8);

      const { data } = await api.get(`/doctors?${params.toString()}`);
      if (data.success) {
        setDoctors(data.doctors || []);
        setTotalPages(data.totalPages || 1);
        setTotalDoctors(data.total || 0);
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, selectedSpecialization, availability, sortBy, currentPage]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (debouncedSearch) count += 1;
    if (selectedSpecialization !== 'All') count += 1;
    if (availability !== '') count += 1;
    return count;
  }, [debouncedSearch, selectedSpecialization, availability]);

  const handleResetFilters = useCallback(() => {
    setSearch('');
    setSelectedSpecialization('All');
    setAvailability('');
    setSortBy('rating');
    setCurrentPage(1);
    setSearchParams({});
  }, [setSearchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200 mb-3 shadow-2xs">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Verified Medical Specialists</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Consulting Specialists Directory
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 leading-relaxed font-normal">
            Browse verified clinical practitioners, inspect consultation fees, check real-time availability, and reserve conflict-free appointment slots.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by doctor name, specialty, or clinic..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setCurrentPage(1);
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedSpecialization}
              onChange={(e) => {
                setSelectedSpecialization(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer"
            >
              <option value="All">All Specializations</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={availability}
              onChange={(e) => {
                setAvailability(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer"
            >
              <option value="">Any Status</option>
              <option value="true">Available Now</option>
              <option value="false">Off-duty</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer"
            >
              <option value="rating">Top Rated ⭐</option>
              <option value="experience">Experience (Highest)</option>
              <option value="fee">Fee: Low to High</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider flex-shrink-0">
            Departments:
          </span>
          <button
            onClick={() => {
              setSelectedSpecialization('All');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedSpecialization === 'All'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            All Departments
          </button>
          {specializations.map((spec) => (
            <button
              key={spec}
              onClick={() => {
                setSelectedSpecialization(spec);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                selectedSpecialization === spec
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
            <span className="text-slate-400 font-medium">Applied Filters ({activeFiltersCount}):</span>
            {debouncedSearch && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-800 font-semibold">
                Keyword: "{debouncedSearch}"
                <button onClick={() => setSearch('')} className="hover:text-rose-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {selectedSpecialization !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brand-50 text-brand-700 font-semibold border border-brand-200">
                Department: {selectedSpecialization}
                <button onClick={() => setSelectedSpecialization('All')} className="hover:text-rose-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {availability !== '' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                Status: {availability === 'true' ? 'Available' : 'Off-duty'}
                <button onClick={() => setAvailability('')} className="hover:text-rose-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-xs text-brand-600 hover:text-brand-800 font-bold ml-auto hover:underline"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
        <p>
          Showing <span className="font-extrabold text-slate-900">{doctors.length}</span> of{' '}
          <span className="font-extrabold text-slate-900">{totalDoctors}</span> verified medical practitioners
        </p>
        <p>Page {currentPage} of {totalPages}</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Stethoscope}
          title="No Doctors Found"
          description="We couldn't find any medical practitioners matching your criteria. Try resetting your search filters."
          actionText="Clear All Filters"
          onAction={handleResetFilters}
        />
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <span className="text-xs font-bold text-slate-700 px-3 py-1 bg-white rounded-xl border border-slate-200">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs transition-all cursor-pointer"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Doctors;
