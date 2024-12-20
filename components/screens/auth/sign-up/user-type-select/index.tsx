import UserTypeItem from "@/components/screens/auth/sign-up/user-type-select/user-type-item";
import { setValueToForm } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { RadioGroup } from "tamagui";

type UserTypeSelectPropType = {
  form: UseFormReturn<any>;
  userType: string;
};

export default function UserTypeSelect({
  form,
  userType,
}: UserTypeSelectPropType) {
  return (
    <RadioGroup
      gap={16}
      flexDirection="row"
      value={userType}
      onValueChange={(v: string) => setValueToForm(form, "user_type", v)}
    >
      <UserTypeItem
        type="contractor"
        selected={userType === "contractor"}
      />
      <UserTypeItem
        type="musician"
        selected={userType === "musician"}
      />
    </RadioGroup>
  );
}
