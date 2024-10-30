import React, { useState } from 'react';
import { X, Upload, Download } from 'lucide-react';
import type { TerminalProfile } from '../types/terminal';

interface TerminalProfileModalProps {
  onClose: () => void;
  onImport: (profile: TerminalProfile) => void;
  accentColor: string;
}

const TerminalProfileModal: React.FC<TerminalProfileModalProps> = ({
  onClose,
  onImport,
  accentColor,
}) => {
  const [configFile, setConfigFile] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          setConfigFile(content);
        } catch (error) {
          console.error('Error reading file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleImport = () => {
    try {
      const profile: TerminalProfile = {
        id: `custom-${Date.now()}`,
        name: 'Custom Profile',
        shell: '/bin/bash',
        backgroundColor: '#0D0D0D',
        foregroundColor: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'monospace',
        opacity: 1,
        ...JSON.parse(configFile),
      };
      onImport(profile);
      onClose();
    } catch (error) {
      console.error('Error parsing config:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-[#151515] rounded-lg p-6 w-full max-w-md border border-[#1F1F1F]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Import Terminal Profile</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#1F1F1F] rounded"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Configuration File
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept=".json,.conf"
                onChange={handleFileUpload}
                className="hidden"
                id="config-file"
              />
              <label
                htmlFor="config-file"
                className={`flex items-center gap-2 px-4 py-2 rounded bg-${accentColor}-600 hover:bg-${accentColor}-500 cursor-pointer`}
              >
                <Upload size={16} />
                Choose File
              </label>
              {configFile && <span className="text-sm text-gray-400">File loaded</span>}
            </div>
          </div>

          {configFile && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Configuration Preview
              </label>
              <pre className="bg-[#1F1F1F] p-3 rounded text-sm overflow-auto max-h-48">
                {configFile}
              </pre>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-[#1F1F1F] hover:bg-[#2A2A2A]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleImport}
              disabled={!configFile}
              className={`px-4 py-2 rounded bg-${accentColor}-600 hover:bg-${accentColor}-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
            >
              <Download size={16} />
              Import Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TerminalProfileModal;