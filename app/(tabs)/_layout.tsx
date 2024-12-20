import TabbarIcon from "@/navigation/tabbar-icon";
import {
  Tabs,
  useLocalSearchParams,
  usePathname,
  useSegments,
} from "expo-router";
import { useState } from "react";

export default function RootLayout() {
  const segments = useSegments();
  const seachParams = useLocalSearchParams();
  const cs = usePathname();
  const [tabbarVisible, setVisible] = useState(true);

  const hideTabBar = [...segments].includes("details");
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          opacity: hideTabBar || !tabbarVisible ? 0 : 1,
        },
      }}
      screenListeners={{
        state: (st) => {
          const lastRoute =
            st.data.state.routes?.[st.data.state.routes.length - 1];
          if (lastRoute.name === "user" && !!lastRoute.params) {
            setVisible((lastRoute.params as any)?.tabbarVisible === "true");
          }
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
        name="chat/[id]/index"
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
