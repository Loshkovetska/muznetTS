import { createAnimations } from "@tamagui/animations-react-native";
import { config as configBase } from "@tamagui/config/v3";
import { createMedia } from "@tamagui/react-native-media-driver";
import { shorthands } from "@tamagui/shorthands";
import { createTamagui } from "tamagui";

const animations = createAnimations({
  bouncy: {
    type: "spring",
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: "spring",
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: "spring",
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
});

export const colors = {
  "light-gray": "#f0f0f0",
  "back-gray": "#F2F3F9",
  gray: "#B9B9BA",
  "cyan-gray": "#697A8D",
  "s-black": "#636364",
  black: "#0C0C0E",
  "input-cursor": "#B9B9BA",
  white: "#FEFEFE",
  "lighter-white": "#ffffff4c",
  "light-white": "#00000088",
  error: "#F43B3B",
  success: "#3AC946",
  disabled: "#5C6574",
  blue: "#1877F2",
  "default-gray": "#c4c4c4",
  "light-error": "rgba(244,59,59,0.05)",
  "gray-20": "rgba(185,185,186,0.2)",
  "dark-gray": "#8E8E93",
  "search-gray": "#f3f3f3",
};

export const typography = {
  "heading-10": {
    fontSize: 10,
    fontFamily: "MulishBold",
    lineHeight: 13,
  },
  "heading-14": {
    fontSize: 14,
    fontFamily: "MulishBold",
    lineHeight: 20,
  },
  "heading-15": {
    fontSize: 15,
    fontFamily: "MulishBold",
    lineHeight: 19,
  },
  "heading-16": {
    fontSize: 16,
    fontFamily: "MulishBold",
    lineHeight: 20,
  },
  "heading-17": {
    fontSize: 17,
    fontFamily: "MulishBold",
    lineHeight: 21,
  },
  "heading-18": {
    fontSize: 18,
    fontFamily: "MulishBold",
    lineHeight: 23,
  },
  "heading-20": {
    fontSize: 20,
    fontFamily: "MulishBold",
    lineHeight: 25,
  },
  "heading-24": {
    fontSize: 24,
    fontFamily: "MulishBold",
    lineHeight: 30,
  },
  "heading-28": {
    fontSize: 28,
    fontFamily: "MulishBold",
    lineHeight: 35,
  },
  "heading-ext28": {
    fontSize: 28,
    fontFamily: "MulishExtraBold",
    lineHeight: 35,
  },
  "paragraph-12": {
    fontSize: 12,
    fontFamily: "MulishRegular",
    lineHeight: 16,
  },
  "paragraph-14": {
    fontSize: 14,
    fontFamily: "MulishRegular",
    lineHeight: 18,
  },
  "paragraph-15": {
    fontSize: 15,
    fontFamily: "MulishRegular",
    lineHeight: 19,
  },
  "paragraph-17": {
    fontSize: 17,
    fontFamily: "MulishRegular",
    lineHeight: 22,
  },
  "paragraph-18": {
    fontSize: 18,
    fontFamily: "MulishRegular",
    lineHeight: 23,
  },
  "paragraph-20": {
    fontSize: 20,
    fontFamily: "MulishRegular",
    lineHeight: 25,
  },
  "label-12": {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "MulishMedium",
  },
  "label-13": {
    fontSize: 13,
    lineHeight: 16,
    fontFamily: "MulishMedium",
  },
  "label-14": {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "MulishMedium",
  },
  "label-15": {
    fontSize: 15,
    lineHeight: 19,
    fontFamily: "MulishMedium",
  },
  "label-16": {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "MulishMedium",
  },
  "label-17": {
    fontSize: 17,
    lineHeight: 23,
    fontFamily: "MulishMedium",
  },
  "label-20": {
    fontSize: 20,
    fontFamily: "MulishBold",
    lineHeight: 25,
  },
};

const tamaguiConfig = createTamagui({
  ...configBase,
  animations,
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  shorthands,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: "none" },
    pointerCoarse: { pointer: "coarse" },
  }),
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
