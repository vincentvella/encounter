echo "$API_URL"

yarn

# Optimize expo images
yarn expo-optimize

# Build Web PWA
expo build:web --no-pwa