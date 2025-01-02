import ResultDialog from "@/components/dialogs/result-dialog";
import AddInfoForm from "@/components/forms/add-info-form";
import SelectProvider from "@/components/providers/select-provider";
import ContractorTypeSelect from "@/components/screens/auth/sign-up/contractor-type-select";
import MusicianTypeSelect from "@/components/screens/auth/sign-up/musician-type-select";
import StepsHeader from "@/components/screens/auth/sign-up/sign-up-steps/steps-header";
import StepsTitle from "@/components/screens/auth/sign-up/sign-up-steps/steps-title";
import UserTypeSelect from "@/components/screens/auth/sign-up/user-type-select";
import SearchWithSelect from "@/components/search-with-select";
import { Button, Form, FormElement, SelectContent } from "@/components/ui";
import { SCREEN_HEIGHT } from "@/lib/constants";
import { GENRES, GROUP_MEMBERS, INSTRUMENTS } from "@/lib/constants/lists";
import useAuth from "@/lib/hooks/auth.hook";
import { signUpStep0 } from "@/lib/scheme";
import { setValueToForm } from "@/lib/utils";
import {
  generateScheme,
  generateStepName,
  isLastSignUpStep,
} from "@/lib/utils/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { ScrollView, YStack } from "tamagui";

export default function SignUpSteps({ email }: { email: string }) {
  const [step, setStep] = useState(0);
  const [scheme, setScheme] = useState(signUpStep0);
  const [ref, setRef] = useState<ScrollView | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const { isSignUpPending, isOpenDialog, signUp, onSignIn } = useAuth();

  const form = useForm({
    defaultValues: {
      email,
      user_name: "",
      name: "",
      surname: "",
      password: "",
      user_type: "contractor",
      photo: "",
      position: "",
      sing_by_ear: false,
      play_by_ear: false,
      read_sheet_music: false,
      willing_to_travel: false,
      musical_instruments: [],
      musical_genres: [],
      description: "",
      address: "",
      group_members: [],
      price_per_hour: "",
    },
    mode: "onChange",
    resolver: zodResolver(scheme),
  });

  const userType = useWatch({
    control: form.control,
    name: "user_type",
  });

  const userPosition = useWatch({
    control: form.control,
    name: "position",
  });

  const lastStep = useMemo(() => {
    return userType === "contractor" ? 4 : userPosition === "band" ? 7 : 6;
  }, [userType, userPosition]);

  const stepName = useMemo(() => {
    return generateStepName(step, userType, userPosition);
  }, [step, userPosition, userType]);

  const onStepChange = useCallback(
    (num: number) => {
      const nextStep = step + num;
      setScheme(generateScheme(nextStep, userType, userPosition) as any);
      form.trigger();
      setStep((prev) => prev + num);
    },
    [step, userPosition, userType]
  );

  const onSubmit = useCallback(
    (values: any) => {
      signUp(values);
    },
    [signUp]
  );

  return (
    <SelectProvider
      scrollRef={ref}
      coords={coords}
    >
      <StepsHeader
        step={step}
        lastStep={lastStep}
        setStep={() => onStepChange(-1)}
      />
      <ScrollView
        ref={(e) => {
          setRef(e);
        }}
        onLayout={({ nativeEvent: { layout } }) =>
          setCoords({ x: layout.x, y: layout.y })
        }
        width="100%"
        maxHeight={SCREEN_HEIGHT - 200}
        showsVerticalScrollIndicator={false}
        flexGrow={1}
      >
        <YStack flexGrow={1}>
          <Form {...form}>
            <YStack
              marginTop={32}
              gap={24}
            >
              <StepsTitle step_name={stepName} />
              {!step && (
                <FormElement
                  name="user_name"
                  placeholder="Username"
                />
              )}
              {step === 1 && (
                <UserTypeSelect
                  form={form}
                  userType={userType}
                />
              )}
              {step === 2 && (
                <>
                  {userType === "musician" && (
                    <MusicianTypeSelect
                      form={form}
                      position={userPosition}
                    />
                  )}
                  {userType === "contractor" && (
                    <ContractorTypeSelect position={userPosition} />
                  )}
                </>
              )}
              {isLastSignUpStep(step, userType, userPosition) && (
                <AddInfoForm
                  form={form}
                  user_type={userType as "musician"}
                />
              )}
              {userType === "musician" && (
                <>
                  {step === 3 && (
                    <SearchWithSelect
                      form={form}
                      name={
                        userPosition === "band"
                          ? "group_members"
                          : "musical_instruments"
                      }
                      options={
                        userPosition === "band" ? GROUP_MEMBERS : INSTRUMENTS
                      }
                      placeholder="Search instruments"
                    />
                  )}
                  {step === 4 && (
                    <SearchWithSelect
                      form={form}
                      name={
                        userPosition === "band"
                          ? "musical_instruments"
                          : "musical_genres"
                      }
                      options={userPosition === "band" ? INSTRUMENTS : GENRES}
                      placeholder={
                        userPosition === "band"
                          ? "Search instruments"
                          : "Search music genres"
                      }
                    />
                  )}
                  {step === 5 && userPosition === "band" && (
                    <SearchWithSelect
                      form={form}
                      name="musical_genres"
                      options={GENRES}
                      placeholder="Search music genres"
                    />
                  )}
                </>
              )}
            </YStack>
          </Form>
        </YStack>
      </ScrollView>
      <Button
        variant="dark"
        sizeB="lg"
        loading={isSignUpPending}
        disabled={!scheme.safeParse(form.getValues()).success}
        onPress={
          step + 1 === lastStep
            ? form.handleSubmit(onSubmit)
            : () => onStepChange(1)
        }
      >
        Next step
      </Button>
      <SelectContent
        onValueChange={(name, v) => setValueToForm(form, name, v)}
      />
      <ResultDialog
        open={!!isOpenDialog}
        title="Great!"
        description="Your account has been successfully created"
        buttonText="Go to Home!"
        onOpenChange={onSignIn}
        type="success"
      />
    </SelectProvider>
  );
}
