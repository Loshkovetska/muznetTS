import CommonHeader from "@/components/common-header";
import Text from "@/components/ui/text";
import { SCREEN_WIDTH } from "@/lib/constants";
import { colors } from "@/tamagui.config";
import { XStack, YStack, styled } from "tamagui";

const StyledSlider = styled(XStack, {
  width: "100%",
  height: 5,
  borderRadius: 5,
  backgroundColor: colors["black-10"],
});

type StepsHeaderPropType = {
  step: number;
  lastStep: number;
  setStep: () => void;
};

export default function StepsHeader({
  step,
  lastStep,
  setStep,
}: StepsHeaderPropType) {
  return (
    <YStack gap={16}>
      <CommonHeader
        title={
          <Text
            typo="reg-17"
            color="black"
          >
            {step + 1} <Text color="ghost">of {lastStep}</Text>
          </Text>
        }
        onBack={!step ? undefined : setStep}
      />
      <StyledSlider overflow="hidden">
        <StyledSlider
          backgroundColor="black"
          width={((SCREEN_WIDTH - 32) / lastStep) * (step + 1)}
          animateOnly={["width"]}
        />
      </StyledSlider>
    </YStack>
  );
}
