import CommonDialogWrapper from "@/components/common-dialog-wrapper";
import ReviewsList from "@/components/screens/details/reviews-list";
import { BaseDialogPropType } from "@/lib/types";
import { ChevronLeft } from "@tamagui/lucide-icons";

type FullScreenReviewsPropType = {
  rate: { rate: number; totalReviews: number };
} & BaseDialogPropType;

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
