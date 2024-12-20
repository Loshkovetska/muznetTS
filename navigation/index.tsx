import { Stack } from "expo-router";

export default function Navigation({ firstLoad }: { firstLoad: boolean }) {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {firstLoad && <Stack.Screen name="onboarding" />}
      {!firstLoad && <Stack.Screen name="(tabs)" />}
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
