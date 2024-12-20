import Button from "@/components/ui/button";
import { Form, FormElement } from "@/components/ui/form";
import { emailScheme } from "@/lib/scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { YStack } from "tamagui";
import { z } from "zod";

export default function EmailForm({
  setEmail,
}: {
  setEmail: (v: string) => void;
}) {
  const form = useForm({
    defaultValues: { email: "" },
    mode: "onChange",
    resolver: zodResolver(emailScheme),
  });

  const onSubmit = useCallback((values: z.infer<typeof emailScheme>) => {
    //   todo: add logic
    setEmail(values.email);
  }, []);
  return (
    <>
      <YStack
        flexGrow={1}
        marginTop={12}
      >
        <Form {...form}>
          <FormElement
            name="email"
            placeholder="Enter your email"
          />
        </Form>
      </YStack>
      <Button
        variant="dark"
        sizeB="lg"
        disabled={!form.formState.isValid}
        onPress={form.handleSubmit(onSubmit)}
        marginBottom={24}
      >
        Send Code
      </Button>
    </>
  );
}
