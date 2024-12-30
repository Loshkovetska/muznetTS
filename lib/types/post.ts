import { UserType } from "@/lib/types/user";

type PostType = {
  id: string;
  user: UserType;
  media: string[];
  title: string;
  description: string;
  tags: string[];
  comment_on: boolean;
  share_on: boolean;
  location: string;
  created_at: string;
  info: {
    likes: number;
    comments: number;
  };
  hidden?: boolean;
};

type HideParamType = {
  user_id: string;
  post_id: string;
};

type TogglePostSettingsType = {
  post_id: string;
  toggle_name: string;
  value: boolean;
};

type SearchPostItemType = {
  name: string;
  count: number;
  type: "tag" | "place";
};

export type {
  HideParamType,
  PostType,
  SearchPostItemType,
  TogglePostSettingsType,
};
