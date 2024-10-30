import React from 'react';
import { Play, Trash2 } from 'lucide-react';

interface ScriptButtonProps {
  script: {
    id: number;
    name: string;
    command: string;
  };
  onExecute: (command: string) => void;
  onDelete: (id: number) => void;
  isEditing: boolean;
  accentColor: string;
}

const ScriptButton: React.FC<ScriptButtonProps> = ({
  script,
  onExecute,
  onDelete,
  isEditing,
  accentColor,
}) => {
  return (
    <div className="group flex items-center gap-2">
      <button
        onClick={() => onExecute(script.command)}
        className="flex-1 flex items-center gap-2 px-3 py-2 rounded bg-[#1F1F1F] hover:bg-[#2A2A2A] transition-colors"
        disabled={isEditing}
      >
        <Play style={{ color: accentColor }} size={16} />
        <span className="text-sm">{script.name}</span>
      </button>
      
      {isEditing && (
        <button
          onClick={() => onDelete(script.id)}
          className="p-2 rounded hover:bg-red-900/30 text-red-500"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
};

export default ScriptButton;