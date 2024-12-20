import { RadioGroupItemWithLabel } from "@/components/ui/radio";
import { setValueToForm } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { RadioGroup } from "tamagui";

type MusicianTypeSelectPropType = {
  form: UseFormReturn<any>;
  position: string;
};

export default function MusicianTypeSelect({
  form,
  position,
}: MusicianTypeSelectPropType) {
  return (
    <RadioGroup
      value={position}
      onValueChange={(v: string) => setValueToForm(form, "position", v)}
      gap={8}
    >
      <RadioGroupItemWithLabel
        id="singer"
        label="Singer"
        value="singer"
        selected={position === "singer"}
      />
      <RadioGroupItemWithLabel
        id="musician"
        label="Musician"
        value="musician"
        selected={position === "musician"}
      />
      <RadioGroupItemWithLabel
        id="band"
        label="Band"
        value="band"
        selected={position === "band"}
      />
    </RadioGroup>
  );
}
