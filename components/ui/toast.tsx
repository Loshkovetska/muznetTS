import { SCREEN_WIDTH } from "@/lib/constants";
import { colors, typography } from "@/tamagui.config";
import { CircleCheck, CircleX } from "@tamagui/lucide-icons";
import { Text, XStack, styled } from "tamagui";

const ToastWrapper = styled(XStack, {
  width: SCREEN_WIDTH - 32,
  alignItems: "center",
  gap: 4,
  padding: 8,
  borderRadius: 8,
  zIndex: 200_00,
});

const Toast = (props: { type: "error" | "success"; text1: string }) => (
  <ToastWrapper
    backgroundColor={
      colors[props.type === "success" ? "light-success" : "light-error2"]
    }
  >
    {props.type === "success" && (
      <CircleCheck
        color={colors["main"]}
        fill={colors["success"]}
      />
    )}
    {props.type === "error" && <CircleX color={colors["error"]} />}

    <Text
      {...typography["medium-14"]}
      color={colors[props.type as "success"]}
    >
      {props.text1}
    </Text>
  </ToastWrapper>
);

const toastConfig = {
  error: (props: any) => <Toast {...props} />,
  success: (props: any) => <Toast {...props} />,
};

export default toastConfig;
