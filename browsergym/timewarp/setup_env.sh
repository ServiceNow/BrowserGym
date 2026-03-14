#!/bin/bash
echo "TimeWarp Environment Setup"
echo "Enter URLs (default: localhost:5000-5002):"
read -p "TW_WIKI [localhost:5000]: " WIKI
read -p "TW_WEBSHOP [localhost:5001]: " WEBSHOP
read -p "TW_NEWS [localhost:5002]: " NEWS

cat >> .env << EOF
export TW_WIKI="http://${WIKI:-localhost:5000}"
export TW_WEBSHOP="http://${WEBSHOP:-localhost:5001}"
export TW_NEWS="http://${NEWS:-localhost:5002}"
EOF

echo "✅ Done! Run: source .env"
