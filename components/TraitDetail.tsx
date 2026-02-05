import React, { useState, useRef } from 'react';
import { ChevronLeft, MoreHorizontal, Sparkles, CheckCircle, Quote } from 'lucide-react';
import { Trait } from '../types';
import { getIcon, TRAIT_DETAILS } from '../constants';

interface TraitDetailProps {
  trait: Trait;
  onBack: () => void;
  onSubTraitClick: (subTraitName: string) => void;
}

export const TraitDetail: React.FC<TraitDetailProps> = ({ trait, onBack, onSubTraitClick }) => {
  // Use specific detail data if available, otherwise fallback to generic structure
  const details = TRAIT_DETAILS[trait.name] || {
    summary: trait.description,
    subTraits: [
       { name: trait.name, label: 'GENERAL ABILITY', level: trait.level, icon: trait.iconName }
    ],
    celebrity: null,
    careers: []
  };

  // Carousel Logic for Careers
  const careersScrollRef = useRef<HTMLDivElement>(null);
  const [activeCareerSlide, setActiveCareerSlide] = useState(0);

  const handleCareerScroll = () => {
    if (careersScrollRef.current) {
        // Card min-width (200px) + Gap (16px) = 216px
        const index = Math.round(careersScrollRef.current.scrollLeft / 216);
        setActiveCareerSlide(index);
    }
  };

  const LevelBar = ({ level, activeColor }: { level: string, activeColor: string }) => {
    return (
      <div className="flex justify-between items-center space-x-2 mt-3">
         <div className="flex-1 h-2 bg-gray-100 rounded-full"></div>
         <div className="flex-1 h-2 bg-gray-100 rounded-full"></div>
         <div className={`flex-1 h-2 rounded-full ${activeColor}`}></div>
      </div>
    );
  };

  const LevelLabels = () => (
    <div className="flex justify-between text-[10px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">
      <span>Weak</span>
      <span>Moderate</span>
      <span className="text-blue-600">Gifted</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-10 animate-in slide-in-from-right duration-300">
      
      {/* Header Section */}
      <div className="relative bg-gradient-to-b from-blue-700 to-blue-600 text-white rounded-b-[40px] px-6 pt-12 pb-24 shadow-xl overflow-hidden">
         {/* Decorative Circles */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
         <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 opacity-10 rounded-full translate-y-1/2 -translate-x-1/4 blur-xl"></div>

         <div className="relative z-10 flex justify-between items-center mb-6">
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
            >
               <ChevronLeft size={24} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors">
               <MoreHorizontal size={24} />
            </button>
         </div>

         <div className="flex flex-col items-center relative z-10">
            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border-2 border-white/20 mb-4 shadow-lg">
               {getIcon(trait.iconName, 48, 'text-white')}
            </div>
            <h1 className="text-3xl font-bold mb-1">{trait.name}</h1>
            <p className="text-blue-200 text-xs font-semibold tracking-[0.2em] uppercase">Analysis Summary</p>
         </div>
      </div>

      <div className="px-6 -mt-16 relative z-20 space-y-6">
         
         {/* Summary Card */}
         <div className="bg-white rounded-[24px] p-6 shadow-md border border-gray-50">
            <div className="flex items-start space-x-3 mb-2">
               <div className="mt-1 text-blue-500">
                  <Sparkles size={18} />
               </div>
               <h3 className="font-bold text-slate-900">Analysis Summary</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed pl-8">
               {details.summary}
            </p>
         </div>

         {/* Main Sub-Trait Card */}
         {details.subTraits.length > 0 && (
            <div 
                onClick={() => onSubTraitClick(details.subTraits[0].name)}
                className="bg-white rounded-[32px] p-6 shadow-md border border-gray-50 cursor-pointer hover:shadow-lg transition-shadow"
            >
               <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                     {getIcon(details.subTraits[0].icon || 'brain', 24)}
                  </div>
                  <div className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-blue-200 shadow-sm">
                     {details.subTraits[0].level}
                  </div>
               </div>
               
               <h3 className="text-xl font-bold text-slate-900 mb-1">{details.subTraits[0].name}</h3>
               <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-6">
                  {details.subTraits[0].label}
               </p>

               <LevelLabels />
               <LevelBar level={details.subTraits[0].level} activeColor="bg-blue-600" />
            </div>
         )}

         {/* Secondary Traits Grid */}
         {details.subTraits.length > 1 && (
            <div className="grid grid-cols-2 gap-3">
               {details.subTraits.slice(1).map((sub: any, idx: number) => (
                  <div 
                    key={idx} 
                    onClick={() => onSubTraitClick(sub.name)}
                    className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-50 flex flex-col cursor-pointer hover:shadow-md transition-all active:scale-95 duration-200"
                  >
                     <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                        {getIcon(sub.icon || 'star', 20)}
                     </div>
                     <h4 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1">{sub.name}</h4>
                     <p className="text-[10px] text-blue-600 font-bold uppercase mb-3">Level: {sub.level}</p>
                     
                     <div className="flex space-x-1 mt-auto">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full"></div>
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full"></div>
                        <div className={`flex-1 h-1.5 rounded-full ${sub.name.includes('Insight') ? 'bg-teal-400' : 'bg-blue-500'}`}></div>
                     </div>
                     <p className="text-[8px] text-gray-400 font-bold uppercase mt-2 tracking-wide truncate">
                        {sub.label}
                     </p>
                  </div>
               ))}
            </div>
         )}

         {/* Celebrity Match */}
         {details.celebrity && (
            <div className="animate-in slide-in-from-bottom duration-500 delay-100">
               <div className="flex justify-between items-end mb-4 px-1">
                  <h3 className="font-bold text-xl text-slate-900">Celebrity Match</h3>
                  <div className="text-[10px] font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                     Genetic Similarity
                  </div>
               </div>
               
               <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
                  
                  {/* Decorative faint background behind celebrity */}
                  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50/40 to-transparent pointer-events-none"></div>

                  {/* Image with Checkmark */}
                  <div className="relative mb-6 z-10">
                      <div className="w-28 h-28 rounded-full p-1.5 bg-white shadow-xl shadow-blue-100 relative">
                          <img 
                              src={details.celebrity.image} 
                              alt={details.celebrity.name}
                              className="w-full h-full rounded-full object-cover" 
                          />
                          <div className="absolute bottom-1 right-1 bg-teal-500 p-1.5 rounded-full shadow-lg border-2 border-white transform hover:scale-110 transition-transform">
                              <CheckCircle size={16} className="text-white" strokeWidth={3} />
                          </div>
                      </div>
                  </div>
                  
                  {/* Name & Badge */}
                  <div className="flex items-center justify-center space-x-3 mb-2 z-10">
                    <h3 className="text-2xl font-black text-slate-900 leading-tight">{details.celebrity.name}</h3>
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-blue-200 ring-2 ring-white">
                        {details.celebrity.matchLevel}
                    </span>
                  </div>

                  <p className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase mb-8 z-10">
                      {details.celebrity.role}
                  </p>

                  {/* Description */}
                  <div className="bg-slate-50/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-100 relative w-full shadow-inner z-10">
                       <Quote size={24} className="absolute -top-3 left-6 text-blue-500 fill-blue-50 bg-white rounded-full p-1 border border-blue-100 shadow-sm" />
                       <p className="text-sm text-slate-600 leading-7 font-medium pt-2">
                          {details.celebrity.description}
                       </p>
                  </div>
               </div>
            </div>
         )}

         {/* Suggested Careers - Horizontal Carousel */}
         {details.careers && details.careers.length > 0 && (
            <div className="pb-8">
               <div className="flex justify-between items-end mb-4 px-1">
                  <h3 className="font-bold text-xl text-slate-900">Suggested Careers</h3>
                  <button className="text-[10px] font-bold text-blue-600 tracking-wider uppercase flex items-center hover:underline">
                     View All <span className="ml-1 text-xs">&gt;</span>
                  </button>
               </div>
               
               <div className="relative group">
                   {/* Scroll Container */}
                   <div 
                        ref={careersScrollRef}
                        onScroll={handleCareerScroll}
                        className="flex space-x-4 overflow-x-auto pb-6 -mx-6 px-6 no-scrollbar snap-x snap-mandatory"
                   >
                      {details.careers.map((career: any, idx: number) => (
                         <div 
                            key={idx} 
                            className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-50 min-w-[200px] w-[200px] flex flex-col items-center text-center snap-center hover:shadow-md transition-shadow relative"
                         >
                            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 shrink-0">
                               {getIcon(career.icon || 'briefcase', 28)}
                            </div>
                            <h4 className="font-bold text-slate-900 text-md mb-2">{career.name}</h4>
                            <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center">
                               <Sparkles size={8} className="mr-1" />
                               {career.tag}
                            </div>
                         </div>
                      ))}
                      {/* Spacer for right padding */}
                      <div className="w-2 shrink-0"></div>
                   </div>

                   {/* Navigation Dots */}
                   {details.careers.length > 1 && (
                       <div className="flex justify-center items-center space-x-1.5 -mt-2">
                           {details.careers.map((_: any, idx: number) => (
                               <div 
                                   key={idx}
                                   className={`h-1.5 rounded-full transition-all duration-300 ${
                                       idx === activeCareerSlide ? 'w-4 bg-blue-600' : 'w-1.5 bg-gray-200'
                                   }`}
                               />
                           ))}
                       </div>
                   )}
               </div>
            </div>
         )}
      </div>
    </div>
  );
};