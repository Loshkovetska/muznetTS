import ReviewsList from "@/components/screens/details/reviews-list";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/lib/constants";
import { colors } from "@/tamagui.config";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { YStack } from "tamagui";

type FullScreenReviewsPropType = {
  open: boolean;
  rate: { rate: number; totalReviews: number };
  onOpenChange: () => void;
};

export default function FullScreenReviews({
  open,
  rate,
  onOpenChange,
}: FullScreenReviewsPropType) {
  return (
    <YStack
      position="absolute"
      width={SCREEN_WIDTH}
      height={SCREEN_HEIGHT}
      top={0}
      left={0}
      backgroundColor={colors["white"]}
      opacity={!open ? 0 : 1}
      animateOnly={["opacity"]}
      paddingTop={64}
      gap={16}
      paddingHorizontal={16}
    >
      <ChevronLeft
        size={24}
        onPress={onOpenChange}
      />
      <ReviewsList
        type="full"
        rate={rate}
      />
    </YStack>
  );
}
