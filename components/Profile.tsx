import React, { useState } from 'react';
import { Settings, ChevronLeft, ChevronRight, User, Plus, Check, Camera, LogOut, Loader2 } from 'lucide-react';
import { USER_PROFILE } from '../constants';
import { useAuth } from './AuthContext';
import { supabase } from '../services/supabase';
import { useEffect } from 'react';

interface ProfileProps {
    onAddNew?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onAddNew }) => {
    const { user, signOut } = useAuth();
    const [view, setView] = useState<'main' | 'settings'>('main');
    const [profiles, setProfiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfiles = async () => {
            if (!user) return;
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', user.id);

            if (data) setProfiles(data);
            setLoading(false);
        };
        fetchProfiles();
    }, [user]);

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
                            src={user?.user_metadata?.avatar_url || USER_PROFILE.avatarUrl}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <div className="absolute bottom-1 right-0 bg-teal-400 text-white p-1 rounded-full border-2 border-white">
                        <Check size={12} strokeWidth={4} />
                    </div>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">{user?.user_metadata?.name || 'User'}</h2>
                <div className="inline-block bg-teal-50 text-teal-600 px-3 py-1 rounded-full text-xs font-bold mb-2">
                    Premium Member
                </div>
                <p className="text-xs text-gray-400">Member since Jan 2023</p>
            </div>

            <div className="px-6 space-y-8">

                {/* DNA Profiles */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-slate-900">DNA Profiles</h3>
                        <button className="text-teal-500 text-sm font-bold">Edit</button>
                    </div>
                    <div className="flex space-x-6 overflow-x-auto no-scrollbar py-1">
                        {loading ? (
                            <div className="flex items-center space-x-2 text-gray-400">
                                <Loader2 size={16} className="animate-spin" />
                                <span className="text-sm">Loading...</span>
                            </div>
                        ) : (
                            profiles.map((profile) => (
                                <div key={profile.id} className="flex flex-col items-center space-y-2 shrink-0">
                                    <div className="w-16 h-16 rounded-full border-2 border-transparent p-0.5 bg-white shadow-sm overflow-hidden">
                                        <div className="w-full h-full bg-[#8D6E63] flex items-center justify-center pt-1">
                                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                                <circle cx="50" cy="40" r="25" fill="#5D4037" />
                                                <path d="M20 90 Q50 60 80 90" fill="#5D4037" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-slate-800">{profile.name}</span>
                                </div>
                            ))
                        )}
                        {/* Add New */}
                        <button
                            onClick={onAddNew}
                            className="flex flex-col items-center space-y-2 group shrink-0"
                        >
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
                <button
                    onClick={signOut}
                    className="w-full py-4 rounded-2xl border-2 border-dashed border-red-200 text-red-500 font-bold hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
                >
                    <LogOut size={18} />
                    <span>Log Out</span>
                </button>

                <p className="text-center text-xs text-gray-300 pb-4">
                    Gennova v2.4.1 (Build 842)
                </p>

            </div>
        </div>
    );
};

const AccountSettings = ({ onBack }: { onBack: () => void }) => {
    const { user } = useAuth();
    const [name, setName] = useState(user?.user_metadata?.name || '');
    const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || USER_PROFILE.avatarUrl);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSave = async () => {
        setUpdating(true);
        setMessage(null);
        try {
            const { error } = await supabase.auth.updateUser({
                data: {
                    name: name,
                    avatar_url: avatarUrl
                }
            });

            if (error) throw error;
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setTimeout(onBack, 1500);
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setUpdating(false);
        }
    };

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
                <div className="relative">
                    <div className="w-24 h-24 rounded-full p-1 border border-gray-100 shadow-sm mb-3 overflow-hidden">
                        <img
                            src={avatarUrl}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Avatar URL</label>
                    <input
                        type="text"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        className="text-xs text-blue-500 bg-gray-50 px-3 py-1 rounded-full border-none focus:ring-1 focus:ring-blue-100 w-48 text-center"
                        placeholder="https://..."
                    />
                </div>
            </div>

            <div className="px-6 space-y-6">
                {message && (
                    <div className={`p-4 rounded-2xl text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {message.text}
                    </div>
                )}

                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-50 rounded-2xl p-4 font-semibold text-slate-800 border-none focus:ring-2 focus:ring-teal-100"
                    />
                </div>

                {/* Email */}
                <div className="space-y-2 opacity-60">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address (Read Only)</label>
                    <div className="bg-gray-50 rounded-2xl p-4 font-semibold text-slate-400">
                        {user?.email}
                    </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
                    <div className="bg-gray-50 rounded-2xl p-4 font-semibold text-slate-800">
                        +1 (555) 123-4567
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        onClick={handleSave}
                        disabled={updating}
                        className="w-full bg-teal-400 hover:bg-teal-500 disabled:bg-teal-200 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-100 transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
                    >
                        {updating && <Loader2 size={18} className="animate-spin" />}
                        <span>{updating ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                    <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-4">
                        Last Updated: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    )
}