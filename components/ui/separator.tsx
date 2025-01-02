import { colors } from "@/tamagui.config";
import { Separator as SeparatorT } from "tamagui";

export function Separator() {
  return (
    <SeparatorT
      borderColor={colors["gray-100"]}
      opacity={0.2}
      borderWidth={0.5}
      borderRadius={3}
    />
  );
}
