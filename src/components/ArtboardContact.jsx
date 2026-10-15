import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  Send, 
  Download,
  MapPin
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function ArtboardContact({ 
  currentTheme, 
  isSelected, 
  onSelect,
  customColor,
  onSelectElement
}) {
  const accentColor = customColor || currentTheme.primary;

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Quick brief form states
  const [clientName, setClientName] = useState("");
  const [projectType, setProjectType] = useState("Event Branding & Flyers");
  const [message, setMessage] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello Victor! My name is ${clientName || 'a client'}.\nI'm reaching out about: ${projectType}.\n\nProject details: ${message || 'I would love to discuss a project with you.'}`
    );
    window.open(`https://wa.me/2348133849382?text=${text}`, '_blank');
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Enquiry: ${projectType} - from ${clientName || 'Client'}`);
    const body = encodeURIComponent(
      `Hi Victor,\n\nI reviewed your interactive portfolio workspace.\n\nProject Type: ${projectType}\nClient Name: ${clientName}\n\nDetails:\n${message}\n\nLooking forward to hearing from you!`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div
      id="artboard-contact"
      onClick={onSelect}
      className={`relative w-full max-w-[1280px] mx-auto rounded-3xl p-6 sm:p-10 transition-all duration-300 backdrop-blur-xl border ${
        isSelected 
          ? 'ring-2 shadow-2xl' 
          : 'border-white/10 hover:border-white/20'
      }`}
      style={{
        backgroundColor: '#161720cc',
        borderColor: isSelected ? accentColor : 'rgba(255, 255, 255, 0.1)',
        boxShadow: isSelected ? `0 25px 60px ${currentTheme.glow}` : '0 20px 50px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* Header Label */}
      <div className="absolute -top-7 left-3 flex items-center space-x-2 text-[11px] font-mono text-white/50 select-none">
        <span 
          className="font-bold px-2 py-0.5 rounded text-white text-[10px] uppercase shadow-sm"
          style={{ backgroundColor: accentColor }}
        >
          FRAME 06
        </span>
        <span className="text-white/80 font-semibold">DIRECT_BRIEF_AND_CONTACT</span>
        <span className="text-white/40 hidden sm:inline">• Lagos, Nigeria</span>
      </div>

      {/* Resize handles */}
      {isSelected && (
        <>
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-purple-500 rounded-sm" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-purple-500 rounded-sm" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-purple-500 rounded-sm" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-purple-500 rounded-sm" />
        </>
      )}

      {/* Section Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
          <span className="text-xs font-mono uppercase tracking-wider text-white/50">Get In Touch</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Initiate Brief / Hire Victor
        </h2>
        <p className="text-xs sm:text-sm text-white/60 max-w-xl mt-1">
          Have an upcoming event flyer, visual identity overhaul, or frontend web engineering challenge? Let’s create something unforgettable together.
        </p>
      </div>

      {/* Contact Grid: Direct Info + Send Brief Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left Column: Direct channels */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email Card */}
          <div className="p-4 rounded-2xl bg-[#1d1f2b] border border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: accentColor }}
              >
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase">Email Address</span>
                <p className="font-semibold text-xs sm:text-sm text-white select-all">
                  {personalInfo.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
              title="Copy Email"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* WhatsApp / Phone Card */}
          <div className="p-4 rounded-2xl bg-[#1d1f2b] border border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase">Direct Phone & WhatsApp</span>
                <p className="font-semibold text-xs sm:text-sm text-white select-all">
                  {personalInfo.phone}
                </p>
              </div>
            </div>
            <button
              onClick={handleCopyPhone}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
              title="Copy Phone"
            >
              {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Behance Portfolio Card */}
          <a
            href={personalInfo.behanceUrl}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-[#1d1f2b] border border-white/10 hover:border-blue-500/40 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                Bē
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase">Behance Portfolio</span>
                <p className="font-semibold text-xs sm:text-sm text-white group-hover:text-blue-300 transition-colors">
                  behance.net/vicckyclef
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white" />
          </a>

          {/* Resume PDF Card */}
          <a
            href={personalInfo.resumeUrl}
            download="Adebisi_Victor_Resume.pdf"
            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase">Official Document</span>
                <p className="font-semibold text-xs sm:text-sm text-white">
                  Download Verified Resume (PDF)
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-white/50">PDF</span>
          </a>
        </div>

        {/* Right Column: Interactive Brief Form */}
        <div className="lg:col-span-7 bg-black/40 p-6 rounded-2xl border border-white/10">
          <form className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Quick Brief Terminal
              </span>
              <span className="text-[10px] font-mono text-emerald-400">⚡ Direct Line</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-white/50 mb-1">Your Name / Organization</label>
                <input 
                  type="text"
                  placeholder="e.g. John Doe, CEES Committee"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-white/50 mb-1">Project Category</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1b1c24] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="Event Branding & 3D Flyers">Event Branding & 3D Flyers</option>
                  <option value="Visual Identity / Logo System">Visual Identity / Logo System</option>
                  <option value="UI/UX Web & Mobile Design">UI/UX Web & Mobile Design</option>
                  <option value="Frontend Web Development">Frontend Web Development</option>
                  <option value="Full-Stack Application">Full-Stack Application</option>
                  <option value="Full-time / Contract Hiring">Full-time / Contract Hiring</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-white/50 mb-1">Brief / Project Scope</label>
              <textarea 
                rows="4"
                placeholder="Describe your event date, required assets, design vision, or technical requirements..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-purple-400 resize-none"
              />
            </div>

            {/* Submit Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-black flex items-center justify-center gap-2 transition-all hover:brightness-110 shadow-lg cursor-pointer"
                style={{ backgroundColor: currentTheme.secondary }}
              >
                <MessageSquare className="w-4 h-4 fill-black" />
                <span>Send via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleSendEmail}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send via Email Client</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
