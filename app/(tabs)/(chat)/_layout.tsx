import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="chat/index" />
      <Stack.Screen name="chat/[id]/index" />
    </Stack>
  );
}
