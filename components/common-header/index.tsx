import { typography } from "@/tamagui.config";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { useNavigation } from "expo-router";
import { useCallback } from "react";
import { Text, XStack } from "tamagui";

type CommonHeaderPropType = {
  title: string | React.ReactNode;
  marginTop?: number;
  onBack?: () => void;
};
export default function CommonHeader({
  title,
  marginTop = 60,
  onBack,
}: CommonHeaderPropType) {
  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    if (onBack) return onBack();
    navigation.goBack();
  }, [onBack]);

  return (
    <XStack
      alignItems="center"
      justifyContent="center"
      width="100%"
      marginTop={marginTop}
      position="relative"
    >
      <ChevronLeft
        size={30}
        position="absolute"
        left={0}
        transform={[{ translateY: "-50%" }]}
        top="50%"
        onPress={handleBack}
      />
      {typeof title === "string" ? (
        <Text {...typography["heading-24"]}>{title}</Text>
      ) : (
        title
      )}
    </XStack>
  );
}
