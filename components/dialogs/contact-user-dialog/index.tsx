import BottomBar from "@/components/bottom-bar";
import CommonDialogWrapper from "@/components/common-dialog-wrapper";
import CommonHeader from "@/components/common-header";
import InfoMessage from "@/components/info-message";
import Button from "@/components/ui/button";
import { Form, FormElement } from "@/components/ui/form";
import { SCREEN_WIDTH } from "@/lib/constants";
import useMessages from "@/lib/hooks/messages.hook";
import { BaseDialogPropType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Text, YStack } from "tamagui";
import { z } from "zod";

type ContactUserDialogPropType = {
  from: string;
  to: string;
  isMusician: boolean;
} & BaseDialogPropType;

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
    <CommonDialogWrapper open={open}>
      <CommonHeader
        marginTop={0}
        onBack={onOpenChange}
        title={`Contact ${isMusician ? "Vendor" : "Musician"}`}
      />
      <Text
        {...typography["reg-16"]}
        color={colors["gray-100"]}
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
      <BottomBar width={SCREEN_WIDTH}>
        <Button
          sizeB="lg"
          variant="dark"
          loading={isSendPending}
          disabled={!form.formState.isValid}
          onPress={form.handleSubmit(onSubmit)}
        >
          Contact
        </Button>
      </BottomBar>
    </CommonDialogWrapper>
  );
}
