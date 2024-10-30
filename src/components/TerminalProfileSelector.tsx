import React from 'react';
import { Monitor } from 'lucide-react';
import type { TerminalProfile } from '../types/terminal';

interface TerminalProfileSelectorProps {
  profiles: TerminalProfile[];
  currentProfile: TerminalProfile;
  onSelect: (profile: TerminalProfile) => void;
  accentColor: string;
}

const TerminalProfileSelector: React.FC<TerminalProfileSelectorProps> = ({
  profiles,
  currentProfile,
  onSelect,
  accentColor,
}) => {
  return (
    <div className="space-y-2">
      {profiles.map((profile) => (
        <button
          key={profile.id}
          onClick={() => onSelect(profile)}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded ${
            currentProfile.id === profile.id
              ? `bg-${accentColor}-600`
              : 'bg-[#1F1F1F] hover:bg-[#2A2A2A]'
          } transition-colors`}
        >
          <Monitor size={16} className={currentProfile.id === profile.id ? 'text-white' : `text-${accentColor}-500`} />
          <span className="text-sm">{profile.name}</span>
        </button>
      ))}
    </div>
  );
};

export default TerminalProfileSelector;