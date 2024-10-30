import React from 'react';
import { Plus, Trash2, Palette } from 'lucide-react';
import type { TerminalProfile } from '../types/terminal';
import ColorPicker from './ColorPicker';

interface SettingsPanelProps {
  accentColor: string;
  onColorChange: (color: string) => void;
  glowOpacity: number;
  onGlowOpacityChange: (opacity: number) => void;
  glowColor: string;
  onGlowColorChange: (color: string) => void;
  currentProfile: TerminalProfile;
  profiles: TerminalProfile[];
  onProfileSelect: (profile: TerminalProfile) => void;
  onImportProfile: () => void;
  isEditing: boolean;
  onEditingChange: (editing: boolean) => void;
  onAddScript: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  accentColor,
  onColorChange,
  glowOpacity,
  onGlowOpacityChange,
  glowColor,
  onGlowColorChange,
  currentProfile,
  profiles,
  onProfileSelect,
  onImportProfile,
  isEditing,
  onEditingChange,
  onAddScript,
}) => {
  const [activeTab, setActiveTab] = React.useState<'add' | 'remove' | 'colors'>('add');

  return (
    <div className="bg-[#1A1A1A] flex flex-col">
      {/* Content Area */}
      <div className="p-4 flex-1">
        {activeTab === 'add' && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-400">Add New Script</h3>
            <button
              onClick={onAddScript}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded bg-[#2A2A2A] hover:bg-[#333333]"
            >
              <Plus size={16} style={{ color: accentColor }} />
              <span className="text-sm">Add Script</span>
            </button>
          </div>
        )}

        {activeTab === 'remove' && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-400">Remove Scripts</h3>
            <button
              onClick={() => onEditingChange(!isEditing)}
              className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded ${
                isEditing ? `bg-${accentColor}-600` : 'bg-[#2A2A2A] hover:bg-[#333333]'
              }`}
            >
              <Trash2 size={16} />
              <span className="text-sm">{isEditing ? 'Done' : 'Remove Scripts'}</span>
            </button>
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Accent Color</h3>
              <ColorPicker currentColor={accentColor} onColorChange={onColorChange} />
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Glow Effect</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Opacity</label>
                  <input
                    type="range"
                    min="0"
                    max="0.3"
                    step="0.01"
                    value={glowOpacity}
                    onChange={(e) => onGlowOpacityChange(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Glow Color</label>
                  <ColorPicker currentColor={glowColor} onColorChange={onGlowColorChange} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 border-t border-[#2A2A2A]">
        <button
          onClick={() => setActiveTab('add')}
          className={`flex flex-col items-center justify-center gap-1 py-3 ${
            activeTab === 'add' ? `text-${accentColor}-500` : 'text-gray-400'
          } hover:bg-[#2A2A2A]`}
          title="Add Script"
        >
          <Plus size={16} />
          <span className="text-xs">Add</span>
        </button>
        <button
          onClick={() => setActiveTab('remove')}
          className={`flex flex-col items-center justify-center gap-1 py-3 ${
            activeTab === 'remove' ? `text-${accentColor}-500` : 'text-gray-400'
          } hover:bg-[#2A2A2A]`}
          title="Remove Scripts"
        >
          <Trash2 size={16} />
          <span className="text-xs">Remove</span>
        </button>
        <button
          onClick={() => setActiveTab('colors')}
          className={`flex flex-col items-center justify-center gap-1 py-3 ${
            activeTab === 'colors' ? `text-${accentColor}-500` : 'text-gray-400'
          } hover:bg-[#2A2A2A]`}
          title="Customize Colors"
        >
          <Palette size={16} />
          <span className="text-xs">Colors</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;