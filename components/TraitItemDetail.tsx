import React from 'react';
import { ChevronLeft, Share2, Brain, Dna, ExternalLink } from 'lucide-react';
import { SUB_TRAIT_DETAILS } from '../constants';

interface TraitItemDetailProps {
  itemName: string;
  onBack: () => void;
}

export const TraitItemDetail: React.FC<TraitItemDetailProps> = ({ itemName, onBack }) => {
  const data = SUB_TRAIT_DETAILS[itemName] || SUB_TRAIT_DETAILS['Cognitive Ability'];

  return (
    <div className="min-h-screen bg-gray-50 pb-32 animate-in slide-in-from-right duration-300 font-sans">
      
      {/* Header */}
      <div className="bg-white sticky top-0 z-20 px-6 py-4 flex justify-between items-center shadow-sm border-b border-gray-100">
        <button 
          onClick={onBack}
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={24} className="text-slate-800" />
        </button>
        <div className="text-center">
            <h1 className="text-lg font-bold text-slate-900">{data.title}</h1>
            <p className="text-[10px] text-blue-600 font-bold tracking-widest uppercase">{data.subtitle}</p>
        </div>
        <button className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
          <Share2 size={20} className="text-slate-800" />
        </button>
      </div>

      <div className="p-5 space-y-5">
        
        {/* Gauge Card */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
            <div className="relative w-64 h-32 mb-4 mt-2">
                {/* Gauge SVG */}
                <svg className="w-full h-full overflow-visible" viewBox="0 0 200 100" preserveAspectRatio="xMidYMax meet">
                    {/* Background Track */}
                    <path 
                        d="M 20 100 A 80 80 0 0 1 180 100" 
                        fill="none" 
                        stroke="#f3f4f6" 
                        strokeWidth="16" 
                        strokeLinecap="round"
                    />
                    {/* Active Progress (Blue) - calculated for ~90% */}
                    <path 
                        d="M 100 20 A 80 80 0 0 1 180 100" 
                        fill="none" 
                        stroke="#2563eb" 
                        strokeWidth="16" 
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute bottom-0 left-0 right-0 text-center mb-1">
                    <h2 className="text-4xl font-bold text-blue-600 leading-none mb-1">{data.level}</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">{data.percentile}</p>
                </div>
            </div>
            
            <div className="flex justify-between w-full px-8 text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2">
                <span>Weak</span>
                <span>Moderate</span>
                <span className="text-blue-600">Gifted</span>
            </div>
        </div>

        {/* What this means */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm">
            <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Brain size={24} />
                </div>
                <h3 className="font-bold text-lg text-slate-900">What this means</h3>
            </div>
            <p className="text-sm text-slate-600 leading-7 font-medium">
                This trait influences how quickly the brain processes new information and adapts to complex problem-solving scenarios. As a <span className="font-bold text-slate-900">Strategic Thinker</span>, your child likely shows a natural aptitude for connecting disparate ideas and excels in environments requiring abstract reasoning.
            </p>
        </div>

        {/* Scientific Insight */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm">
            <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Dna size={24} />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Scientific Insight</h3>
            </div>
            <p className="text-sm text-slate-600 leading-7 font-medium">
                {data.scientificInsight}
            </p>
        </div>

        {/* Genetic Blueprint */}
        <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-2">Genetic Blueprint</h3>
            <div className="bg-white rounded-[24px] overflow-hidden shadow-sm px-2 py-1">
                <div className="grid grid-cols-3 p-4 border-b border-gray-50 bg-blue-50/30 rounded-t-[20px]">
                    <div className="text-[10px] font-bold text-blue-600 uppercase">Gene</div>
                    <div className="text-[10px] font-bold text-blue-600 uppercase">SNP ID</div>
                    <div className="text-[10px] font-bold text-blue-600 uppercase text-right">Genotype</div>
                </div>
                {data.genetics.map((gene: any, idx: number) => (
                    <div key={idx} className="grid grid-cols-3 p-4 border-b border-gray-50 last:border-0 items-center hover:bg-gray-50 transition-colors">
                        <div className="font-bold text-slate-900 text-sm">{gene.gene}</div>
                        <div className="text-sm text-gray-500 font-mono tracking-tight">{gene.snp}</div>
                        <div className="flex justify-end">
                            <span className={`
                                px-2.5 py-1 rounded-md text-[11px] font-bold font-mono tracking-wide
                                ${gene.status === 'mixed' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}
                            `}>
                                {gene.genotype}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Scientific References */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5">Scientific References</h3>
            <div className="space-y-5">
                {data.references.map((ref: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-start group cursor-pointer">
                        <div className="pr-4">
                            <h4 className="text-sm font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{ref.title}</h4>
                            <p className="text-xs text-gray-400 italic">{ref.author}</p>
                        </div>
                        <ExternalLink size={18} className="text-gray-300 group-hover:text-blue-600 mt-0.5" />
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};