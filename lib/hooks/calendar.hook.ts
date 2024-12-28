import { useUser } from "@/components/providers/user-provider";
import { QUERY_TAGS } from "@/lib/constants";
import DealService from "@/lib/services/deal";
import { getClearDate } from "@/lib/utils/date-picker";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export default function useCalendar() {
  const { user, isMusician } = useUser();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const { data = [] } = useQuery({
    queryKey: [QUERY_TAGS.CALENDAR],
    queryFn: () =>
      DealService.getDealsByParams(
        !isMusician ? user?.id : undefined,
        isMusician ? user?.id : undefined
      ),
    enabled: !!user?.id,
  });

  const markedDates = useMemo(
    () => data?.map((d) => getClearDate(d.ad.start_date)),
    [data]
  );

  const ads = useMemo(() => {
    if (!selectedDate) return data;

    return data?.filter(
      (d) =>
        getClearDate(d.ad.start_date).toISOString() ===
        getClearDate(selectedDate).toISOString()
    );
  }, [selectedDate]);

  return { ads, markedDates, selectedDate, setSelectedDate };
}
