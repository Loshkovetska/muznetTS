import Button from "@/components/ui/button";
import { Form, FormElement } from "@/components/ui/form";
import useAuth from "@/lib/hooks/auth.hook";
import { loginScheme } from "@/lib/scheme";
import { typography } from "@/tamagui.config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Text, YStack } from "tamagui";
import { z } from "zod";

export default function SignInForm() {
  const { signIn, isSignInPending } = useAuth();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(loginScheme),
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof loginScheme>) => {
      signIn(values);
    },
    [signIn]
  );
  return (
    <>
      <Text
        {...typography["heading-ext28"]}
        alignSelf="flex-start"
        marginBottom={28}
      >
        Join MuzNet!
      </Text>
      <Form {...form}>
        <YStack
          gap={12}
          width="100%"
        >
          <FormElement
            name="email"
            placeholder="Enter your email"
          />
          <FormElement
            type="password"
            name="password"
            placeholder="Enter your password"
            withIcons
          />
        </YStack>
      </Form>
      <Button
        sizeB="lg"
        variant="dark"
        disabled={!form.formState.isValid}
        marginTop={32}
        onPress={form.handleSubmit(onSubmit)}
        loading={isSignInPending}
      >
        Sign In
      </Button>
    </>
  );
}
