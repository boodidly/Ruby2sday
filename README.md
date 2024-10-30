# Modern Terminal UI with AI Chat

A beautiful, customizable terminal wrapper with script management, AI chat capabilities, and voice interaction.

![Terminal UI Preview](https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=1000)

## Features

- 🎨 Customizable accent colors and glow effects
- 📜 Script management system
- 🖥️ Multiple terminal profile support
- 🎯 Quick-access script buttons
- 🤖 Integrated AI chat with Ollama models
- 🎙️ Voice-to-text input
- 🔊 Text-to-speech output
- 🔄 Import/export terminal configurations
- 🌈 Beautiful, modern UI design

## System Requirements

- Debian 12 (Bookworm)
- sudo privileges
- 4GB RAM minimum (for AI models)
- 10GB free disk space

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/modern-terminal-ui.git
cd modern-terminal-ui
```

2. Make the installation script executable:
```bash
chmod +x scripts/install.sh
chmod +x scripts/run.sh
```

3. Run the installation script:
```bash
sudo ./scripts/install.sh
```

The installation script will:
- Update system packages
- Install Node.js 18.x and npm
- Install build essentials
- Install required terminal fonts
- Install and configure Ollama
- Set up configuration directory

## Running the Application

1. Start the application:
```bash
./scripts/run.sh
```

2. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

## Using the AI Chat

1. Click the "AI Chat" tab in the sidebar
2. Select an Ollama model from the dropdown
3. Type your message or use voice input (click microphone icon)
4. Press Enter or click Send to chat
5. Click the speaker icon on any assistant message for voice output

### Available Voice Commands

- Click the microphone icon to start voice input
- Speak naturally - your voice will be converted to text
- Click the microphone icon again to stop recording
- The text will appear in the input field automatically

## Managing Scripts

1. Click the "+" button in the sidebar to add a new script
2. Enter the script name and command
3. Click "Add Script" to save

## Customizing Colors

1. Click the palette icon in the sidebar
2. Select from the available color options
3. The UI will update immediately with your chosen accent color
4. Adjust the glow effect intensity and color

## Terminal Profiles

1. Click the settings icon next to "Terminal Profile"
2. Select from pre-configured profiles or import your own
3. To import a custom profile:
   - Click the upload icon
   - Choose a JSON configuration file
   - Review the preview
   - Click "Import Profile"

### Example Profile JSON

```json
{
  "name": "Custom Terminal",
  "shell": "/bin/bash",
  "backgroundColor": "#1A1B26",
  "foregroundColor": "#A9B1D6",
  "fontSize": 14,
  "fontFamily": "JetBrains Mono",
  "opacity": 0.95
}
```

## Troubleshooting

### Common Issues

1. **Permission Denied**
   ```bash
   sudo chmod +x scripts/install.sh scripts/run.sh
   ```

2. **Missing Dependencies**
   ```bash
   sudo ./scripts/install.sh
   ```

3. **Port Already in Use**
   ```bash
   # Find the process using port 5173
   sudo lsof -i :5173
   # Kill the process
   sudo kill -9 <PID>
   ```

4. **Ollama Not Running**
   ```bash
   # Start Ollama service
   sudo systemctl start ollama
   # Check status
   sudo systemctl status ollama
   ```

5. **No Models Available**
   ```bash
   # Pull a model (e.g., mistral)
   ollama pull mistral
   ```

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- Lucide Icons
- React Markdown
- Web Speech API
- Ollama AI

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request