import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { RADAR_DATA, TRAITS, getIcon, USER_PROFILE } from '../constants';
import { TraitLevel, Trait } from '../types';
import { ChevronDown, Utensils, Sparkles, Activity, Check, Shield, FlaskConical, Clock, X, ArrowRight, Loader2, Plus } from 'lucide-react';
import { useAuth } from './AuthContext';
import { supabase } from '../services/supabase';

const Badge = ({ level }: { level: TraitLevel }) => {
  let bg = 'bg-gray-100 text-gray-600';
  if (level === TraitLevel.GIFTED) bg = 'bg-pink-100 text-pink-600';
  else if (level === TraitLevel.EXCELLENT) bg = 'bg-blue-100 text-blue-600';
  else if (level === TraitLevel.STRONG) bg = 'bg-emerald-100 text-emerald-600';
  else if (level === TraitLevel.POTENTIAL) bg = 'bg-orange-100 text-orange-600';

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${bg}`}>
      {level}
    </span>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 text-xs z-50 min-w-[120px] animate-in fade-in zoom-in-95 duration-200">
        <p className="font-bold text-slate-900 mb-2 border-b border-gray-100 pb-2 text-sm">{data.subject}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 shadow-sm shadow-teal-200"></span>
            <span className="text-gray-500 font-medium">Score</span>
          </div>
          <div className="flex items-baseline">
            <span className="text-slate-900 font-black text-base mr-0.5">{data.A}</span>
            <span className="text-gray-400 text-[10px] font-medium">/{data.fullMark}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

interface DashboardProps {
  onTraitClick: (trait: Trait) => void;
  isTrackingMode?: boolean;
}

export const Dashboard: React.FC<DashboardProps & { selectedProfileId: string | null, onProfileChange: (id: string) => void }> = ({
  onTraitClick,
  isTrackingMode = false,
  selectedProfileId,
  onProfileChange
}) => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeKit, setActiveKit] = useState<any>(null);
  const [reportData, setReportData] = useState<any[]>([]);

  const [viewingProfile, setViewingProfile] = useState<'parent' | 'child'>(isTrackingMode ? 'child' : 'parent');
  const [activeCategory, setActiveCategory] = useState<string>('Talent');
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [showProfileSelector, setShowProfileSelector] = useState(false);

  useEffect(() => {
    setViewingProfile(isTrackingMode ? 'child' : 'parent');
  }, [isTrackingMode]);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id);

      if (data && data.length > 0) {
        setProfiles(data);
        if (!selectedProfileId) {
          onProfileChange(data[0].id);
        }
      }
      setLoading(false);
    };

    fetchProfiles();
  }, [user]);

  useEffect(() => {
    const fetchKitAndReport = async () => {
      if (!selectedProfileId) return;

      setLoading(true);
      // Fetch latest kit
      const { data: kitData } = await supabase
        .from('dna_test_kits')
        .select('*')
        .eq('profile_id', selectedProfileId)
        .order('activated_at', { ascending: false })
        .limit(1)
        .single();

      setActiveKit(kitData);

      if (kitData) {
        // Fetch phenotypes for this profile
        const { data: phenotypes } = await supabase
          .from('user_phenotypes')
          .select(`
            id,
            result_level,
            score_value,
            display_text,
            traits:trait_id (
              trait_id,
              name,
              category,
              icon_name,
              description_en,
              description_th
            )
          `)
          .eq('profile_id', selectedProfileId);

        setReportData(phenotypes || []);
      } else {
        setReportData([]);
      }
      setLoading(false);
    };

    fetchKitAndReport();
  }, [selectedProfileId]);

  useEffect(() => {
    // If kit is completed, auto-switch to results view
    if (activeKit?.status === 'completed' && viewingProfile === 'child') {
      setViewingProfile('parent');
    }
  }, [activeKit?.status, viewingProfile]);

  const selectedProfile = profiles.find(p => p.id === selectedProfileId);

  // Toggle between Account (Results) and Profile (Tracking)
  const toggleProfileView = () => {
    setViewingProfile(prev => prev === 'parent' ? 'child' : 'parent');
  };

  const getProfileName = () => {
    if (viewingProfile === 'parent') return user?.user_metadata?.name || 'Account';
    return selectedProfile?.name || 'Profile';
  };


  // --- Map database data to UI format ---
  const dynamicRadarData = reportData.length > 0
    ? reportData
      .filter(d => d.traits?.category === 'Talent')
      .map(d => ({
        subject: d.traits?.name,
        A: d.score_value,
        fullMark: 100
      }))
    : RADAR_DATA;

  const dynamicTraits = reportData.length > 0
    ? reportData.map((d, index) => ({
      id: String(d.id || index),
      category: d.traits?.category,
      name: d.traits?.name,
      description: d.display_text || d.traits?.description_en,
      level: d.result_level as TraitLevel,
      score: d.score_value,
      iconName: d.traits?.icon_name || 'activity'
    }))
    : []; // Empty if no report data to avoid showing static data incorrectly

  // --- SHARED HEADER ---
  const Header = () => (
    <header className="flex justify-between items-center p-6 bg-transparent sticky top-0 z-20 backdrop-blur-md">
      <div>
        <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-0.5">Welcome Back,</p>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">{user?.user_metadata?.name || 'User'}</h1>
      </div>

      <div className="flex items-center">
        <button
          onClick={() => setShowProfileSelector(true)}
          className="flex items-center space-x-2 bg-white border border-gray-100 shadow-sm rounded-full pl-1 pr-3 py-1 transition-all active:scale-95 hover:shadow-md"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm shrink-0 ${viewingProfile === 'child' ? 'bg-teal-100' : 'bg-purple-100'}`}>
            {viewingProfile === 'child' ? (
              // Profile Avatar
              <div className="w-full h-full bg-[#8D6E63] flex items-center justify-center pt-1">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="40" r="25" fill="#5D4037" />
                  <path d="M20 90 Q50 60 80 90" fill="#5D4037" />
                </svg>
              </div>
            ) : (
              // User Avatar
              <img src={USER_PROFILE.avatarUrl} alt={user?.user_metadata?.name || 'User'} className="w-full h-full object-cover" />
            )}
          </div>
          <span className="text-sm font-bold text-slate-800">{getProfileName()}</span>
          <ChevronDown size={14} className="text-gray-400" />
        </button>
      </div>
    </header>
  );

  const ProfileSelectorModal = () => (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm bg-white rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-900">Select Profile</h2>
          <button
            onClick={() => setShowProfileSelector(false)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="space-y-3">
          {/* Account Option */}
          <button
            onClick={() => {
              setViewingProfile('parent');
              setShowProfileSelector(false);
            }}
            className={`w-full flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all ${viewingProfile === 'parent' ? 'border-teal-500 bg-teal-50' : 'border-gray-50 hover:border-gray-100 bg-gray-50/50'}`}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
              <img src={USER_PROFILE.avatarUrl} className="w-full h-full object-cover" alt="User" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-slate-900 text-sm">Main Account</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Settings & Preferences</p>
            </div>
          </button>

          <div className="h-px bg-gray-100 my-4 mx-2"></div>

          {/* DNA Profiles */}
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => {
                onProfileChange(profile.id);
                setViewingProfile('child');
                setShowProfileSelector(false);
              }}
              className={`w-full flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all ${selectedProfileId === profile.id && viewingProfile === 'child' ? 'border-teal-500 bg-teal-50' : 'border-gray-50 hover:border-gray-100 bg-gray-50/50'}`}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-[#8D6E63] flex items-center justify-center pt-1">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="40" r="25" fill="#5D4037" />
                  <path d="M20 90 Q50 60 80 90" fill="#5D4037" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-900 text-sm">{profile.name}</h3>
                <p className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">DNA Insights Available</p>
              </div>
              {selectedProfileId === profile.id && viewingProfile === 'child' && (
                <div className="flex-1 flex justify-end">
                  <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-sm">
                    <Check size={14} strokeWidth={4} />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            // Close selector and maybe redirect to profile tab to add new
            setShowProfileSelector(false);
            // In a real app, this might trigger the LinkKitFlow directly
          }}
          className="w-full mt-6 py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 text-sm font-bold hover:border-teal-200 hover:text-teal-500 transition-all flex items-center justify-center space-x-2"
        >
          <Plus size={18} />
          <span>Add New DNA Profile</span>
        </button>
      </div>
    </div>
  );

  // --- TRACKING VIEW (LEO) ---
  if (viewingProfile === 'child') {
    return (
      <div className="pb-24 min-h-screen bg-gray-50 font-sans">
        <Header />
        {showProfileSelector && <ProfileSelectorModal />}

        <main className="px-6 space-y-6 animate-in slide-in-from-right duration-500">

          {/* Tracking Status Card */}
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="flex justify-between items-center mb-8 relative z-10">
              <h2 className="text-xl font-bold text-slate-900">Tracking Status</h2>
              <div className="bg-teal-50 text-teal-600 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider">
                #{activeKit?.id || 'NO KIT'}
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-0 relative z-10 pl-2">
              {/* Connecting Line */}
              <div className="absolute left-5 top-5 bottom-8 w-0.5 bg-gray-100 -translate-x-1/2 -z-10"></div>

              {/* Step 1: Activated */}
              <div className="flex items-center mb-8 group">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ring-4 ring-white z-10 shrink-0 shadow-sm transition-transform group-hover:scale-105 ${activeKit ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {activeKit ? <Check size={20} strokeWidth={3} /> : <div className="w-2 h-2 bg-gray-300 rounded-full" />}
                </div>
                <div className="ml-5">
                  <h3 className="font-bold text-slate-800 text-sm">Kit Activated</h3>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">{activeKit?.activated_at ? new Date(activeKit.activated_at).toLocaleDateString() : 'Pending'}</p>
                </div>
              </div>

              {/* Step 2: Received / Laboratory */}
              <div className="flex items-center mb-8 group">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ring-4 ring-white z-10 shrink-0 shadow-sm transition-transform group-hover:scale-105 ${['laboratory', 'processing', 'completed'].includes(activeKit?.status) ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {['laboratory', 'processing', 'completed'].includes(activeKit?.status) ? <Check size={20} strokeWidth={3} /> : <div className="w-2 h-2 bg-gray-300 rounded-full" />}
                </div>
                <div className="ml-5">
                  <h3 className="font-bold text-slate-800 text-sm">Sample Received</h3>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">{activeKit?.laboratory_at ? new Date(activeKit.laboratory_at).toLocaleDateString() : 'Waiting for courier'}</p>
                </div>
              </div>

              {/* Step 3: Lab Processing */}
              <div className="flex items-start mb-8">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ring-4 ring-white z-10 shrink-0 shadow-sm transition-transform group-hover:scale-105 ${['processing', 'completed'].includes(activeKit?.status) ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {activeKit?.status === 'completed' ? <Check size={20} strokeWidth={3} /> : <FlaskConical size={18} className={activeKit?.status === 'processing' ? 'animate-pulse' : ''} />}
                  {activeKit?.status === 'processing' && <div className="absolute inset-0 rounded-full border-2 border-white opacity-40 animate-ping"></div>}
                </div>
                <div className="ml-5 pt-0.5">
                  <h3 className="font-bold text-slate-900 text-base">Lab Processing</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-teal-600 font-bold uppercase tracking-wide mr-2">{activeKit?.status === 'processing' ? 'Current Stage' : 'Status'}</span>
                    {activeKit?.status === 'processing' && (
                      <span className="flex space-x-1">
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce delay-75"></span>
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce delay-150"></span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 4: Result Ready */}
              <div className={`flex items-center ${activeKit?.status !== 'completed' ? 'opacity-40' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ring-4 ring-white z-10 shrink-0 ${activeKit?.status === 'completed' ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {activeKit?.status === 'completed' ? <Check size={20} strokeWidth={3} /> : <div className="w-3 h-3 bg-gray-300 rounded-full"></div>}
                </div>
                <div className="ml-5">
                  <h3 className="font-bold text-slate-800 text-sm">Result Ready</h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">{activeKit?.completed_at ? new Date(activeKit.completed_at).toLocaleDateString() : 'Estimated 10-14 days'}</p>
                </div>
              </div>
            </div>

            {/* Status Message */}
            <div className="mt-8 bg-emerald-50/80 rounded-2xl p-4 flex items-start space-x-4 border border-emerald-100">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <Shield size={16} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-emerald-900 font-bold mb-0.5">{activeKit?.status === 'completed' ? 'Results Ready' : 'Secure Processing'}</p>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  {activeKit?.status === 'completed' ? 'Your genetic insights are now available for review.' : 'Your sample is being handled with care by our experts in our certified lab.'}
                </p>
              </div>
            </div>
          </div>

          {/* Countdown Card */}
          <div className="bg-slate-900 rounded-[32px] p-8 text-center text-white relative overflow-hidden shadow-xl shadow-slate-200 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-110 duration-700"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500 opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

            {/* Silhouette Icon Background */}
            <div className="absolute bottom-0 right-4 text-white opacity-5 transform translate-y-4">
              <Clock size={120} />
            </div>

            <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-3">Time Remaining</p>
            <h2 className="text-5xl font-black mb-2 tracking-tighter">10 <span className="text-2xl font-bold text-slate-500">Days</span></h2>
            <p className="text-xs text-slate-400">Estimated until results are ready</p>
          </div>

          {/* What to expect */}
          <div>
            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="font-bold text-lg text-slate-900">What to expect</h3>
              <button
                onClick={() => setShowLearnMore(true)}
                className="text-[10px] font-bold text-teal-600 tracking-wider uppercase hover:underline"
              >
                Learn More
              </button>
            </div>
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex items-center space-x-5 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowLearnMore(true)}>
              <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <FlaskConical size={28} strokeWidth={2} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">The Genomic Analysis Phase</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Our lab is currently mapping over 100 markers to identify talent clusters.
                </p>
              </div>
            </div>
          </div>

        </main>

        {/* Learn More Modal/Sheet */}
        {showLearnMore && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 animate-in slide-in-from-bottom duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">Genomic Analysis</h3>
                <button onClick={() => setShowLearnMore(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop" className="w-full h-48 object-cover rounded-2xl mb-4" alt="Lab" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  During this phase, our technicians extract DNA from the saliva sample you provided. We then use microarray technology to genotype over 700,000 SNPs (Single Nucleotide Polymorphisms).
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Once the raw data is generated, it goes through our proprietary algorithms to interpret specific genetic markers related to:
                </p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-center text-sm font-bold text-slate-800">
                    <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3"><Sparkles size={12} /></div>
                    Talent & Intelligence
                  </li>
                  <li className="flex items-center text-sm font-bold text-slate-800">
                    <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mr-3"><Utensils size={12} /></div>
                    Nutrition & Metabolism
                  </li>
                  <li className="flex items-center text-sm font-bold text-slate-800">
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-3"><Activity size={12} /></div>
                    Sports Performance
                  </li>
                </ul>
                <button onClick={() => setShowLearnMore(false)} className="w-full bg-teal-500 text-white font-bold py-3.5 rounded-2xl mt-4 shadow-lg shadow-teal-200">
                  Got it
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- RESULTS VIEW (SARAH) ---

  // Filter traits based on active category
  const filteredTraits = dynamicTraits.filter(t => t.category === activeCategory);

  // Find the top trait for the hero card
  const topTrait = filteredTraits.length > 0
    ? filteredTraits.reduce((prev, current) => (prev.score > current.score) ? prev : current)
    : null;

  // Get remaining traits for the grid
  const otherTraits = topTrait
    ? filteredTraits.filter(t => t.id !== topTrait.id)
    : [];

  const TabButton = ({ category, label, icon: Icon }: { category: string, label: string, icon: any }) => {
    const isActive = activeCategory === category;
    return (
      <button
        onClick={() => setActiveCategory(category)}
        className={`flex-1 flex items-center justify-center space-x-2 py-2.5 text-sm font-bold rounded-full transition-all duration-200 ${isActive
          ? 'bg-white shadow-md text-slate-800'
          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
          }`}
      >
        <Icon size={16} className={isActive ? 'text-slate-800' : 'text-gray-400'} />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className="pb-24 min-h-screen bg-gray-50 font-sans">
      <Header />
      {showProfileSelector && <ProfileSelectorModal />}

      <main className="px-6 space-y-6 animate-in slide-in-from-left duration-500">

        {/* Radar Chart Card */}
        <div className="bg-white rounded-[32px] p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-teal-50/50 to-transparent pointer-events-none" />
          <div className="h-[280px] w-full flex justify-center items-center relative z-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dynamicRadarData}>
                <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2dd4bf', strokeWidth: 1, strokeDasharray: '3 3' }} />
                <Radar
                  name="My DNA"
                  dataKey="A"
                  stroke="#14b8a6"
                  strokeWidth={3}
                  fill="#2dd4bf"
                  fillOpacity={0.2}
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#14b8a6' }}
                />
              </RadarChart>
            </ResponsiveContainer>

            {/* Decorative Circles behind chart */}
            <div className="absolute w-full h-full pointer-events-none flex items-center justify-center">
              <div className="w-2/3 h-2/3 border border-teal-100 rounded-full animate-pulse opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-gray-100 rounded-full p-1 shadow-inner">
          <TabButton category="Talent" label="TALENT" icon={Sparkles} />
          <TabButton category="Nutrition" label="DIET" icon={Utensils} />
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 size={40} className="text-teal-500 animate-spin mb-4" />
            <p className="text-gray-400 font-medium">Fetching DNA results...</p>
          </div>
        ) : topTrait ? (
          <>
            {/* Hero Card - Top Trait */}
            <div
              onClick={() => onTraitClick(topTrait)}
              className={`
                rounded-[32px] p-6 text-white shadow-lg relative overflow-hidden group hover:scale-[1.1] transition-transform duration-300 cursor-pointer
                ${activeCategory === 'Talent' ? 'bg-gradient-to-br from-[#8b5cf6] to-[#6366f1] shadow-purple-200' : ''}
                ${activeCategory === 'Nutrition' ? 'bg-gradient-to-br from-teal-400 to-emerald-600 shadow-teal-200' : ''}
            `}>
              {/* Decorative background elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-black opacity-10 rounded-full blur-xl"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                    {getIcon(topTrait.iconName, 24, 'text-white')}
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-bold tracking-wider">
                    {topTrait.level}
                  </div>
                </div>

                <p className="text-xs font-medium text-white/80 tracking-wider uppercase mb-1">
                  Top {activeCategory}
                </p>
                <h2 className="text-2xl font-bold mb-2">{topTrait.name}</h2>
                <p className="text-sm text-white/90 leading-relaxed opacity-90 line-clamp-2">
                  {topTrait.description}
                </p>
              </div>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-2 gap-4">
              {otherTraits.map((trait) => (
                <div
                  key={trait.id}
                  onClick={() => onTraitClick(trait)}
                  className="bg-white p-5 rounded-[28px] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-40 group cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${trait.level === TraitLevel.GIFTED ? 'bg-pink-50 text-pink-500' :
                      trait.level === TraitLevel.EXCELLENT ? 'bg-blue-50 text-blue-500' :
                        trait.level === TraitLevel.STRONG ? 'bg-emerald-50 text-emerald-500' :
                          'bg-orange-50 text-orange-500'
                      }`}>
                      {getIcon(trait.iconName, 20)}
                    </div>
                    <Badge level={trait.level} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-primary transition-colors">{trait.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400 bg-white rounded-[32px] border border-dashed border-gray-200 p-8">
            <div className="bg-gray-100 p-4 rounded-full mb-3 text-gray-300">
              <Sparkles size={32} />
            </div>
            <h3 className="text-slate-900 font-bold mb-1">Results in Progress</h3>
            <p className="text-xs leading-relaxed max-w-[200px] mx-auto">
              We're still analyzing the DNA data for this profile. We'll notify you as soon as the results are ready!
            </p>
          </div>
        )}

      </main>
    </div>
  );
};