import CommonHeader from "@/components/common-header";
import EmailForm from "@/components/forms/email-form";
import VerifyEmailForm from "@/components/forms/verify-email-form";
import AuthBottomText from "@/components/screens/auth/auth-bottom-text";
import AuthContent from "@/components/screens/auth/auth-content";
import SignUpSteps from "@/components/screens/auth/sign-up/sign-up-steps";
import { useCallback, useState } from "react";

export default function AuthSignUp() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");

  const onStepChange = useCallback((type: "next" | "prev") => {
    setStep((prev) => prev + (type === "next" ? 1 : -1));
  }, []);

  const onSetEmail = useCallback(
    (email: string) => {
      setEmail(email);
      onStepChange("next");
    },
    [onStepChange]
  );

  const STEPS = { "0": "Sign Up", "1": "Verify Email" };
  return (
    <>
      <AuthContent paddingTop={0}>
        {step !== 2 && (
          <>
            <CommonHeader
              title={STEPS[String(step) as "0"]}
              onBack={step ? () => onStepChange("prev") : undefined}
            />
            {!step && <EmailForm setEmail={onSetEmail} />}
            {step === 1 && !!email && (
              <VerifyEmailForm
                email={email}
                goToSteps={() => setStep(2)}
              />
            )}
            {!step && <AuthBottomText isSignIn={false} />}
          </>
        )}
        {step === 2 && <SignUpSteps email={email} />}
      </AuthContent>
    </>
  );
}
