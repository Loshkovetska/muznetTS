import { STEPS_TITLE } from "@/components/screens/auth/sign-up/sign-up-steps/steps-title/constants";
import { colors, typography } from "@/tamagui.config";
import { Text, YStack } from "tamagui";

type StepsTitlePropType = {
  step_name: string;
};

export default function StepsTitle({ step_name }: StepsTitlePropType) {
  const TITLE = STEPS_TITLE[step_name as "user_name"];
  return (
    <YStack
      gap={8}
      alignItems="center"
    >
      <Text
        textAlign="center"
        {...typography["heading-24"]}
        color={colors["black"]}
      >
        Welcome to MuzNet!
      </Text>
      <Text
        {...typography["paragraph-17"]}
        color={colors["disabled"]}
        textAlign="center"
      >
        {TITLE}
      </Text>
    </YStack>
  );
}
