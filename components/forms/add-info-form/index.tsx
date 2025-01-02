import SkillsList from "@/components/forms/skills-list";
import ImagePicker from "@/components/image-picker";
import { FormElement } from "@/components/ui";
import { UseFormReturn } from "react-hook-form";
import { YStack } from "tamagui";

type AddInfoFormPropType = {
  form: UseFormReturn<any>;
  hide?: string[];
  user_type: "musician" | "contractor";
} & React.PropsWithChildren;

export default function AddInfoForm({
  form,
  user_type,
  hide = [],
  children,
}: AddInfoFormPropType) {
  return (
    <YStack
      gap={8}
      paddingBottom={80}
      flexGrow={1}
    >
      <ImagePicker form={form} />
      <FormElement
        name="name"
        placeholder="Enter your name"
      />
      <FormElement
        name="surname"
        placeholder="Enter your surname"
      />
      <FormElement
        name="email"
        placeholder="Enter your email"
        disabled
      />
      {!hide?.includes("password") && (
        <FormElement
          type="password"
          name="password"
          placeholder="Enter your password"
        />
      )}
      <FormElement
        name="description"
        placeholder="Add description"
      />
      {user_type === "musician" && (
        <YStack marginBlock={8}>
          <FormElement
            name="willing_to_travel"
            placeholder="Willing to travel interstate for gigs"
            type="checkbox"
          />
        </YStack>
      )}
      <FormElement
        name="address"
        placeholder="Add address"
        type="location"
      />
      {children}

      {user_type === "musician" && <SkillsList />}
      {user_type === "musician" && (
        <FormElement
          name="price_per_hour"
          placeholder="Add price in $"
        />
      )}
    </YStack>
  );
}
