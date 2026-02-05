import React, { useState } from 'react';
import { Settings, ChevronLeft, ChevronRight, User, Plus, Check, Camera } from 'lucide-react';
import { USER_PROFILE } from '../constants';

interface ProfileProps {
    // Add any props if needed
}

export const Profile: React.FC<ProfileProps> = () => {
  const [view, setView] = useState<'main' | 'settings'>('main');

  if (view === 'settings') {
    return <AccountSettings onBack={() => setView('main')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <button className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
            <ChevronLeft size={24} className="text-slate-800" />
        </button>
        <h1 className="text-lg font-bold text-slate-900">Profile</h1>
        <button className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
            <Settings size={20} className="text-slate-800" />
        </button>
      </div>

      <div className="px-6 pt-6 pb-8 text-center bg-white rounded-b-[32px] shadow-sm mb-6">
         <div className="relative inline-block mb-4">
             <div className="w-24 h-24 rounded-full p-1 border-2 border-gray-100">
                <img 
                    src={USER_PROFILE.avatarUrl} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                />
             </div>
             <div className="absolute bottom-1 right-0 bg-teal-400 text-white p-1 rounded-full border-2 border-white">
                <Check size={12} strokeWidth={4} />
             </div>
         </div>
         <h2 className="text-xl font-bold text-slate-900 mb-1">Sarah Jenkins</h2>
         <div className="inline-block bg-teal-50 text-teal-600 px-3 py-1 rounded-full text-xs font-bold mb-2">
            Premium Member
         </div>
         <p className="text-xs text-gray-400">Member since Jan 2023</p>
      </div>

      <div className="px-6 space-y-8">
        
        {/* Family DNA Profiles */}
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-slate-900">Family DNA Profiles</h3>
                <button className="text-teal-500 text-sm font-bold">Edit</button>
            </div>
            <div className="flex space-x-6">
                {/* Existing Member 1 */}
                <div className="flex flex-col items-center space-y-2">
                    <div className="w-16 h-16 rounded-full border-2 border-teal-500 p-0.5">
                        <img src="https://picsum.photos/id/433/200/200" alt="Nathan" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <span className="text-sm font-medium text-slate-800">Nathan</span>
                </div>
                {/* Existing Member 2 */}
                <div className="flex flex-col items-center space-y-2">
                    <div className="w-16 h-16 rounded-full border-2 border-transparent p-0.5 bg-white shadow-sm">
                        <img src="https://picsum.photos/id/338/200/200" alt="Chloe" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <span className="text-sm font-medium text-slate-800">Chloe</span>
                </div>
                {/* Add New */}
                <button className="flex flex-col items-center space-y-2 group">
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-teal-400 flex items-center justify-center text-teal-500 bg-teal-50/50 group-hover:bg-teal-50 transition-colors">
                        <Plus size={24} />
                    </div>
                    <span className="text-sm font-medium text-teal-500">Add New</span>
                </button>
            </div>
        </div>

        {/* Settings & Security */}
        <div>
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Settings & Security</h3>
             <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <button 
                    onClick={() => setView('settings')}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-500 flex items-center justify-center">
                            <User size={20} />
                        </div>
                        <span className="font-semibold text-slate-900">Account Settings</span>
                    </div>
                    <ChevronRight size={20} className="text-gray-300" />
                </button>
             </div>
        </div>

        {/* Log Out */}
        <button className="w-full py-4 rounded-2xl border-2 border-dashed border-red-200 text-red-500 font-bold hover:bg-red-50 transition-colors">
            Log Out
        </button>

        <p className="text-center text-xs text-gray-300 pb-4">
            Gennova v2.4.1 (Build 842)
        </p>

      </div>
    </div>
  );
};

const AccountSettings = ({ onBack }: { onBack: () => void }) => {
    return (
        <div className="min-h-screen bg-white pb-12 font-sans animate-in slide-in-from-right duration-300 relative z-20">
             {/* Header */}
            <div className="px-6 py-4 flex justify-between items-center">
                <button 
                    onClick={onBack}
                    className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                    <ChevronLeft size={24} className="text-slate-800" />
                </button>
                <h1 className="text-lg font-bold text-slate-900">Account Settings</h1>
                <div className="w-8"></div> {/* Spacer */}
            </div>

            <div className="flex flex-col items-center py-6">
                <div className="w-24 h-24 rounded-full p-1 border border-gray-100 shadow-sm mb-3">
                    <img 
                        src={USER_PROFILE.avatarUrl} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
                <button className="text-sm font-bold text-teal-500 hover:text-teal-600">
                    Change Photo
                </button>
            </div>

            <div className="px-6 space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                    <div className="bg-gray-50 rounded-2xl p-4 font-semibold text-slate-800">
                        Sarah Jenkins
                    </div>
                </div>

                 {/* Email */}
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                    <div className="bg-gray-50 rounded-2xl p-4 font-semibold text-slate-800">
                        sarah.jenkins@example.com
                    </div>
                </div>

                 {/* Phone */}
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
                    <div className="bg-gray-50 rounded-2xl p-4 font-semibold text-slate-800">
                        +1 (555) 123-4567
                    </div>
                </div>

                 {/* Password */}
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                    <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center">
                        <span className="font-bold text-slate-800 text-lg leading-none mt-1">............</span>
                        <button className="text-sm font-bold text-teal-500 hover:text-teal-600">Change</button>
                    </div>
                </div>

                <div className="pt-4">
                    <button className="w-full bg-teal-400 hover:bg-teal-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-100 transition-all active:scale-[0.98]">
                        Save Changes
                    </button>
                    <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-4">
                        Last Updated: Oct 24, 2023
                    </p>
                </div>
            </div>
        </div>
    )
}