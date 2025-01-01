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
      width={20}
      height={20}
      borderWidth={2}
      borderColor={colors[isSelected ? "black" : "white"]}
      borderRadius={10}
      alignItems="center"
      justifyContent="center"
    >
      {isSelected && (
        <Stack
          width={10}
          height={10}
          borderRadius={5}
          backgroundColor={colors["black"]}
        />
      )}
    </Stack>
  );
}
