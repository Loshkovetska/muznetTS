import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const QUERY_TAGS = {
  MUSICIAN: "MUSICIAN",
  CONTRACTOR_ADS: "CONTRACTOR_ADS",
  REVIEWS: "REVIEWS",
  USER: "USER",
  AD: "AD",
  CALENDAR: "CALENDAR",
  CHATS: "CHATS",
  MESSAGES: "MESSAGES",
};

export { QUERY_TAGS, SCREEN_HEIGHT, SCREEN_WIDTH };
