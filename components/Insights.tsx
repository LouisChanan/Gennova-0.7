import React, { useState, useEffect } from 'react';
import { USER_PROFILE } from '../constants';
import { Sparkles, Clock, Zap, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabase';

interface InsightsProps {
  onArticleClick?: (id: string) => void;
}

export const Insights: React.FC<InsightsProps> = ({ onArticleClick }) => {
  const [activeFilter, setActiveFilter] = useState('All Insights');
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = ['All Insights', '#Intelligence', '#Creativity', '#Sports', '#Nutrition'];

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const featured = articles.slice(0, 2).map((item, idx) => ({
    id: item.id,
    title: item.title,
    category: idx === 0 ? "TOP POTENTIAL" : "PHYSICAL DESIGN",
    match: idx === 0 ? "98%" : "ACTN3 CC",
    image: item.hero_image,
    color: idx === 0 ? "from-teal-500/20 to-teal-900/80" : "from-yellow-500/20 to-yellow-900/80"
  }));

  const feedArticles = articles.map(item => ({
    id: item.id,
    tag: `#${item.tag}`,
    readTime: item.read_time,
    title: item.title,
    desc: item.mascot_insight,
    image: item.hero_image
  }));

  const handleClick = (id: string | number) => {
    if (onArticleClick) {
      onArticleClick(id.toString());
    }
  }

  return (
    <div className="min-h-screen bg-teal-50/30 pb-24 font-sans animate-in slide-in-from-right duration-300">

      {/* Header */}
      <div className="px-6 py-4 bg-transparent text-center sticky top-0 z-10 backdrop-blur-sm">
        <h1 className="text-lg font-bold text-slate-900">Insights</h1>
      </div>

      <div className="px-6 space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 size={40} className="text-teal-500 animate-spin mb-4" />
            <p className="text-gray-400 font-medium tracking-wide">Cultivating Insights...</p>
          </div>
        ) : (
          <>
            {/* Featured Section */}
            {featured.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Featured for {USER_PROFILE.name}</h2>
                <p className="text-sm text-gray-500 mb-4">Based on recent genetic analysis</p>

                <div className="flex space-x-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
                  {featured.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleClick(item.id)}
                      className="min-w-[280px] h-[360px] rounded-[32px] overflow-hidden relative shadow-lg group cursor-pointer"
                    >
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${item.color} via-transparent to-transparent`}></div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 inline-block ${item.category.includes('POTENTIAL') ? 'text-teal-300' : 'text-yellow-300'
                          }`}>
                          {item.category}
                        </span>
                        <h3 className="text-2xl font-bold leading-tight mb-3">{item.title}</h3>
                        <div className="flex items-center text-xs font-semibold text-white/90 bg-white/20 backdrop-blur-md self-start inline-flex px-3 py-1.5 rounded-full border border-white/20">
                          <Sparkles size={12} className="mr-1.5" />
                          {item.id === 1 ? `Genetic match: ${item.match}` : `Gene: ${item.match}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`
                            px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors
                            ${activeFilter === filter
                      ? 'bg-teal-400 text-white shadow-md shadow-teal-100'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}
                        `}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Personalized Feed */}
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-4">Personalized for you</h3>
              <div className="space-y-4">
                {feedArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => handleClick(article.id)}
                    className="bg-white rounded-[24px] p-4 shadow-sm flex justify-between items-center group cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-[10px] font-bold text-teal-500 uppercase tracking-wider">{article.tag}</span>
                        <span className="text-[8px] text-gray-300 font-bold">•</span>
                        <span className="text-[10px] font-bold text-teal-500 uppercase tracking-wider">{article.readTime}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 leading-tight mb-2 text-[15px] group-hover:text-teal-600 transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                        {article.desc}
                      </p>
                    </div>
                    <div className="w-20 h-20 rounded-[18px] overflow-hidden shrink-0 bg-gray-100">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};