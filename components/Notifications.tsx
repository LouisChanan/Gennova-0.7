import React from 'react';
import { Bell, Trophy, ArrowRight, Rocket, BookOpen, ShieldCheck, Lightbulb, ChevronRight } from 'lucide-react';

interface NotificationsProps {
    onViewReport?: () => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ onViewReport }) => {
    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans animate-in slide-in-from-right duration-300">

            {/* Header */}
            <div className="px-6 py-6 flex justify-between items-end sticky top-0 bg-gray-50/90 backdrop-blur-sm z-10">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Notifications</h1>
                <button className="text-xs font-bold text-teal-500 uppercase tracking-wider hover:text-teal-600 mb-1">
                    Clear All
                </button>
            </div>

            <div className="px-6 space-y-8">

                {/* New Section */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-slate-900">New</h2>
                        <span className="bg-teal-100 text-teal-600 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                            2 Updates
                        </span>
                    </div>

                    {/* Hero Card */}
                    <div className="bg-white rounded-[32px] p-1 shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-full bg-slate-900 -skew-x-12 translate-x-10 z-0"></div>

                        <div className="flex relative z-10">
                            <div className="p-5 flex-1">
                                <div className="flex items-center space-x-2 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                                        <Trophy size={14} fill="currentColor" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-400">2m ago</span>
                                </div>

                                <h3 className="text-lg font-black text-slate-900 leading-tight mb-2">
                                    Intelligence Report Ready
                                </h3>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4 max-w-[160px]">
                                    Discover the cognitive potential through the latest DNA sequence analysis.
                                </p>

                                <button
                                    onClick={onViewReport}
                                    className="bg-teal-400 hover:bg-teal-500 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-teal-100 transition-all active:scale-95 flex items-center"
                                >
                                    View Report <ArrowRight size={16} className="ml-2" />
                                </button>
                            </div>

                            {/* Image Section */}
                            <div className="w-24 relative flex items-center justify-center mr-2">
                                <img
                                    src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=300&auto=format&fit=crop"
                                    alt="DNA"
                                    className="w-full h-40 object-cover rounded-[28px] opacity-90 mask-image-gradient"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Active Mission Card */}
                    <div className="mt-4 bg-white rounded-[32px] p-5 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center shrink-0">
                                <Rocket size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Daily Mission Active</h4>
                                <p className="text-xs text-slate-500 mt-0.5 leading-tight max-w-[180px]">
                                    Time to complete today's genetic development activity.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase">15m ago</span>
                            <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                        </div>
                    </div>
                </div>

                {/* Earlier Section */}
                <div>
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Earlier</h2>
                    <div className="space-y-4">

                        {/* Item 1 */}
                        <div className="bg-white rounded-[28px] p-5 shadow-sm border border-gray-50 flex items-center justify-between group cursor-pointer hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-gray-100 text-slate-600 flex items-center justify-center shrink-0">
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">DNA & Musicality</h4>
                                    <p className="text-xs text-slate-500 mt-0.5 max-w-[180px] truncate">
                                        Explore how genetic traits influence...
                                    </p>
                                </div>
                            </div>
                            <span className="text-[10px] font-medium text-gray-400">2h ago</span>
                        </div>

                        {/* Item 2 */}
                        <div className="bg-white rounded-[28px] p-5 shadow-sm border border-gray-50 flex items-center justify-between group cursor-pointer hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-gray-100 text-slate-600 flex items-center justify-center shrink-0">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Account Secured</h4>
                                    <p className="text-xs text-slate-500 mt-0.5 max-w-[180px] truncate">
                                        Your DNA data is encrypted with AES...
                                    </p>
                                </div>
                            </div>
                            <span className="text-[10px] font-medium text-gray-400">Yesterday</span>
                        </div>

                        {/* Item 3 */}
                        <div className="bg-white rounded-[28px] p-5 shadow-sm border border-gray-50 flex items-center justify-between group cursor-pointer hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-gray-100 text-slate-600 flex items-center justify-center shrink-0">
                                    <Lightbulb size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Weekly Summary</h4>
                                    <p className="text-xs text-slate-500 mt-0.5 max-w-[180px] truncate">
                                        Review progress in cognitive skills...
                                    </p>
                                </div>
                            </div>
                            <span className="text-[10px] font-medium text-gray-400">3d ago</span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};