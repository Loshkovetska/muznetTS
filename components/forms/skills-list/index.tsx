import CheckboxWithLabel from "@/components/ui/checkbox";
import { FormElement } from "@/components/ui/form";
import { FiltersType } from "@/lib/types";
import { typography } from "@/tamagui.config";
import { Text, YStack } from "tamagui";

type SkillsListPropType = {
  selectedValues: FiltersType;
  onChange?: (name: string, value: boolean) => void;
};

export default function SkillsList({
  selectedValues,
  onChange,
}: SkillsListPropType) {
  return (
    <YStack
      gap={24}
      marginTop={16}
    >
      <Text {...typography[onChange ? "heading-17" : "heading-15"]}>
        Skills:
      </Text>
      <YStack
        gap={16}
        marginBottom={8}
      >
        {!onChange && (
          <>
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
          </>
        )}
        {onChange && (
          <>
            <CheckboxWithLabel
              name="sing_by_ear"
              label="Sing by ear"
              checked={selectedValues.sing_by_ear}
              onCheckedChange={(v) => onChange("sing_by_ear", v as boolean)}
            />
            <CheckboxWithLabel
              name="play_by_ear"
              label="Play by ear"
              checked={selectedValues.play_by_ear}
              onCheckedChange={(v) => onChange("play_by_ear", v as boolean)}
            />
            <CheckboxWithLabel
              name="read_sheet_music"
              label="Read sheet music"
              checked={selectedValues.read_sheet_music}
              onCheckedChange={(v) =>
                onChange("read_sheet_music", v as boolean)
              }
            />
          </>
        )}
      </YStack>
    </YStack>
  );
}
