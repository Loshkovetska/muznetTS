import ImagePicker from "@/components/image-picker";
import { FormElement } from "@/components/ui/form";
import { typography } from "@/tamagui.config";
import { UseFormReturn } from "react-hook-form";
import { Text, YStack } from "tamagui";

type AddInfoFormPropType = {
  form: UseFormReturn<any>;
  hide?: string[];
  user_type: "musician" | "contractor";
};

export default function AddInfoForm({
  form,
  user_type,
  hide = [],
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
      />

      {user_type === "musician" && (
        <YStack
          gap={24}
          marginTop={16}
        >
          <Text {...typography["heading-15"]}>Skills:</Text>
          <YStack
            gap={16}
            marginBottom={8}
          >
            <FormElement
              name="sing_by_ear"
              type="checkbox"
              placeholder="Sing by ear"
            />
            <FormElement
              name="play_by_ear"
              placeholder="Play by ear"
              type="checkbox"
            />
            <FormElement
              name="read_sheet_music"
              placeholder="Read sheet music"
              type="checkbox"
            />
          </YStack>
        </YStack>
      )}
      {user_type === "musician" && (
        <FormElement
          name="price_per_hour"
          placeholder="Add price in $"
        />
      )}
    </YStack>
  );
}
