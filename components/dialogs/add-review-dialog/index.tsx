import RateBlock from "@/components/dialogs/add-review-dialog/rate-block";
import { useUser } from "@/components/providers/user-provider";
import Button from "@/components/ui/button";
import { Form, FormElement } from "@/components/ui/form";
import { MobileSheet } from "@/components/ui/mobile-sheet";
import { QUERY_TAGS } from "@/lib/constants";
import { addReviewScheme } from "@/lib/scheme";
import ReviewService from "@/lib/services/review";
import { AddReviewRequestType, ReviewType, UserType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { YStack } from "tamagui";
import { z } from "zod";

type AddReviewDialogPropType = {
  open: boolean;
  profile_id?: string;
  ad_id?: string;
  rate: { rate: number; totalReviews: number };
  onOpenChange: () => void;
};
export default function AddReviewDialog({
  open,
  profile_id,
  ad_id,
  rate,
  onOpenChange,
}: AddReviewDialogPropType) {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { mutate: addReview } = useMutation({
    mutationFn: (body: AddReviewRequestType) => ReviewService.addReview(body),
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_TAGS.REVIEWS], (old: ReviewType[]) => [
        ...old,
        data?.review,
      ]);
      profile_id &&
        queryClient.setQueryData(
          [QUERY_TAGS.MUSICIAN, profile_id],
          (old: UserType) => ({ ...old, rate: data?.newRate })
        );
      form.reset();
      onOpenChange();
    },
  });
  const form = useForm({
    defaultValues: {
      rate: 0,
      text: "",
    },
    resolver: zodResolver(addReviewScheme),
    mode: "onChange",
  });

  const handleCloseDialog = useCallback(() => {
    form.reset();
    onOpenChange();
  }, [form, onOpenChange]);

  const onSubmit = useCallback(
    (values: z.infer<typeof addReviewScheme>) => {
      addReview({
        ...values,
        profile_id,
        ad_id,
        user_id: user?.id || "",
        postRate: rate,
      });
    },
    [user, profile_id, ad_id, rate, addReview]
  );

  return (
    <MobileSheet
      open={open}
      onOpenChange={handleCloseDialog}
    >
      <Form {...form}>
        <YStack
          gap={24}
          height={300}
          width="100%"
          alignItems="center"
        >
          <RateBlock form={form} />
          <FormElement
            name="text"
            type="textarea"
            placeholder="Share your opinion"
          />
        </YStack>
      </Form>
      <Button
        sizeB="lg"
        variant="dark"
        disabled={!form.formState.isValid}
        onPress={form.handleSubmit(onSubmit)}
      >
        Add Review
      </Button>
    </MobileSheet>
  );
}
