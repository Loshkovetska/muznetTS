import { QUERY_TAGS } from "@/lib/constants";
import { PostService } from "@/lib/services";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function usePostsByFilter(params: { tag?: string; place?: string }) {
  const { data = [] } = useQuery({
    queryKey: [QUERY_TAGS.POST, params.tag, params.place],
    queryFn: () =>
      PostService.getPostsByFilter({
        tag: params.tag,
        place: params.place,
      }),
    enabled: !!params.tag || !!params.place,
  });

  const topData = useMemo(
    () => data?.sort((a, b) => b.info.likes - a.info.likes),
    [data]
  );

  const recentData = useMemo(
    () =>
      data?.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(b.created_at).getTime()
      ),
    [data]
  );

  const fullData = [topData, recentData];

  return { topData, recentData, fullData };
}
