import React, { useState } from 'react';
import { ArrowLeft, Zap, Keyboard, Calendar, Info, X, Share2, Check, ChevronRight, Camera, User, Ruler, Weight } from 'lucide-react';

interface LinkKitFlowProps {
  onClose: () => void;
  onComplete?: () => void;
}

export const LinkKitFlow: React.FC<LinkKitFlowProps> = ({ onClose, onComplete }) => {
  const [step, setStep] = useState<'scan' | 'register' | 'success'>('scan');

  const handleScanSimulate = () => {
    // Simulate a successful scan after a short delay or interaction
    setTimeout(() => setStep('register'), 500);
  };

  const handleRegisterSubmit = () => {
    setStep('success');
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white font-sans overflow-y-auto animate-in slide-in-from-bottom duration-300">
      
      {/* Custom Animations for Scan UI */}
      <style>{`
        @keyframes breathe {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 0.5; }
        }
        @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 15px rgba(45,212,191,0.5); border-color: rgba(45,212,191,0.8); }
            50% { box-shadow: 0 0 25px rgba(45,212,191,0.9); border-color: rgba(45,212,191,1); }
        }
      `}</style>

      {/* Background Grid Pattern for Scan Step */}
      {step === 'scan' && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
             style={{ 
                 backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
             }}>
        </div>
      )}

      {/* --- STEP 1: SCAN --- */}
      {step === 'scan' && (
        <div className="min-h-screen flex flex-col relative">
          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between relative z-10">
            <button onClick={onClose} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors bg-white shadow-sm border border-gray-100">
               <ArrowLeft size={24} className="text-slate-800" />
            </button>
            <div className="text-center">
                <span className="text-[10px] text-teal-600 font-bold uppercase tracking-widest">Gennova ID</span>
                <h1 className="text-lg font-bold text-slate-900">Link Kit</h1>
            </div>
            <div className="w-8"></div>
          </div>

          {/* Stepper */}
          <div className="px-12 py-2 mb-4">
             <div className="flex items-center justify-between relative">
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-100 -z-10"></div>
                
                <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-teal-500 ring-4 ring-white"></div>
                    <span className="text-[9px] font-bold text-teal-600 mt-2 uppercase tracking-wide">Scan</span>
                </div>
                <div className="flex flex-col items-center opacity-30">
                    <div className="w-2 h-2 rounded-full bg-gray-300 ring-4 ring-white"></div>
                    <span className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-wide">Register</span>
                </div>
                <div className="flex flex-col items-center opacity-30">
                    <div className="w-2 h-2 rounded-full bg-gray-300 ring-4 ring-white"></div>
                    <span className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-wide">Thank You</span>
                </div>
             </div>
          </div>

          <div className="flex-1 flex flex-col items-center px-6 pt-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Scan Barcode</h2>
              <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-8">Align code within frame</p>

              {/* Camera Viewfinder */}
              <div 
                onClick={handleScanSimulate}
                className="w-full max-w-sm aspect-square bg-slate-900 rounded-[32px] relative overflow-hidden shadow-2xl cursor-pointer group"
              >
                  {/* Fake Image Feed */}
                  <img 
                    src="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                    alt="Camera Feed"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>
                  
                  {/* Grid Lines with Breathing Animation */}
                  <div className="absolute inset-0" 
                       style={{ 
                           backgroundImage: 'linear-gradient(rgba(20, 184, 166, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 184, 166, 0.2) 1px, transparent 1px)', 
                           backgroundSize: '40px 40px',
                           animation: 'breathe 5s ease-in-out infinite' 
                       }}>
                  </div>

                  {/* Corner Markers with Pulsating Animation */}
                  <div className="absolute top-6 left-6 w-12 h-12 border-l-4 border-t-4 border-teal-400 rounded-tl-xl" style={{ animation: 'pulse-glow 2s infinite' }}></div>
                  <div className="absolute top-6 right-6 w-12 h-12 border-r-4 border-t-4 border-teal-400 rounded-tr-xl" style={{ animation: 'pulse-glow 2s infinite', animationDelay: '0.1s' }}></div>
                  <div className="absolute bottom-6 left-6 w-12 h-12 border-l-4 border-b-4 border-teal-400 rounded-bl-xl" style={{ animation: 'pulse-glow 2s infinite', animationDelay: '0.2s' }}></div>
                  <div className="absolute bottom-6 right-6 w-12 h-12 border-r-4 border-b-4 border-teal-400 rounded-br-xl" style={{ animation: 'pulse-glow 2s infinite', animationDelay: '0.3s' }}></div>
                  
                  {/* Scan Line Animation */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.8)] animate-[scan_3s_ease-in-out_infinite]"></div>

                  {/* Flash Button */}
                  <button className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full flex items-center space-x-2 text-xs font-bold uppercase tracking-wider hover:bg-black/60 transition">
                      <Zap size={14} className="fill-white" />
                      <span>Flash</span>
                  </button>
              </div>
          </div>

          {/* Footer - Manual Entry */}
          <div className="p-6 pb-12">
              <button 
                onClick={() => setStep('register')}
                className="w-full bg-white border border-gray-100 shadow-lg shadow-gray-100 rounded-[24px] p-4 flex items-center justify-between group hover:border-teal-100 transition-all"
              >
                  <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-500 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                          <Keyboard size={24} />
                      </div>
                      <div className="text-left">
                          <h3 className="font-bold text-slate-900">Manual Entry</h3>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">CODE-XXXX-XXXX</p>
                      </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-300 group-hover:text-teal-500 transition-colors" />
              </button>
              
              <div className="text-center mt-8 flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase tracking-widest space-x-2">
                  <div className="w-4 h-4 rounded-full bg-teal-100 flex items-center justify-center">
                    <Check size={10} className="text-teal-600" strokeWidth={4} />
                  </div>
                  <span>Secure Scanning</span>
              </div>
          </div>
        </div>
      )}

      {/* --- STEP 2: REGISTER --- */}
      {step === 'register' && (
         <div className="min-h-screen flex flex-col bg-gray-50/50">
            {/* Header */}
            <div className="px-6 pt-12 pb-6">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Owner Profile</h1>
                <p className="text-sm text-gray-500">Tell us more about who's using this kit.</p>
                
                {/* Stepper */}
                <div className="flex space-x-2 mt-6">
                    <div className="h-1.5 flex-1 bg-teal-500 rounded-full"></div>
                    <div className="h-1.5 flex-1 bg-teal-500 rounded-full"></div>
                    <div className="h-1.5 flex-1 bg-gray-200 rounded-full"></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wider">
                    <span className="text-teal-600">Scan</span>
                    <span className="text-teal-600 text-center">Register</span>
                    <span className="text-right">Thank You</span>
                </div>
            </div>

            <div className="flex-1 px-6 space-y-6 pb-24 overflow-y-auto">
                
                {/* Photo Upload */}
                <div className="flex flex-col items-center justify-center py-4">
                    <div className="w-32 h-32 rounded-full bg-white border-2 border-dashed border-teal-200 flex items-center justify-center relative shadow-sm cursor-pointer hover:bg-teal-50 transition-colors group">
                        <User size={48} className="text-teal-100 group-hover:text-teal-200" />
                        <div className="absolute bottom-0 right-0 w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                            <Camera size={16} className="text-white" />
                        </div>
                    </div>
                    <span className="mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Add Photo</span>
                </div>

                {/* Form Fields */}
                <div className="space-y-5">
                    
                    {/* Birth Date */}
                    <div>
                        <label className="text-xs font-bold text-slate-700 mb-2 block">Birth Date</label>
                        <div className="bg-white border border-gray-100 rounded-2xl p-4 flex justify-between items-center shadow-sm">
                            <span className="text-gray-400 text-sm">mm/dd/yyyy</span>
                            <Calendar size={20} className="text-gray-400" />
                        </div>
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="text-xs font-bold text-slate-700 mb-2 block">Gender</label>
                        <div className="grid grid-cols-3 gap-3">
                            <button className="bg-teal-600 text-white py-3 rounded-2xl text-sm font-bold shadow-md shadow-teal-200">Male</button>
                            <button className="bg-gray-100 text-gray-500 py-3 rounded-2xl text-sm font-bold hover:bg-gray-200">Female</button>
                            <button className="bg-gray-100 text-gray-500 py-3 rounded-2xl text-sm font-bold hover:bg-gray-200">Other</button>
                        </div>
                    </div>

                    {/* Height & Weight */}
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="text-xs font-bold text-slate-700 mb-2 block">Height</label>
                            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex justify-between items-center shadow-sm">
                                <span className="text-slate-900 font-bold">0</span>
                                <span className="text-xs font-bold text-gray-400 uppercase">cm</span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="text-xs font-bold text-slate-700 mb-2 block">Weight</label>
                            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex justify-between items-center shadow-sm">
                                <span className="text-slate-900 font-bold">0</span>
                                <span className="text-xs font-bold text-gray-400 uppercase">kg</span>
                            </div>
                        </div>
                    </div>

                    {/* Info Card */}
                    <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-start space-x-3">
                        <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-800/70 leading-relaxed">
                            These physical details help our genetic algorithms provide more accurate metabolic and lifestyle insights for the owner.
                        </p>
                    </div>

                    <button 
                        onClick={handleRegisterSubmit}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-200 transition-all active:scale-[0.98] flex items-center justify-center space-x-2 mt-4"
                    >
                        <span>Link Kit & Save Profile</span>
                        <ArrowLeft size={18} className="rotate-180" />
                    </button>
                </div>
            </div>
         </div>
      )}

      {/* --- STEP 3: SUCCESS --- */}
      {step === 'success' && (
          <div className="min-h-screen bg-gradient-to-b from-teal-50/50 to-white flex flex-col relative overflow-hidden">
             
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-teal-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

             {/* Header */}
             <div className="px-6 py-4 flex justify-between items-center relative z-10">
                <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                    <X size={24} className="text-slate-800" />
                </button>
                <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                    <Share2 size={24} className="text-slate-800" />
                </button>
             </div>

             <div className="flex-1 flex flex-col items-center justify-center px-6 text-center relative z-10 -mt-10">
                
                {/* Success Icon */}
                <div className="relative mb-8">
                    <div className="w-48 h-48 rounded-full bg-teal-50 flex items-center justify-center relative">
                        <div className="absolute top-0 right-0 bg-white p-3 rounded-full shadow-md animate-bounce delay-100">
                             {/* Confetti Icon Placeholder */}
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-teal-500">
                                <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" fill="currentColor" className="opacity-20" />
                                <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" />
                             </svg>
                        </div>
                        {/* Big DNA Icon */}
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal-400">
                           <path d="M2 15c6.667-6 13.333 0 20-6" />
                           <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
                           <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
                           <path d="M17 6l-2.5-2.5" />
                           <path d="M14 8l-1-1" />
                           <path d="M7 18l2.5 2.5" />
                           <path d="M3.5 14.5l.5.5" />
                           <path d="M20 9l.5.5" />
                           <path d="M6.5 12.5l1 1" />
                           <path d="M16.5 10.5l1 1" />
                           <path d="M10 16l1.5 1.5" />
                        </svg>
                        
                        {/* Confetti particles */}
                        <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400 rounded-sm rotate-12"></div>
                        <div className="absolute bottom-10 right-10 w-2 h-2 bg-pink-400 rounded-full"></div>
                        <div className="absolute top-1/2 right-4 w-3 h-1 bg-blue-400 rounded-full rotate-45"></div>
                    </div>
                </div>

                <h1 className="text-4xl font-black text-teal-400 tracking-tight mb-4 drop-shadow-sm">Success!</h1>
                <p className="text-slate-500 leading-relaxed max-w-xs mx-auto mb-10">
                    Your DNA kit has been successfully linked to your profile.
                </p>

                {/* Profile Card */}
                <div className="w-full bg-white rounded-3xl p-3 flex items-center space-x-4 shadow-lg shadow-teal-50 border border-teal-50 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden shrink-0">
                         {/* Placeholder Avatar */}
                         <div className="w-full h-full bg-[#5D4037] flex items-center justify-center pt-2">
                             {/* Simple SVG Face */}
                             <svg viewBox="0 0 100 100" className="w-full h-full">
                                <circle cx="50" cy="40" r="25" fill="#8D6E63" />
                                <path d="M20 90 Q50 60 80 90" fill="#8D6E63" />
                             </svg>
                         </div>
                    </div>
                    <div className="text-left flex-1">
                        <div className="flex items-center">
                            <h3 className="font-bold text-slate-900 text-lg">Leo's Profile</h3>
                        </div>
                        <div className="inline-flex items-center space-x-1 bg-teal-50 text-teal-500 px-2 py-0.5 rounded-md mt-1">
                            <Zap size={10} className="fill-teal-500" />
                            <span className="text-[10px] font-bold tracking-wide">#GK-8829</span>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-teal-400 text-white flex items-center justify-center shadow-md">
                        <Check size={16} strokeWidth={4} />
                    </div>
                </div>

                {/* What's Next */}
                <div className="w-full bg-blue-50/50 rounded-3xl p-5 text-left flex items-start space-x-4">
                     <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                        <Share2 size={20} />
                     </div>
                     <div>
                         <h4 className="font-bold text-slate-900 mb-1">What's Next?</h4>
                         <p className="text-xs text-slate-500 leading-relaxed">
                            Instructions for sample collection and a pre-paid return label will follow shortly.
                         </p>
                     </div>
                </div>

             </div>

             {/* Footer CTA */}
             <div className="p-6 pb-8 bg-white/50 backdrop-blur-sm">
                 <button 
                    onClick={handleComplete}
                    className="w-full bg-teal-400 hover:bg-teal-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-teal-200 transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
                 >
                     <span>View Tracking Status</span>
                     <ArrowLeft size={18} className="rotate-180" />
                 </button>
             </div>

          </div>
      )}

    </div>
  );
};