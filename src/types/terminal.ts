export interface TerminalProfile {
  id: string;
  name: string;
  shell: string;
  backgroundColor: string;
  foregroundColor: string;
  fontSize: number;
  fontFamily: string;
  opacity: number;
}

export const defaultProfiles: TerminalProfile[] = [
  {
    id: 'mate-terminal',
    name: 'MATE Terminal',
    shell: '/bin/bash',
    backgroundColor: '#0D0D0D',
    foregroundColor: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Ubuntu Mono',
    opacity: 0.95,
  },
  {
    id: 'gnome-terminal',
    name: 'GNOME Terminal',
    shell: '/bin/bash',
    backgroundColor: '#2E3436',
    foregroundColor: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'DejaVu Sans Mono',
    opacity: 0.9,
  },
  {
    id: 'konsole',
    name: 'Konsole',
    shell: '/bin/bash',
    backgroundColor: '#232627',
    foregroundColor: '#FCFCFC',
    fontSize: 14,
    fontFamily: 'Hack',
    opacity: 1,
  },
];