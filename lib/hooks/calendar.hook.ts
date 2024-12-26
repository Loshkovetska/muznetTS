import { useUser } from "@/components/providers/user-provider";
import { QUERY_TAGS } from "@/lib/constants";
import AdService from "@/lib/services/ad";
import { getClearDate } from "@/lib/utils/date-picker";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export default function useCalendar() {
  const { user, isMusician } = useUser();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const { data = [] } = useQuery({
    queryKey: [QUERY_TAGS.CALENDAR],
    queryFn: () =>
      AdService.getAdsByParam({
        user_id: !isMusician ? user?.id : undefined,
        performer_id: isMusician ? user?.id : undefined,
      }),
  });

  const markedDates = useMemo(
    () => data?.map((d) => getClearDate(d.start_date)),
    [data]
  );

  const ads = useMemo(() => {
    if (!selectedDate) return data;

    return data?.filter(
      (d) =>
        getClearDate(d.start_date).toISOString() ===
        getClearDate(selectedDate).toISOString()
    );
  }, [selectedDate]);

  return { ads, markedDates, selectedDate, setSelectedDate };
}
