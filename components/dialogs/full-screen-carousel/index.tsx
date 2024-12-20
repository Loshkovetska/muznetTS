import SingleCarousel from "@/components/single-carousel";
import Button from "@/components/ui/button";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/lib/constants";
import { colors } from "@/tamagui.config";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Text, XStack, YStack } from "tamagui";

type FullScreenCarouselPropType = {
  ind: number;
  images: string[];
  onOpenChange: () => void;
};

export default function FullScreenCarousel({
  ind,
  images,
  onOpenChange,
}: FullScreenCarouselPropType) {
  const [currentInd, setCurrentIndex] = useState(0);
  return (
    <YStack
      position="absolute"
      width={SCREEN_WIDTH}
      height={SCREEN_HEIGHT}
      top={0}
      left={0}
      backgroundColor={colors["black"]}
      opacity={ind === -1 ? 0 : 1}
      animateOnly={["opacity"]}
      justifyContent="center"
      alignItems="center"
    >
      <XStack
        position="absolute"
        top={64}
        left={0}
        width="100%"
        paddingHorizontal={16}
        justifyContent="space-between"
        zIndex={200}
      >
        <Button
          variant="white/50"
          sizeB="icon"
          borderRadius={6}
          onPress={onOpenChange}
        >
          <ChevronLeft
            color="white"
            size={32}
          />
        </Button>
        {images.length > 1 && (
          <Text color={colors["white"]}>
            {currentInd + 1}/{images.length}
          </Text>
        )}
      </XStack>
      <SingleCarousel
        initialIndex={ind > -1 ? ind : undefined}
        width={SCREEN_WIDTH - 32}
        height={SCREEN_WIDTH}
        images={images?.length ? images : null}
        resizeMode="contain"
        onIndexChange={setCurrentIndex}
      />
    </YStack>
  );
}
