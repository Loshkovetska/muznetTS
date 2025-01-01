import { typography } from "@/tamagui.config";
import { GetProps, Label as LabelT, styled } from "tamagui";

const StyledLabel = styled(LabelT, {
  variants: {
    sizeB: {
      default: typography["label-16"],
      "s-17": typography["label-17"],
      sm: {
        fontSize: 10,
        lineHeight: 12,
      },
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
