import { colors } from "@/tamagui.config";
import { Stack } from "tamagui";

type PostMediaItemRadioPropType = {
  isSelected?: boolean;
};

export default function PostMediaItemRadio({
  isSelected,
}: PostMediaItemRadioPropType) {
  return (
    <Stack
      position="absolute"
      top={4}
      right={4}
      zIndex={2}
      width={16}
      height={16}
      borderWidth={2}
      borderColor={colors[isSelected ? "black" : "main"]}
      borderRadius={10}
      alignItems="center"
      justifyContent="center"
    >
      {isSelected && (
        <Stack
          width={8}
          height={8}
          borderRadius={4}
          backgroundColor={colors["black"]}
        />
      )}
    </Stack>
  );
}
