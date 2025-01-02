import { FormElement } from "@/components/ui/form";
import dayjs from "dayjs";
import { UseFormReturn, useWatch } from "react-hook-form";
import { Stack, XStack } from "tamagui";

export default function DateTimePicker({ form }: { form: UseFormReturn<any> }) {
  const basicDate = useWatch({ control: form.control, name: "basic_date" });

  return (
    <>
      <Stack position="relative">
        <FormElement
          placeholder="Enter ad date"
          name="basic_date"
          inputType="date"
        />
      </Stack>
      <XStack
        width="100%"
        gap={8}
      >
        <FormElement
          name="start_date"
          inputType="time"
          placeholder="Start time"
          disabled={!dayjs(basicDate).isValid()}
        />
        <FormElement
          name="end_date"
          placeholder="End time"
          inputType="time"
          disabled={!dayjs(basicDate).isValid()}
        />
      </XStack>
    </>
  );
}
