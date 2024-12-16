import Button from "@/components/ui/button";
import { colors, typography } from "@/tamagui.config";
import { ArrowRight } from "@tamagui/lucide-icons";
import { Link, useNavigation } from "expo-router";
import { useState } from "react";
import { Image, Stack, Text, XStack, YStack, styled } from "tamagui";
import { ONBOARDING_CONTENT } from "./constants";

const StyledImage = styled(Image, {
  width: "112%",
  maxHeight: "100%",
});

const StyledContainer = styled(YStack, {
  height: "100%",
  width: "100%",
  backgroundColor: colors["white"],
});

const StyledImageBlock = styled(YStack, {
  width: "100%",
  height: "100%",
  maxHeight: 432,
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: colors["white"],
});

const StyledContent = styled(YStack, {
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 30,
  paddingBottom: 50,
  backgroundColor: colors["white"],
  flexGrow: 1,
});

const IndicatorBlock = styled(XStack, {
  width: 61,
  marginTop: 16,
  marginBottom: 20,
  alignItems: "center",
  justifyContent: "space-between",
});

const IndicatorThumb = styled(Stack, {
  height: 6,
  width: 20,
  borderRadius: 3,
  backgroundColor: colors["black"],
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 10,
});

const IndicatorItem = styled(Stack, {
  height: 6,
  width: 6,
  borderRadius: 3,
  backgroundColor: colors["gray"],
});

const ButtonsBlock = styled(XStack, {
  height: 56,
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
});

export default function OnboardingContent() {
  const navigation = useNavigation();
  const [screenNumber, setScreenNumber] = useState(0);
  const CONTENT = ONBOARDING_CONTENT[screenNumber];

  return (
    <StyledContainer>
      <StyledImageBlock>
        <StyledImage source={CONTENT.image} />
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
        <IndicatorBlock>
          <IndicatorThumb left={CONTENT.thumbOffsetLeft} />
          {Object.keys(ONBOARDING_CONTENT).map((key) => (
            <IndicatorItem key={key} />
          ))}
          <IndicatorItem />
        </IndicatorBlock>
        <ButtonsBlock>
          {screenNumber < 3 ? (
            <>
              <Link
                asChild
                href="/sign-in"
              >
                <Button
                  size="lg"
                  flexGrow={1 / 2}
                  width="auto"
                >
                  Skip
                </Button>
              </Link>
              <Button
                size="lg"
                variant="dark"
                flexGrow={1 / 2}
                maxWidth="50%"
                width="auto"
                onPress={() => setScreenNumber((prev) => prev + 1)}
                iconRight={<ArrowRight color={colors["white"]} />}
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
                size="lg"
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
