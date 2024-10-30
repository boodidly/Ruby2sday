import React, { useState } from 'react';
import { Terminal, Settings, ChevronUp, Gem } from 'lucide-react';
import ScriptButton from './components/ScriptButton';
import AddScriptModal from './components/AddScriptModal';
import ColorPicker from './components/ColorPicker';
import TerminalProfileModal from './components/TerminalProfileModal';
import TerminalProfileSelector from './components/TerminalProfileSelector';
import SettingsPanel from './components/SettingsPanel';
import RubyChat from './components/RubyChat';
import { type TerminalProfile, defaultProfiles } from './types/terminal';

function App() {
  const [scripts, setScripts] = useState([
    { id: 1, name: 'Update System', command: 'sudo apt update && sudo apt upgrade' },
    { id: 2, name: 'Check Disk Space', command: 'df -h' },
    { id: 3, name: 'System Info', command: 'neofetch' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState('Terminal ready...\n');
  const [isEditing, setIsEditing] = useState(false);
  const [accentColor, setAccentColor] = useState('#10B981');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profiles, setProfiles] = useState<TerminalProfile[]>(defaultProfiles);
  const [currentProfile, setCurrentProfile] = useState<TerminalProfile>(defaultProfiles[0]);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [glowOpacity, setGlowOpacity] = useState(0.15);
  const [glowColor, setGlowColor] = useState(accentColor);

  const handleAddScript = (script) => {
    setScripts([...scripts, { ...script, id: Date.now() }]);
    setIsModalOpen(false);
  };

  const handleDeleteScript = (id) => {
    setScripts(scripts.filter(script => script.id !== id));
  };

  const executeCommand = (command) => {
    setTerminalOutput(prev => `${prev}\n$ ${command}\nExecuting: ${command}...\n`);
  };

  const handleImportProfile = (profile: TerminalProfile) => {
    setProfiles([...profiles, profile]);
    setCurrentProfile(profile);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Convert hex to RGB for CSS variables
  const hexToRGB = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  return (
    <div className="flex h-screen bg-[#0D0D0D] text-gray-100">
      {/* Sidebar - hidden in fullscreen mode */}
      {!isFullscreen && (
        <div className="w-64 bg-[#151515] flex flex-col border-r border-[#1F1F1F]">
          {/* Main content area */}
          <div className="flex-1 p-4 overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Terminal style={{ color: accentColor }} className="w-6 h-6" />
              <h1 className="text-xl font-bold">Ruby Terminal</h1>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {scripts.map((script) => (
                <ScriptButton
                  key={script.id}
                  script={script}
                  onExecute={executeCommand}
                  onDelete={handleDeleteScript}
                  isEditing={isEditing}
                  accentColor={accentColor}
                />
              ))}
            </div>
          </div>

          {/* Ruby AI Chat */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <Gem style={{ color: accentColor }} className="w-4 h-4" />
              <span className="text-sm font-medium">Ruby AI</span>
            </div>
            <RubyChat accentColor={accentColor} />
          </div>

          {/* Settings toggle button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center justify-between px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Settings size={16} style={{ color: accentColor }} />
              <span className="text-sm font-medium">Settings</span>
            </div>
            <ChevronUp
              size={16}
              className={`transform transition-transform ${showSettings ? '' : 'rotate-180'}`}
            />
          </button>

          {/* Settings panel */}
          {showSettings && (
            <SettingsPanel
              accentColor={accentColor}
              onColorChange={setAccentColor}
              glowOpacity={glowOpacity}
              onGlowOpacityChange={setGlowOpacity}
              glowColor={glowColor}
              onGlowColorChange={setGlowColor}
              currentProfile={currentProfile}
              profiles={profiles}
              onProfileSelect={setCurrentProfile}
              onImportProfile={() => setShowProfileModal(true)}
              isEditing={isEditing}
              onEditingChange={setIsEditing}
              onAddScript={() => setIsModalOpen(true)}
            />
          )}
        </div>
      )}

      {/* Terminal Area */}
      <div className={`flex-1 ${isFullscreen ? 'fixed inset-0 z-50' : ''} bg-[#0D0D0D] p-4`}>
        <div 
          onClick={toggleFullscreen}
          className={`relative h-full rounded-lg overflow-hidden cursor-pointer transition-shadow duration-300`}
          style={{
            backgroundColor: currentProfile.backgroundColor,
            '--glow-color': hexToRGB(glowColor),
            '--glow-opacity': glowOpacity,
            boxShadow: !isFullscreen ? `
              0 0 0 1px rgba(var(--glow-color), 0.2),
              0 0 2px 1px rgba(var(--glow-color), 0.2),
              0 0 4px 2px rgba(var(--glow-color), 0.1),
              0 0 8px 4px rgba(var(--glow-color), 0.05),
              0 0 16px 8px rgba(var(--glow-color), 0.025)
            ` : 'none',
          } as React.CSSProperties}
        >
          {/* Terminal content */}
          <div
            className="relative h-full p-4 font-mono text-sm overflow-auto"
            style={{
              color: currentProfile.foregroundColor,
              fontSize: `${currentProfile.fontSize}px`,
              fontFamily: currentProfile.fontFamily,
              opacity: currentProfile.opacity,
            }}
          >
            <pre className="whitespace-pre-wrap">{terminalOutput}</pre>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <AddScriptModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddScript}
          accentColor={accentColor}
        />
      )}

      {showProfileModal && (
        <TerminalProfileModal
          onClose={() => setShowProfileModal(false)}
          onImport={handleImportProfile}
          accentColor={accentColor}
        />
      )}
    </div>
  );
}

export default App;