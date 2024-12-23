import DateTimePicker from "@/components/date-time-picker";
import SkillsList from "@/components/forms/skills-list";
import MediaSelect from "@/components/screens/profile/personal-tab/media-select";
import SearchWithSelect from "@/components/search-with-select";
import { FormElement } from "@/components/ui/form";
import { GENRES, INSTRUMENTS } from "@/lib/constants/lists";
import { UseFormReturn } from "react-hook-form";

export default function AdForm({ form }: { form: UseFormReturn<any> }) {
  return (
    <>
      <FormElement
        name="title"
        placeholder="Enter ad title"
      />
      <FormElement
        type="textarea"
        name="description"
        placeholder="Enter ad description"
      />
      <FormElement
        name="address"
        placeholder="Enter ad address"
      />
      <DateTimePicker form={form} />
      <FormElement
        name="price_per_hour"
        placeholder="Enter ad price in $"
      />
      <SearchWithSelect
        name="musical_instruments"
        form={form}
        placeholder="Search instruments"
        options={INSTRUMENTS}
        edit
      />
      <SearchWithSelect
        name="musical_genres"
        form={form}
        placeholder="Search music genres"
        options={GENRES}
        edit
      />
      <SkillsList />
      <MediaSelect form={form} />
    </>
  );
}
