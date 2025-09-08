import { Link, Tabs } from "expo-router";
import React from "react";
import { Image, Platform, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AntDesign, Entypo } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarActiveBackgroundColor: "#2997beff",
        headerShown: true,
        headerStyle: {
          backgroundColor: "#0f1f49",
          elevation: 0,
        },
        headerTitle: () => (
          <Link href="/">
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("@/assets/images/balanjo-logo.png")}
                style={{
                  width: 60,
                  height: 60,
                  resizeMode: "contain",
                  marginLeft: 20,
                  marginTop: Platform.OS === "ios" ? 0 : 10,
                }}
              />
            </View>
          </Link>
        ),
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {
            backgroundColor: "#0f1f49",
            paddingBottom: 0,

            // height: 60,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "ON GOING",
          tabBarIcon: ({ color }) => (
            <Entypo name="500px-with-circle" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
