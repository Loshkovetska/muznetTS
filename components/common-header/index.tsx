import { typography } from "@/tamagui.config";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { useNavigation } from "expo-router";
import { useCallback } from "react";
import { Text, XStack, XStackProps } from "tamagui";

type CommonHeaderPropType = {
  title: string | React.ReactNode;
  marginTop?: number;
  buttonRight?: React.ReactNode;
  onBack?: () => void;
} & XStackProps;
export default function CommonHeader({
  title,
  marginTop = 60,
  buttonRight,
  onBack,
  ...props
}: CommonHeaderPropType) {
  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    if (onBack) return onBack();
    navigation.goBack();
  }, [onBack]);

  return (
    <XStack
      alignItems="center"
      justifyContent={buttonRight && title ? "space-between" : "center"}
      width="100%"
      marginTop={marginTop}
      position="relative"
      {...props}
    >
      <ChevronLeft
        size={30}
        position={buttonRight && title ? "relative" : "absolute"}
        left={0}
        transform={buttonRight && title ? undefined : [{ translateY: "-50%" }]}
        top={buttonRight && title ? undefined : "50%"}
        onPress={handleBack}
      />
      {typeof title === "string" ? (
        <Text {...typography["heading-24"]}>{title}</Text>
      ) : (
        title
      )}
      {buttonRight}
    </XStack>
  );
}
