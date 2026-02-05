import React, { useState, useRef } from 'react';
import { ChevronLeft, Bookmark, Clock, Share2, Check, Smile, ArrowRight } from 'lucide-react';
import { ARTICLES } from '../constants';

interface ArticleDetailProps {
  articleId: string;
  onBack: () => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ articleId, onBack }) => {
  // Use mock data if ID not found, specifically defaulting to ID '1' for the demo
  const article = ARTICLES[articleId] || ARTICLES['1'];
  
  // Local state for checkboxes
  const [activities, setActivities] = useState(article.activities);

  // Carousel State
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const toggleActivity = (id: number) => {
    setActivities((prev: any[]) => prev.map((act: any) => 
        act.id === id ? { ...act, checked: !act.checked } : act
    ));
  };

  const handleScroll = () => {
      if (scrollRef.current) {
          // Card width (280px) + Gap (16px) = 296px
          const index = Math.round(scrollRef.current.scrollLeft / 296);
          setActiveSlide(index);
      }
  };

  const scrollToSlide = (index: number) => {
      if (scrollRef.current) {
          scrollRef.current.scrollTo({
              left: index * 296,
              behavior: 'smooth'
          });
      }
  };

  return (
    <div className="min-h-screen bg-white pb-24 font-sans animate-in slide-in-from-right duration-300 relative">
      
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-20 flex justify-between items-center px-6 py-4 bg-white/90 backdrop-blur-sm">
         <button 
           onClick={onBack}
           className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
         >
            <ChevronLeft size={24} className="text-slate-800" />
         </button>
         <button className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
            <Bookmark size={20} className="text-slate-800" />
         </button>
      </div>

      <div className="px-6">
        
        {/* Hero Image */}
        <div className="w-full aspect-square max-h-64 rounded-[32px] overflow-hidden mb-6 shadow-sm">
            <img 
                src={article.heroImage || "https://images.unsplash.com/photo-1596253434315-99c922a96996?q=80&w=800&auto=format&fit=crop"} 
                alt="Article Hero" 
                className="w-full h-full object-cover"
            />
        </div>

        {/* Tags */}
        <div className="flex items-center space-x-3 mb-4">
            <span className="bg-teal-50 text-teal-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                #{article.tag}
            </span>
            <div className="flex items-center text-gray-400 bg-gray-50 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                <Clock size={12} className="mr-1.5" />
                {article.readTime}
            </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
            {article.title}
        </h1>

        {/* Author */}
        <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden">
                <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
            </div>
            <div>
                <p className="font-bold text-sm text-slate-900 leading-none mb-1">{article.author.name}</p>
                <p className="text-[10px] text-teal-500 font-bold uppercase tracking-wide">{article.author.role}</p>
            </div>
        </div>

        {/* Content */}
        <div className="prose prose-sm text-slate-600 space-y-4 mb-8">
            {article.content.map((block: any, idx: number) => {
                if (block.type === 'heading') {
                    return <h3 key={idx} className="text-lg font-bold text-slate-900 mt-4">{block.text}</h3>
                }
                if (block.type === 'list') {
                    return (
                        <ul key={idx} className="space-y-3 mt-2">
                            {block.items.map((item: string, i: number) => (
                                <li key={i} className="flex items-start">
                                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 mr-3 shrink-0" />
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    )
                }
                return <p key={idx} className="leading-relaxed">{block.text}</p>
            })}
        </div>

        {/* Mascot Insight Card */}
        <div className="relative mt-12 mb-10">
            {/* Floating Mascot Icon */}
            <div className="absolute -top-5 right-6 w-12 h-12 bg-white rounded-full border border-teal-100 shadow-sm flex items-center justify-center z-10">
                <div className="w-10 h-10 bg-teal-400 rounded-full flex items-center justify-center text-white">
                    <Smile size={20} strokeWidth={2.5} />
                </div>
            </div>
            
            <div className="bg-teal-50/50 border border-teal-100 rounded-[24px] rounded-tr-[4px] p-6 relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-400 to-teal-200 rounded-l-[24px]"></div>
                <h4 className="text-teal-400 text-[10px] font-bold uppercase tracking-[0.15em] mb-3">Mascot Insight</h4>
                <p className="text-sm italic font-medium text-slate-700 leading-relaxed font-serif">
                    “{article.mascotInsight}”
                </p>
            </div>
        </div>

        {/* Suggested Activities */}
        <div className="mb-10">
            <h3 className="font-bold text-lg text-slate-900 mb-4">Suggested Activities</h3>
            <div className="space-y-3">
                {activities.map((item: any) => (
                    <div 
                        key={item.id} 
                        onClick={() => toggleActivity(item.id)}
                        className={`
                            p-4 rounded-2xl border transition-all cursor-pointer flex items-center space-x-4
                            ${item.checked ? 'bg-teal-50/30 border-teal-100' : 'bg-gray-50 border-transparent hover:bg-gray-100'}
                        `}
                    >
                        <div className={`
                            w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors
                            ${item.checked ? 'bg-teal-400 border-teal-400' : 'bg-white border-gray-200'}
                        `}>
                            {item.checked && <Check size={14} className="text-white" strokeWidth={4} />}
                        </div>
                        <span className={`text-sm font-semibold ${item.checked ? 'text-slate-900' : 'text-slate-600'}`}>
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>

        {/* Related Insights Carousel */}
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-slate-900">Related Insights</h3>
                <button className="text-[10px] font-bold text-teal-500 uppercase tracking-wider hover:text-teal-600 transition-colors">View All</button>
            </div>
            
            <div className="relative group">
                <div 
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex space-x-4 overflow-x-auto pb-8 -mx-6 px-6 no-scrollbar snap-x snap-mandatory"
                >
                    {article.related.map((rel: any, idx: number) => (
                        <div 
                            key={rel.id} 
                            className="snap-center shrink-0 w-[280px] bg-white rounded-[24px] border border-gray-100 shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300 group/card"
                        >
                            <div className="h-48 bg-gray-200 relative overflow-hidden">
                                <img src={rel.image} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" alt={rel.title} />
                                <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/40 to-transparent"></div>
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-teal-600 uppercase tracking-wide shadow-sm">
                                    {rel.tag}
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1 justify-between">
                                <h4 className="font-bold text-slate-900 text-base leading-snug mb-3 line-clamp-2">{rel.title}</h4>
                                <div className="flex items-center text-teal-500 font-bold text-[10px] uppercase tracking-wider group-hover/card:translate-x-1 transition-transform">
                                    Read Now <ArrowRight size={12} className="ml-1" strokeWidth={3} />
                                </div>
                            </div>
                        </div>
                    ))}
                     <div className="w-2 shrink-0"></div>
                </div>

                {/* Navigation Dots - More Prominent */}
                <div className="flex justify-center items-center space-x-2 -mt-4 mb-8">
                    {article.related.map((_: any, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => scrollToSlide(idx)}
                            className={`transition-all duration-300 rounded-full ${
                                idx === activeSlide 
                                    ? 'w-8 h-2 bg-teal-500 shadow-sm shadow-teal-200' 
                                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>

      </div>

      {/* Floating Share Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button className="w-14 h-14 bg-teal-400 rounded-full shadow-lg shadow-teal-200 flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform">
            <Share2 size={24} />
        </button>
      </div>

    </div>
  );
};