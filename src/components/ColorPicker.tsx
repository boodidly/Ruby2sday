import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';

interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

const presetColors = [
  { name: 'Emerald', value: '#10B981' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Rose', value: '#F43F5E' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Yellow', value: '#EAB308' },
  { name: 'Lime', value: '#84CC16' },
  { name: 'Green', value: '#22C55E' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Cyan', value: '#06B6D4' },
];

const ColorPicker: React.FC<ColorPickerProps> = ({ currentColor, onColorChange }) => {
  const [showCustom, setShowCustom] = useState(false);
  const [customColor, setCustomColor] = useState(currentColor.startsWith('#') ? currentColor : '#10B981');

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    onColorChange(newColor);
  };

  return (
    <div className="p-3 bg-[#1F1F1F] rounded-lg w-64">
      <div className="grid grid-cols-4 gap-2 mb-3">
        {presetColors.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:ring-2 hover:ring-white/20 transition-all"
            style={{ backgroundColor: color.value }}
            title={color.name}
          >
            {currentColor === color.value && (
              <Check size={16} className="text-white" />
            )}
          </button>
        ))}
        <button
          onClick={() => setShowCustom(!showCustom)}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-[#2A2A2A] hover:ring-2 hover:ring-white/20 transition-all"
          title="Custom Color"
        >
          <Plus size={16} className="text-white" />
        </button>
      </div>

      {showCustom && (
        <div className="space-y-2 pt-2 border-t border-[#2A2A2A]">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={customColor}
              onChange={handleCustomColorChange}
              className="w-8 h-8 rounded overflow-hidden cursor-pointer"
            />
            <input
              type="text"
              value={customColor}
              onChange={(e) => {
                const val = e.target.value;
                if (val.match(/^#[0-9A-Fa-f]{0,6}$/)) {
                  setCustomColor(val);
                  if (val.length === 7) {
                    onColorChange(val);
                  }
                }
              }}
              className="flex-1 px-2 py-1 bg-[#2A2A2A] rounded text-sm font-mono"
              placeholder="#RRGGBB"
              maxLength={7}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs text-gray-400 mb-1">Preview</label>
              <div
                className="h-8 rounded"
                style={{ backgroundColor: customColor }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;