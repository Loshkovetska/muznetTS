import { STEPS_TITLE } from "@/components/screens/auth/sign-up/sign-up-steps/steps-title/constants";
import Text from "@/components/ui/text";
import { YStack } from "tamagui";

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
        typo="bold-24"
        color="black"
      >
        Welcome to MuzNet!
      </Text>
      <Text
        typo="reg-17"
        color="gray-100"
        textAlign="center"
      >
        {TITLE}
      </Text>
    </YStack>
  );
}
