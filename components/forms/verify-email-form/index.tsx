import ResultDialog from "@/components/dialogs/result-dialog";
import OTPInput from "@/components/ui/otp-input";
import { colors, typography } from "@/tamagui.config";
import { useCallback, useState } from "react";
import { Text, YStack } from "tamagui";

const VALID_CODE = 1234;
export default function VerifyEmailForm({
  email,
  goToSteps,
}: {
  email: string;
  goToSteps: () => void;
}) {
  const [isOpen, setOpen] = useState(false);

  const onResend = useCallback(() => {
    //todo: add logic
  }, []);

  const onSetCode = useCallback(
    (code: string[]) => {
      const full = code.every(Boolean);
      if (full) {
        const codeNum = Number(code.join(""));
        if (codeNum !== VALID_CODE) {
          return setOpen(true);
        }
        goToSteps();
      }
    },
    [goToSteps]
  );

  return (
    <>
      <YStack
        marginTop={16}
        gap={24}
        flexGrow={1}
      >
        <Text
          {...typography["medium-17"]}
          color={colors["gray-100"]}
          marginBottom={32}
        >
          Please enter the verification code we sent to {email}
        </Text>
        <OTPInput onCodeChange={onSetCode} />
        <YStack alignItems="center">
          <Text
            {...typography["reg-17"]}
            color={colors["gray-100"]}
          >
            Didn’n recieve the code?{" "}
          </Text>
          <Text
            {...typography["bold-17"]}
            color={colors["black"]}
            onPress={onResend}
          >
            Request again
          </Text>
        </YStack>
      </YStack>
      <ResultDialog
        open={isOpen}
        onOpenChange={setOpen}
        type="error"
        title="Oops!"
        description="It looks like you put in the wrong code, try again"
        buttonText="Try Again"
      />
    </>
  );
}
