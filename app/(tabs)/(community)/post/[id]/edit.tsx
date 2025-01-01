import AddEditPostContent from "@/components/screens/community/add-edit-post-content";
import { QUERY_TAGS } from "@/lib/constants";
import { PostService } from "@/lib/services";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
  const { id } = useLocalSearchParams();

  const { data } = useQuery({
    queryKey: [QUERY_TAGS.POST, id],
    queryFn: () => PostService.getPost(id as string),
  });

  if (!data) return null;

  return (
    <AddEditPostContent
      step={1}
      id={data?.id}
      defaultValues={{
        media: data.media,
        title: data.title || "",
        description: data.description,
        tags: data.tags,
        comment_on: data.comment_on,
        share_on: data.share_on,
        location: data.location,
      }}
    />
  );
}
