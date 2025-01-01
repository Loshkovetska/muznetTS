import Separator from "@/components/ui/separator";
import { typography } from "@/tamagui.config";
import { PropsWithChildren } from "react";
import { Stack, Text, XStack, YStack, styled } from "tamagui";

const StepWrapper = styled(Stack, {
  alignItems: "center",
  justifyContent: "center",
  width: 91,
  height: 31,
  borderRadius: 24,
  variants: {
    variant: {
      main: {
        padding: 4,
        borderRadius: 24,
        backgroundColor: "#EEEEEE",
      },
      secondary: {
        width: "100%",
        height: "100%",
        borderRadius: 40,
        backgroundColor: "#D9D9D9",
      },
    },
  },
});

export default function PostFormStep(
  props: PropsWithChildren & { stepNum: number }
) {
  return (
    <YStack gap={16}>
      <XStack
        alignItems="center"
        gap={16}
      >
        <Separator />
        <StepWrapper variant="main">
          <StepWrapper variant="secondary">
            <Text {...typography["heading-14"]}>Step {props.stepNum}</Text>
          </StepWrapper>
        </StepWrapper>
        <Separator />
      </XStack>
      {props.children}
    </YStack>
  );
}
