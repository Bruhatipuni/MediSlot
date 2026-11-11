import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ArrowRight } from 'lucide-react';

const DoctorCard = ({ doctor }) => {
  if (!doctor) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition-all">
      <div>
        <div className="flex items-start gap-3.5 mb-3.5">
          <img
            src={doctor.avatar || `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(doctor.name)}`}
            alt={doctor.name}
            className="w-16 h-16 rounded-xl object-cover bg-slate-50 border border-slate-200 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-semibold text-brand-600 block truncate">
              {doctor.specialization}
            </span>
            <h3 className="text-sm font-bold text-slate-900 truncate">
              {doctor.name}
            </h3>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {doctor.qualifications?.join(', ') || 'MBBS'}
            </p>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 mt-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{doctor.rating?.toFixed(1) || '4.9'}</span>
              <span className="text-slate-400 font-normal">({doctor.reviewCount || 40})</span>
            </div>
          </div>
        </div>

        <div className="py-2.5 px-3 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1 mb-3.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Experience</span>
            <span className="font-semibold text-slate-800">{doctor.experienceYears} Years</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Consultation Fee</span>
            <span className="font-bold text-slate-900">₹{doctor.consultationFee}</span>
          </div>
          <div className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-500 truncate border-t border-slate-200/50">
            <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="truncate">{doctor.clinicAddress?.name || doctor.clinicAddress?.city || 'MediSlot Clinic'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
        <Link
          to={`/doctors/${doctor._id}`}
          className="text-center py-2 px-3 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
        >
          Profile
        </Link>
        <Link
          to={`/patient/book/${doctor._id}`}
          className="text-center py-2 px-3 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-colors"
        >
          Book Slot
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
