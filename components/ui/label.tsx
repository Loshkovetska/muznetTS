import { typography } from "@/tamagui.config";
import { GetProps, Label as LabelT } from "tamagui";

type LabelPropType = GetProps<typeof LabelT> & {
  typo?: keyof typeof typography;
};

const Label = ({ children, typo = "medium-16", ...props }: LabelPropType) => {
  return (
    <LabelT
      {...typography[typo]}
      {...props}
    >
      {children}
    </LabelT>
  );
};

export default Label;
