import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddScriptModalProps {
  onClose: () => void;
  onAdd: (script: { name: string; command: string }) => void;
  accentColor: string;
}

const AddScriptModal: React.FC<AddScriptModalProps> = ({ onClose, onAdd, accentColor }) => {
  const [name, setName] = useState('');
  const [command, setCommand] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && command) {
      onAdd({ name, command });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-[#151515] rounded-lg p-6 w-full max-w-md border border-[#1F1F1F]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Script</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#1F1F1F] rounded"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Script Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 bg-[#1F1F1F] rounded border border-[#2A2A2A] focus:border-${accentColor}-500 focus:ring-1 focus:ring-${accentColor}-500 outline-none`}
              placeholder="e.g., Update System"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Command
            </label>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className={`w-full px-3 py-2 bg-[#1F1F1F] rounded border border-[#2A2A2A] focus:border-${accentColor}-500 focus:ring-1 focus:ring-${accentColor}-500 outline-none`}
              placeholder="e.g., sudo apt update"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-[#1F1F1F] hover:bg-[#2A2A2A]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded bg-${accentColor}-600 hover:bg-${accentColor}-500`}
            >
              Add Script
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScriptModal;