#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
RUNNER_DIR="$SCRIPT_DIR/.runner"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== GitHub Actions Runner Setup ===${NC}"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}Error: GitHub CLI (gh) is not installed.${NC}"
    echo "Install it with: brew install gh"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${RED}Error: Not authenticated with GitHub CLI.${NC}"
    echo "Run: gh auth login"
    exit 1
fi

# Detect architecture
ARCH=$(uname -m)
OS=$(uname -s)

if [[ "$OS" == "Darwin" ]]; then
    if [[ "$ARCH" == "arm64" ]]; then
        RUNNER_ARCH="osx-arm64"
    else
        RUNNER_ARCH="osx-x64"
    fi
elif [[ "$OS" == "Linux" ]]; then
    if [[ "$ARCH" == "aarch64" ]]; then
        RUNNER_ARCH="linux-arm64"
    else
        RUNNER_ARCH="linux-x64"
    fi
else
    echo -e "${RED}Unsupported OS: $OS${NC}"
    exit 1
fi

echo "Detected: $OS ($ARCH) -> $RUNNER_ARCH"

# Get latest runner version
RUNNER_VERSION="2.321.0"
RUNNER_URL="https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-${RUNNER_ARCH}-${RUNNER_VERSION}.tar.gz"

# Check if runner is already configured
if [[ -f "$RUNNER_DIR/.runner" ]]; then
    echo -e "${YELLOW}Runner already configured.${NC}"
    echo ""
    echo "Options:"
    echo "  1. Start runner:    $SCRIPT_DIR/start.sh"
    echo "  2. Reconfigure:     rm -rf $RUNNER_DIR && $0"
    exit 0
fi

# Create runner directory
mkdir -p "$RUNNER_DIR"
cd "$RUNNER_DIR"

# Download and extract runner
echo ""
echo "Downloading runner v${RUNNER_VERSION}..."
curl -sL "$RUNNER_URL" | tar xz

# Get registration token
echo "Getting registration token..."
cd "$REPO_DIR"
TOKEN=$(gh api repos/jonesopolis/jonesopolis.github.io/actions/runners/registration-token -X POST --jq '.token')

# Configure runner
cd "$RUNNER_DIR"
HOSTNAME=$(hostname -s)
RUNNER_NAME="local-${HOSTNAME}"

echo ""
echo "Configuring runner as '${RUNNER_NAME}'..."
# Use a work directory without spaces to avoid bash issues
WORK_DIR="/tmp/github-runner-work"
mkdir -p "$WORK_DIR"

./config.sh \
    --url "https://github.com/jonesopolis/jonesopolis.github.io" \
    --token "${TOKEN}" \
    --name "${RUNNER_NAME}" \
    --labels "self-hosted,${OS},${ARCH}" \
    --work "${WORK_DIR}" \
    --unattended

echo ""
echo -e "${GREEN}✓ Runner configured successfully!${NC}"
echo ""
echo "To start the runner:"
echo "  $SCRIPT_DIR/start.sh"
echo ""
echo "To install as a service (runs on boot):"
echo "  $SCRIPT_DIR/install-service.sh"
