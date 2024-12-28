import TabbarIcon from "@/navigation/tabbar-icon";
import { Tabs, useSegments } from "expo-router";
import { useMemo, useState } from "react";

const HIDE_TABBAR_SCREENS = ["search", "details", "map"];

export default function RootLayout() {
  const segments = useSegments();
  const [tabbarVisible, setVisible] = useState(true);

  const hideTabBar = useMemo(() => {
    const sgs = [...segments];
    return HIDE_TABBAR_SCREENS.some(
      (s) =>
        sgs.includes(s as "details") ||
        (sgs.includes("chat") && sgs.includes("[id]"))
    );
  }, [segments]);

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
      <Tabs.Screen
        name="chat/index"
        options={{
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="chat/[id]/index"
        options={{
          tabBarItemStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
