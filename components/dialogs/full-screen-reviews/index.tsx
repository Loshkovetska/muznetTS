import CommonDialogWrapper from "@/components/common-dialog-wrapper";
import ReviewsList from "@/components/screens/details/reviews-list";
import { ChevronLeft } from "@tamagui/lucide-icons";

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
    <CommonDialogWrapper open={open}>
      <ChevronLeft
        size={24}
        onPress={onOpenChange}
      />
      <ReviewsList
        type="full"
        rate={rate}
      />
    </CommonDialogWrapper>
  );
}
