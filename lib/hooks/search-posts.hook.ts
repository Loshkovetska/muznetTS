import { QUERY_TAGS } from "@/lib/constants";
import { PostService } from "@/lib/services";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function useSearchPosts(enabled: boolean = false) {
  const { data: postsTags = [] } = useQuery({
    queryKey: [QUERY_TAGS.POST, "search-tags"],
    queryFn: () => PostService.getPostTags(),
    enabled,
  });

  const { data: postsLocations = [] } = useQuery({
    queryKey: [QUERY_TAGS.POST, "search-locations"],
    queryFn: () => PostService.getPostLocations(),
    enabled,
  });

  const { data: recentData = [] } = useQuery({
    queryKey: [QUERY_TAGS.POST, "search-recent"],
    queryFn: () => PostService.savedSearch(),
    enabled,
  });

  const topTags = useMemo(
    () => postsTags?.sort((a, b) => b.count - a.count) || [],
    [postsTags]
  );

  return { postsTags, postsLocations, recentData, topTags };
}
