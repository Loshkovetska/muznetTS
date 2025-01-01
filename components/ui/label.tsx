import { typography } from "@/tamagui.config";
import { GetProps, Label as LabelT, styled } from "tamagui";

const StyledLabel = styled(LabelT, {
  variants: {
    sizeB: {
      default: typography["medium-16"],
      "s-17": typography["medium-17"],
      sm: typography["medium-10"],
    },
  } as const,

  defaultVariants: {
    sizeB: "default",
  },
});

type LabelPropType = GetProps<typeof StyledLabel> & {};

const Label = ({ children, ...props }: LabelPropType) => {
  return <StyledLabel {...props}>{children}</StyledLabel>;
};

export default Label;
