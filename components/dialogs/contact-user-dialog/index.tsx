import CommonHeader from "@/components/common-header";
import InfoMessage from "@/components/info-message";
import ProfileBottomBar from "@/components/screens/profile/profile-bottombar";
import Button from "@/components/ui/button";
import { Form, FormElement } from "@/components/ui/form";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/lib/constants";
import useMessages from "@/lib/hooks/messages.hook";
import { colors, typography } from "@/tamagui.config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Text, YStack } from "tamagui";
import { z } from "zod";

type ContactUserDialogPropType = {
  open: boolean;
  from: string;
  to: string;
  isMusician: boolean;
  onOpenChange: () => void;
};

export default function ContactUserDialog({
  open,
  from,
  to,
  isMusician,
  onOpenChange,
}: ContactUserDialogPropType) {
  const form = useForm({
    defaultValues: { text: "", from, to },
    mode: "onChange",
    resolver: zodResolver(
      z.object({
        from: z.string(),
        to: z.string(),
        text: z.string().min(6, "Too short message"),
      })
    ),
  });

  const { sendMessage, isSendPending } = useMessages({
    navigate: true,
    enabled: false,
    onSuccess: () => {
      onOpenChange();
      form.reset();
    },
  });

  const onSubmit = useCallback(
    (values: any) => {
      sendMessage({ ...values, files: [] });
    },
    [sendMessage]
  );
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
      <CommonHeader
        marginTop={0}
        onBack={onOpenChange}
        title={`Contact ${isMusician ? "Vendor" : "Musician"}`}
      />
      <Text
        {...typography["paragraph-16"]}
        color="#5C6574"
      >
        Introduce yourself to Leo Ferguson and let him know a little about your
        event.
      </Text>

      <Form {...form}>
        <YStack gap={8}>
          <FormElement
            name="text"
            type="textarea"
            placeholder="Write your message"
          />
          <InfoMessage text="For your payment and safety never transfer money or communicate outside of the MuzNet app" />
        </YStack>
      </Form>
      <ProfileBottomBar width={SCREEN_WIDTH}>
        <Button
          sizeB="lg"
          variant="dark"
          loading={isSendPending}
          disabled={!form.formState.isValid}
          onPress={form.handleSubmit(onSubmit)}
        >
          Contact
        </Button>
      </ProfileBottomBar>
    </YStack>
  );
}
