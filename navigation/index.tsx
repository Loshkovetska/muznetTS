import { Stack } from "expo-router";

export default function Navigation({ firstLoad }: { firstLoad: boolean }) {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      {!firstLoad && <Stack.Screen name="(tabs)" />}
    </Stack>
  );
}
