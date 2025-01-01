import IndicatorBlock from "@/components/indicator-block";
import Button from "@/components/ui/button";
import { SCREEN_WIDTH } from "@/lib/constants";
import { colors, typography } from "@/tamagui.config";
import { ArrowRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, Text, XStack, YStack, styled } from "tamagui";
import { ONBOARDING_CONTENT } from "./constants";

const StyledContainer = styled(YStack, {
  height: "100%",
  width: "100%",
  backgroundColor: colors["white"],
});

const StyledImageBlock = styled(YStack, {
  width: SCREEN_WIDTH,
  height: SCREEN_WIDTH + 100,
  alignItems: "center",
  justifyContent: "flex-end",
});

const StyledContent = styled(YStack, {
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 30,
  paddingBottom: 50,
  backgroundColor: colors["white"],
  flexGrow: 1,
});

const ButtonsBlock = styled(XStack, {
  height: 56,
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
});

export default function OnboardingContent() {
  const [screenNumber, setScreenNumber] = useState(0);
  const CONTENT = ONBOARDING_CONTENT[screenNumber];

  return (
    <StyledContainer>
      <StyledImageBlock>
        <Image
          width={SCREEN_WIDTH}
          height={SCREEN_WIDTH}
          source={CONTENT.image}
          resizeMode="cover"
        />
      </StyledImageBlock>
      <StyledContent>
        <Text
          {...typography["heading-20"]}
          paddingBottom={10}
        >
          {CONTENT.title}
        </Text>
        <Text
          {...typography["paragraph-17"]}
          textAlign="center"
        >
          {CONTENT.text}
        </Text>
        <IndicatorBlock
          currentIndex={screenNumber}
          list={Object.keys(ONBOARDING_CONTENT)}
        />
        <ButtonsBlock>
          {screenNumber < 3 ? (
            <>
              <Link
                asChild
                href="/sign-in"
              >
                <Button
                  sizeB="lg"
                  variant="transparent"
                  textProps={typography["heading-20"]}
                  width="auto"
                >
                  Skip
                </Button>
              </Link>
              <Button
                sizeB="lg"
                variant="transparent"
                width="auto"
                textProps={typography["heading-20"]}
                onPress={() => setScreenNumber((prev) => prev + 1)}
                iconRight={<ArrowRight color={colors["black"]} />}
              >
                Next
              </Button>
            </>
          ) : (
            <Link
              asChild
              href="/sign-in"
            >
              <Button
                sizeB="lg"
                variant="dark"
              >
                Get Started
              </Button>
            </Link>
          )}
        </ButtonsBlock>
      </StyledContent>
    </StyledContainer>
  );
}
