import { colors } from "@/tamagui.config";
import { Separator as SeparatorT } from "tamagui";

export default function Separator() {
  return (
    <SeparatorT
      borderColor={colors["disabled"]}
      opacity={0.2}
      borderWidth={0.5}
      borderRadius={3}
    />
  );
}
