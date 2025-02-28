import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="details/[id]/index" />
      <Stack.Screen name="search" />
      <Stack.Screen name="map" />
    </Stack>
  );
}
