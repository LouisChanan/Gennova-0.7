import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Notifications } from './components/Notifications';
import { TraitDetail } from './components/TraitDetail';
import { TraitItemDetail } from './components/TraitItemDetail';
import { ArticleDetail } from './components/ArticleDetail';
import { Profile } from './components/Profile';
import { Insights } from './components/Insights';
import { LinkKitFlow } from './components/LinkKitFlow';
import { Home, BarChart2, Bell, User, Dna, LogOut } from 'lucide-react';
import { Trait } from './types';
import { useAuth } from './components/AuthContext';
import { LoginForm } from './components/LoginForm';

export default function App() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [isLinkingKit, setIsLinkingKit] = useState(false);

  // App Logic State
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [isTrackingMode, setIsTrackingMode] = useState(false);

  // Navigation State
  const [selectedTrait, setSelectedTrait] = useState<Trait | null>(null);
  const [selectedSubTraitName, setSelectedSubTraitName] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Helper for navigation items to avoid repetition
  const NavItem = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => {
    const isActive = activeTab === id;
    return (
      <button
        onClick={() => {
          setActiveTab(id);
          // If user clicks a tab, we exit the detail views
          if (id !== 'home') {
            setSelectedTrait(null);
            setSelectedSubTraitName(null);
            setSelectedArticleId(null);
          }
        }}
        className="flex flex-col items-center justify-center space-y-1 w-12"
      >
        <Icon
          size={24}
          className={`transition-colors duration-200 ${isActive ? 'text-teal-600' : 'text-gray-300'}`}
          strokeWidth={isActive ? 2.5 : 2}
        />
        <span className={`text-[9px] font-bold uppercase tracking-wide ${isActive ? 'text-teal-600' : 'text-gray-300'}`}>
          {label}
        </span>
      </button>
    );
  };

  // Render logic based on hierarchy

  // Level 4: Article Detail View (Full Screen)
  if (selectedArticleId) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-gray-100">
        <ArticleDetail
          articleId={selectedArticleId}
          onBack={() => setSelectedArticleId(null)}
        />
      </div>
    );
  }

  // Level 3: Sub-Trait Item Detail
  if (selectedSubTraitName) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-gray-100">
        <TraitItemDetail
          itemName={selectedSubTraitName}
          profileId={selectedProfileId}
          onBack={() => setSelectedSubTraitName(null)}
        />

        {/* Standard Bottom Nav */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe z-20">
          <div className="max-w-md mx-auto px-6 py-3 flex justify-between items-end relative">
            <NavItem id="home" icon={Home} label="Home" />
            <NavItem id="reports" icon={BarChart2} label="Reports" />
            <div className="w-12"></div>
            <NavItem id="alerts" icon={Bell} label="Alerts" />
            <NavItem id="profile" icon={User} label="Profile" />
          </div>
          <div className="h-6 w-full bg-white"></div>
        </div>
      </div>
    );
  }

  // Determine Main Content based on State
  let MainContent = (
    <Dashboard
      onTraitClick={(trait) => setSelectedTrait(trait)}
      isTrackingMode={isTrackingMode}
      selectedProfileId={selectedProfileId}
      onProfileChange={setSelectedProfileId}
    />
  );

  if (selectedTrait) {
    MainContent = (
      <TraitDetail
        trait={selectedTrait}
        onBack={() => setSelectedTrait(null)}
        onSubTraitClick={(name) => setSelectedSubTraitName(name)}
      />
    );
  } else if (activeTab === 'profile') {
    MainContent = <Profile onAddNew={() => setIsLinkingKit(true)} />;
  } else if (activeTab === 'reports') {
    MainContent = <Insights onArticleClick={(id) => setSelectedArticleId(id)} />;
  } else if (activeTab === 'alerts') {
    MainContent = (
      <Notifications
        onViewReport={() => {
          setActiveTab('home');
          setIsTrackingMode(false);
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-gray-100">

      {MainContent}

      {/* Link Kit Overlay Flow */}
      {isLinkingKit && (
        <LinkKitFlow
          onClose={() => setIsLinkingKit(false)}
          onComplete={() => {
            setIsLinkingKit(false);
            setIsTrackingMode(true);
            setActiveTab('home');
          }}
        />
      )}

      {/* Bottom Navigation */}
      {!selectedTrait && !selectedSubTraitName && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe z-20">
          <div className="max-w-md mx-auto px-6 py-3 flex justify-between items-end relative">
            <NavItem id="home" icon={Home} label="Home" />
            <NavItem id="reports" icon={BarChart2} label="Reports" />

            {/* Center Action Button (DNA) */}
            <div className="relative -top-6">
              <button
                onClick={() => setIsLinkingKit(true)}
                className="w-14 h-14 rounded-full bg-teal-400 text-white flex items-center justify-center shadow-lg shadow-teal-200 border-4 border-gray-50 transform transition-transform active:scale-95 hover:scale-105"
              >
                <Dna size={28} strokeWidth={2} />
              </button>
            </div>

            <NavItem id="alerts" icon={Bell} label="Alerts" />
            <NavItem id="profile" icon={User} label="Profile" />
          </div>
          {/* Safe area spacer for mobile */}
          <div className="h-6 w-full bg-white"></div>
        </div>
      )}

    </div>
  );
}