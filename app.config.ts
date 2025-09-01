import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Balanjo",
  slug: "balanjo",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/balanjo-adaptive-icon.png",
  scheme: "balanjo",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/balanjo-adaptive-icon.png",
      backgroundColor: "#000a26",
    },
    edgeToEdgeEnabled: true,
    package: "com.allfitra.balanjo",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/balanjo-icon.png",
  },
  splash: {
    image: "./assets/images/balanjo-icon.png",
    resizeMode: "cover",
    backgroundColor: "#000a26",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/balanjo-icon.png",
        imageWidth: 200,
        resizeMode: "cover",
        backgroundColor: "#000a26",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "8ce2055c-542c-4efe-bc5a-ea6f7537f66c",
    },
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.EXPO_PUBLIC_SUPABASE_KEY,
    apiMyquranUrl: process.env.EXPO_API_MYQURAN_URL,
  },
});
