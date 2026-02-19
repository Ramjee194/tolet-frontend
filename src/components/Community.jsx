import React, { useState } from 'react';
import { 
  Users, BookOpen, MessageSquare, TrendingUp, BarChart3, Activity,
  CheckCircle, Star, Search, Filter, Plus, ChevronRight, 
  MapPin, Globe, Shield, Award, ArrowUpRight, Flame, 
  Clock, ThumbsUp, Eye, MoreHorizontal, GraduationCap
} from 'lucide-react';

const CommunityHub = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const stats = [
    { label: "Active Members", value: "12.5K", change: "+15%", icon: <Users className="text-blue-600" />, status: "Growing" },
    { label: "Discussions", value: "3.2K", change: "+8%", icon: <MessageSquare className="text-purple-600" /> },
    { label: "Neighborhood Guides", value: "450", change: "+12%", icon: <BookOpen className="text-emerald-600" /> },
    { label: "Service Reviews", value: "8.9K", change: "+22%", icon: <Star className="text-orange-600" /> }
  ];

  const topics = [
    { id: 1, title: "Best neighborhoods for young professionals", count: 45, users: 128, trend: "+25%" },
    { id: 2, title: "Utility setup tips for new renters", count: 32, users: 89, trend: "+18%" },
    { id: 3, title: "Property investment opportunities 2024", count: 28, users: 67, trend: "+12%" },
    { id: 4, title: "Moving services recommendations", count: 24, users: 56, trend: "+30%" }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans text-slate-900">
      
      
      {/* 1. SEARCH & FILTER HEADER */}
      <header className="bg-white border-b border-slate-100 pt-8 pb-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Community Hub & Local Insights</h1>
              <p className="text-slate-500 mt-1 font-medium">Connect with fellow renters and access local market intelligence.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative group">
                <select className="appearance-none pl-10 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
                  <option>All Locations</option>
                  <option>Downtown</option>
                  <option>Riverside</option>
                  <option>Suburbs</option>
                  <option>Arts District</option>
                </select>
                <MapPin size={16} className="absolute left-3 top-3.5 text-slate-400" />
                <ChevronRight size={16} className="absolute right-3 top-3.5 text-slate-400 rotate-90" />
              </div>
              <div className="relative group">
                <select className="appearance-none pl-10 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
                  <option>All Categories</option>
                  <option>Neighborhood Guides</option>
                  <option>Discussions</option>
                  <option>Local Services</option>
                </select>
                <Filter size={16} className="absolute left-3 top-3.5 text-slate-400" />
              </div>
              <div className="relative flex-1 lg:w-64">
                <input type="text" placeholder="Search discussions..." className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none" />
                <Search size={16} className="absolute left-3 top-3.5 text-slate-400" />
              </div>
            </div>
          </div>

          <nav className="flex gap-8 overflow-x-auto no-scrollbar">
            {['Overview', 'Neighborhood Guides', 'Discussions', 'Market Insights', 'Success Stories', 'Local Services'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`pb-4 text-sm font-black uppercase tracking-wider whitespace-nowrap transition-all ${activeTab === tab.toLowerCase() ? 'text-blue-600 border-b-4 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: STATS & DISCUSSIONS */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* COMMUNITY OVERVIEW STATS */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black flex items-center gap-2 text-slate-800">
                <Activity size={20} className="text-blue-600" /> Community Overview
              </h2>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full flex items-center gap-2">
                <Clock size={12}/> Last updated 2 hours ago
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-all">
                  <div className="p-2 bg-slate-50 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">{s.icon}</div>
                  <p className="text-2xl font-black text-slate-900">{s.value}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-1">{s.label}</p>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <ArrowUpRight size={12}/> {s.change}
                  </div>
                  {s.status && <span className="absolute top-4 right-4 text-[9px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded uppercase">{s.status}</span>}
                </div>
              ))}
            </div>
          </section>

          {/* RECENT DISCUSSIONS */}
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <h2 className="text-xl font-black flex items-center gap-2">
                <MessageSquare size={20} className="text-blue-600" /> Recent Discussions
              </h2>
              <button className="text-sm font-bold text-blue-600 underline hover:text-blue-700">View All</button>
            </div>

            <div className="space-y-4">
              <DiscussionCard 
                author="TechNomad_Sarah" 
                title="Best internet providers in downtown area - need recommendations" 
                content="Moving to downtown next month and looking for reliable high-speed internet. What are your experiences with providers?"
                tags={['internet', 'downtown']}
                stats={{ likes: 23, views: 156, comments: 12 }}
                time="2h ago"
                status="active"
              />
              <DiscussionCard 
                author="LegalEagle_Mike" 
                title="Solved: How to handle security deposit disputes with landlords" 
                content="After months of back and forth, I finally got my full security deposit back. Here's exactly what worked and the documentation..."
                tags={['legal', 'deposits']}
                stats={{ likes: 45, views: 892, comments: 67 }}
                time="5h ago"
                status="solved"
              />
            </div>
          </section>

          {/* POPULAR GUIDES SECTION */}
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <h2 className="text-xl font-black flex items-center gap-2">
                <BookOpen size={20} className="text-blue-600" /> Popular Guides
              </h2>
              <button className="text-sm font-bold text-blue-600 underline hover:text-blue-700">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <GuideCard 
                category="Business Hub"
                title="Downtown Financial District"
                rating={4.8}
                desc="Complete guide to living in the heart of the financial district with insider tips on commuting, dining, and more."
                contributors={23}
                reviews={156}
                color="bg-blue-600"
              />
              
              <GuideCard 
                category="Creative Hub"
                title="Riverside Arts Quarter"
                rating={4.6}
                desc="Discover the vibrant arts scene, local galleries, and creative spaces that make this neighborhood perfect for artists."
                contributors={18}
                reviews={89}
                color="bg-purple-600"
              />
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: QUICK ACTIONS & TRENDING */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* QUICK ACTIONS */}
          <section className="bg-white border border-gray-100 rounded-[32px] p-8 text-gray-800 relative overflow-hidden">
            <h3 className="text-xl font-black mb-6 relative z-10">Quick Actions</h3>
            <div className="space-y-4 relative z-10">
              <ActionItem icon={<Plus />} title="Start Discussion" desc="Ask questions or share insights" />
              <ActionItem icon={<BookOpen />} title="Write Guide" desc="Share neighborhood knowledge" />
              <ActionItem icon={<Star />} title="Review Service" desc="Help others with recommendations" />
              <ActionItem icon={<TrendingUp />} title="Share Story" desc="Tell your rental success story" />
            </div>
            <div className="mt-8 pt-6 border-t border-slate-800 relative z-10">
              <button className="flex items-center justify-between w-full text-blue-400 font-bold hover:text-white transition-colors">
                View Rewards & Recognition <ChevronRight size={18}/>
              </button>
            </div>
            <Award size={120} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
          </section>

          {/* TRENDING TOPICS */}
          <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Flame size={20} className="text-orange-500 fill-orange-500" />
              <h3 className="font-black text-slate-800">Trending Topics</h3>
            </div>
            <div className="space-y-6">
              {topics.map((t, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <span className="text-2xl font-black text-slate-100 group-hover:text-blue-100 transition-colors">0{t.id}</span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">{t.title}</h4>
                    <div className="flex items-center gap-2 mt-1 text-[10px] font-bold text-slate-400">
                      <span>{t.count} Discussions</span>
                      <span>•</span>
                      <span className="text-emerald-500">{t.trend} activity</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 bg-slate-50 text-slate-500 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
              View All Topics
            </button>
          </section>

          {/* GUIDELINES BOX */}
          <div className="p-8 bg-blue-50 rounded-[32px] border border-blue-100">
            <Shield className="text-blue-600 mb-4" />
            <h4 className="font-black text-slate-900 mb-2">Community Safe-Space</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">All members are verified. Help us maintain a high-quality environment by following our <span className="text-blue-600 font-bold underline">Guidelines</span>.</p>
          </div>
        </aside>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-20 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-2 rounded-xl"><Globe size={24}/></div>
              <span className="text-2xl font-black">Toletforrent Community</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8 font-medium">Connect, Share, Discover. Join thousands of renters and property owners sharing knowledge and building stronger communities.</p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-blue-600 rounded-xl font-black text-sm">Join Discussion</button>
              <button className="px-8 py-3 border border-slate-700 rounded-xl font-black text-sm hover:bg-slate-800">Become Member</button>
            </div>
          </div>
          <div>
            <h5 className="font-black mb-6 uppercase text-xs tracking-widest text-slate-500">Community</h5>
            <ul className="space-y-4 text-sm font-bold text-slate-400">
              <li className="hover:text-white cursor-pointer">Guidelines</li>
              <li className="hover:text-white cursor-pointer">Moderation</li>
              <li className="hover:text-white cursor-pointer">Rewards Program</li>
              <li className="hover:text-white cursor-pointer">Expert Network</li>
            </ul>
          </div>
          <div>
            <h5 className="font-black mb-6 uppercase text-xs tracking-widest text-slate-500">Resources</h5>
            <ul className="space-y-4 text-sm font-bold text-slate-400">
              <li className="hover:text-white cursor-pointer">Rental Guides</li>
              <li className="hover:text-white cursor-pointer">Legal Resources</li>
              <li className="hover:text-white cursor-pointer">Market Reports</li>
              <li className="hover:text-white cursor-pointer">API Access</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-20 pt-8 flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest">
          <span>© 2026 Toletforrent Community</span>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Sub-components
const DiscussionCard = ({ author, title, content, tags, stats, time, status }) => (
  <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:border-blue-200 transition-all cursor-pointer group">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-xs">
          {author[0]}
        </div>
        <div>
          <p className="text-xs font-bold text-slate-800">{author}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase">{time} • <span className={status === 'solved' ? 'text-emerald-500' : 'text-blue-500'}>{status.toUpperCase()}</span></p>
        </div>
      </div>
      <button className="text-slate-300 group-hover:text-slate-500"><MoreHorizontal size={20}/></button>
    </div>
    <h3 className="text-lg font-black text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">{title}</h3>
    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4 font-medium">{content}</p>
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map(t => <span key={t} className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-wider">#{t}</span>)}
    </div>
    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
      <div className="flex gap-4">
        <span className="flex items-center gap-1 text-xs font-bold text-slate-400"><ThumbsUp size={14}/> {stats.likes}</span>
        <span className="flex items-center gap-1 text-xs font-bold text-slate-400"><MessageSquare size={14}/> {stats.comments}</span>
      </div>
      <span className="flex items-center gap-1 text-xs font-bold text-slate-400"><Eye size={14}/> {stats.views}</span>
    </div>
  </div>
);

const GuideCard = ({ category, title, rating, desc, contributors, reviews, color }) => (
  <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm group cursor-pointer hover:shadow-xl hover:shadow-blue-900/5 transition-all">
  
  {/* Image Section */}
  <div className="relative h-32 overflow-hidden">
    
    {/* Image */}
    <img
      src="https://img.grouponcdn.com/deal/2wWkMMYaEreDzvTygMtRNAcMgZuS/2w-2048x1229/v1/c870x524.jpg"
      className="absolute inset-0 w-full h-full object-cover"
      alt=""
    />

    {/* Dark Overlay (Important for text visibility) */}
    <div className="absolute inset-0 bg-black/40"></div>

    {/* Text Content */}
    <div className="relative p-6 flex flex-col justify-end h-full">
      <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">
        {category}
      </span>
      <h3 className="text-xl font-black text-white">
        {title}
      </h3>
    </div>
  </div>

  {/* Bottom Content */}
  <div className="p-6">
    <div className="flex items-center gap-2 mb-4">
      <div className="flex text-orange-400">
        <Star size={14} fill="currentColor" />
      </div>
      <span className="text-sm font-black text-slate-800">{rating}</span>
      <span className="text-xs text-slate-400 font-bold underline">
        {reviews} reviews
      </span>
    </div>

    <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6 line-clamp-3">
      {desc}
    </p>

    <div className="flex items-center justify-between">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
        {contributors} contributors
      </span>

      <button className="p-3 bg-slate-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
        <ChevronRight size={18} />
      </button>
    </div>
  </div>
</div>

);

const ActionItem = ({ icon, title, desc }) => (
  <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">
    <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">{icon}</div>
    <div>
      <p className="text-sm font-black text-white">{title}</p>
      <p className="text-[10px] text-slate-400 font-medium">{desc}</p>
    </div>
  </button>
);

export default CommunityHub;