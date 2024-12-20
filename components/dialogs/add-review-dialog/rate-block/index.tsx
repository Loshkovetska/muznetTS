import { setValueToForm } from "@/lib/utils";
import { colors } from "@/tamagui.config";
import { StarFull } from "@tamagui/lucide-icons";
import { useCallback } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { XStack } from "tamagui";

type RateBlockPropType = {
  form: UseFormReturn<any>;
};

export default function RateBlock({ form }: RateBlockPropType) {
  const rate = useWatch({ control: form.control, name: "rate" });
  const stars = Array(5).fill("star");

  const onRate = useCallback(
    (id: number) => {
      setValueToForm(form, "rate", id + 1);
    },
    [form]
  );

  return (
    <XStack gap={16}>
      {stars.map((star, id) => (
        <StarFull
          key={id}
          size={48}
          color={colors[id + 1 <= rate ? "black" : "light-gray"]}
          onPress={() => onRate(id)}
        />
      ))}
    </XStack>
  );
}
