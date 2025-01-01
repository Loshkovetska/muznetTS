import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { MobileSheet } from "@/components/ui/mobile-sheet";
import usePosts from "@/lib/hooks/posts.hook";
import { BaseDialogPropType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
import { CircleCheck } from "@tamagui/lucide-icons";
import { useCallback, useState } from "react";
import { Text, YStack } from "tamagui";

const CONTENT_STRATEGY = {
  0: {
    title: "Please indicate the reason why you reporting this post",
    text: "This report is anonymous.",
  },
  1: {
    title: "Thanks for  letting us know",
    text: "Your feedback is  important to us",
  },
};

type ReportDialogPropType = {
  post_id: string;
} & BaseDialogPropType;

export default function ReportDialog({
  open,
  post_id,
  onOpenChange,
}: ReportDialogPropType) {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState("");

  const { reportPost, isReportPending } = usePosts({
    onReportSuccess: () => setStep(1),
  });

  const onSubmit = useCallback(() => {
    reportPost({ post_id, reason: value });
  }, [value, post_id, reportPost]);

  const onClose = useCallback(() => {
    onOpenChange();
    setValue("");
    setStep(0);
  }, [onOpenChange]);

  return (
    <MobileSheet
      open={open}
      onOpenChange={onClose}
    >
      <YStack
        gap={16}
        flexGrow={1}
        height={300}
      >
        <YStack gap={8}>
          {step === 1 && (
            <CircleCheck
              color={colors["main"]}
              fill={colors["success"]}
              size={48}
              marginBottom={8}
            />
          )}
          <Text {...typography["bold-20"]}>
            {CONTENT_STRATEGY[step as 0].title}
          </Text>
          <Text
            {...typography["reg-16"]}
            color={colors["gray-100"]}
          >
            {CONTENT_STRATEGY[step as 0].text}
          </Text>
        </YStack>
        {!step && (
          <Input
            value={value}
            animate={false}
            placeholder="Write the reason here"
            onChangeText={setValue}
          />
        )}
      </YStack>
      <Button
        sizeB="lg"
        variant="dark"
        disabled={!step && value.length < 5}
        loading={isReportPending}
        onPress={!step ? onSubmit : onClose}
      >
        {!step ? "Submit" : "Perfect!"}
      </Button>
    </MobileSheet>
  );
}
