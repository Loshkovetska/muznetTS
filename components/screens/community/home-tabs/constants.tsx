import PostsList from "@/components/screens/community/posts-list";
import PostsTape from "@/components/screens/community/posts-tape";

const HOME_TABS = [
  {
    title: "All Posts",
    value: "all",
    content: <PostsTape />,
  },
  {
    title: "My Posts",
    value: "my-posts",
    content: <PostsList type="my-posts" />,
  },
  {
    title: "My Likes",
    value: "my-likes",
    content: <PostsList type="my-likes" />,
  },
];

export { HOME_TABS };
