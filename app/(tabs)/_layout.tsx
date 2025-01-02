import OnboardingContent from "@/components/screens/onboarding";
import { useCheckUser } from "@/lib/hooks";
import TabbarIcon from "@/navigation/tabbar-icon";
import { Tabs, useSegments } from "expo-router";
import { useMemo, useState } from "react";

const HIDE_TABBAR_SCREENS = [
  ["(tabs)", "(main)", "map"],
  ["(tabs)", "(main)", "search"],
  ["(tabs)", "(main)", "details", "[id]"],
  ["(tabs)", "(chat)", "chat", "[id]", "messages"],
  ["(tabs)", "(community)", "post", "[id]", "comments"],
  ["(tabs)", "(community)", "add-post"],
];

export default function RootLayout() {
  const segments = useSegments();
  const { firstLoad } = useCheckUser();
  const [tabbarVisible, setVisible] = useState(true);

  const hideTabBar = useMemo(() => {
    const sgs = [...segments];
    return HIDE_TABBAR_SCREENS.some(
      (route) => route.join(", ") === sgs.join(", ")
    );
  }, [segments]);

  if (firstLoad === null) return;
  if (firstLoad) return <OnboardingContent />;
  return (
    <Tabs
      initialRouteName="(main)"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          opacity: hideTabBar || !tabbarVisible ? 0 : 1,
        },
      }}
    >
      <Tabs.Screen
        name="(main)"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <TabbarIcon
              type="home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(chat)"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <TabbarIcon
              type="msg"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <TabbarIcon
              type="calendar"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(community)"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <TabbarIcon
              type="community"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        listeners={{
          state: (e) => {
            const routes = e.data.state.routes;
            const lastRoute = routes[routes.length - 1];
            const visible =
              !lastRoute.params ||
              !(lastRoute.params as { tab: null | string })?.tab;
            setVisible(visible);
          },
        }}
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <TabbarIcon
              type="profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
