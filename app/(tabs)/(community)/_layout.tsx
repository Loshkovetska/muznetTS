import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="search" />
      <Stack.Screen name="add-post" />
      <Stack.Screen name="search-list" />
      <Stack.Screen name="post/[id]/comments" />
      <Stack.Screen name="post/[id]/edit" />
    </Stack>
  );
}
