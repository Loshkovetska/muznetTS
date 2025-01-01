import BottomBar from "@/components/bottom-bar";
import { useUser } from "@/components/providers/user-provider";
import Button from "@/components/ui/button";
import { Form, FormElement } from "@/components/ui/form";
import Text from "@/components/ui/text";
import { updatePasswordScheme } from "@/lib/scheme";
import { AuthService } from "@/lib/services";
import { UpdatePasswordRequestType, UserType } from "@/lib/types";
import { colors } from "@/tamagui.config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { YStack } from "tamagui";
import { z } from "zod";

type PasswordTabPropType = {
  user: UserType | null;
  header: React.ReactNode;
};

export default function PasswordTab({ user, header }: PasswordTabPropType) {
  const { updateUser } = useUser();

  const form = useForm({
    defaultValues: {
      old_password: "",
      new_password: "",
      rep_password: "",
    },
    mode: "onChange",
    resolver: zodResolver(updatePasswordScheme),
  });

  const { mutate: updatePassword, isPending } = useMutation({
    mutationFn: (params: UpdatePasswordRequestType) =>
      AuthService.updatePassword(params),
    onSuccess: async (data) => {
      updateUser();
      form.reset();
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof updatePasswordScheme>) => {
      if (user?.password !== values.old_password) {
        return form.setError("old_password", { message: "Incorrent password" });
      }
      updatePassword({
        new_password: values.new_password,
        id: user.id,
      });
    },
    [user]
  );
  return (
    <Form {...form}>
      <YStack
        gap={32}
        flexGrow={1}
        paddingHorizontal={16}
        backgroundColor={colors["main"]}
      >
        {header}
        <YStack>
          <FormElement
            name="old_password"
            placeholder="Enter current password"
            type="password"
          />
        </YStack>
        <YStack
          gap={8}
          flexGrow={1}
        >
          <Text
            typo="bold-17"
            marginBottom={8}
          >
            New password
          </Text>
          <YStack>
            <FormElement
              name="new_password"
              placeholder="Enter new password"
              type="password"
            />
          </YStack>
          <YStack>
            <FormElement
              name="rep_password"
              placeholder="Repeat New Password"
              type="password"
            />
          </YStack>
        </YStack>
      </YStack>
      <BottomBar>
        <Button
          variant="dark"
          sizeB="lg"
          disabled={!form.formState.isValid}
          loading={isPending}
          onPress={form.handleSubmit(onSubmit)}
        >
          Update password
        </Button>
      </BottomBar>
    </Form>
  );
}
