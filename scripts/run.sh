#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}Starting Modern Terminal UI...${NC}"

# Check if Ollama service is running
if ! systemctl is-active --quiet ollama; then
    echo -e "${YELLOW}Ollama service is not running. Starting it now...${NC}"
    sudo systemctl start ollama
    
    # Wait for Ollama to start
    echo -e "${YELLOW}Waiting for Ollama to initialize...${NC}"
    sleep 5
fi

# Check if any models are installed
if ! ollama list >/dev/null 2>&1; then
    echo -e "${YELLOW}No Ollama models found. Installing default model (mistral)...${NC}"
    ollama pull mistral
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
fi

# Start the development server
echo -e "${YELLOW}Starting development server...${NC}"
echo -e "${GREEN}The application will be available at http://localhost:5173${NC}"
npm run dev