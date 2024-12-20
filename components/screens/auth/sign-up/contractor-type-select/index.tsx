import { CONTRACTOR_POSITIONS } from "@/components/screens/auth/sign-up/contractor-type-select/constants";
import Select from "@/components/ui/select";

type ContractorTypeSelectPropType = {
  position: string;
};

export default function ContractorTypeSelect({
  position,
}: ContractorTypeSelectPropType) {
  return (
    <Select
      name="position"
      value={position}
      placeholder="Choose your position"
      options={CONTRACTOR_POSITIONS}
    />
  );
}
