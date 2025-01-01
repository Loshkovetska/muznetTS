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
  fast: {
    type: "spring",
    damping: 10,
    mass: 0.5,
    stiffness: 100,
  },
  medium: {
    type: "timing",
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
});

export const colors = {
  success: "#3AC946",
  "light-success": "#DEF9E9",
  warning: "#FEC132",
  error: "#F43B3B",
  "light-error": "rgba(244,59,59,0.05)",
  "light-error2": "#FCF1EF",
  info: "#22B0FC",
  main: "#FEFEFE",
  secondary: "#141517",
  third: "#333333",
  black: "#0C0C0E",
  "default-gray": "#c4c4c4",
  "dark-gray": "#8E8E93",
  "light-gray": "#f0f0f0",
  "search-gray": "#f3f3f3",
  "gray-10": "rgba(92, 101, 116, 0.1)",
  "gray-20": "rgba(92, 101, 116, 0.2)",
  "gray-40": "rgba(92, 101, 116, 0.4)",
  "gray-60": "rgba(92, 101, 116, 0.6)",
  "gray-80": "rgba(92, 101, 116, 0.8)",
  "gray-100": "#5C6574",
  "dim-gray": "#717171",
  "slate-gray": "#697A8D",
  "light-p-gray": "rgba(60,60,67,0.3)",
  "ghost-white": "#F2F3F9",
  "ghost-white2": "#F5F6FB",
  "dodger-blue": "#1E66FF",
  comet: "#636364",
  "black-ru": "#17191D",
  ghost: "#B9B9BA",
  "ghost-20": "rgba(185, 185, 186, 0.2)",
  "ghost-30": "rgba(185, 185, 186, 0.3)",
  solitude: "#E9ECF2",
  "white-smoke": "#F5F5F5",
  gainsboro: "#E0E0E0",
  whisper: "#EEEEEE",
  "gainsboro-dark": "#D9D9D9",
  "total-black": "#000000",
  nero: "#232323",
  "white-20": "rgba(256,256,256,0.2)",
  "white-30": "rgba(256,256,256,0.3)",
  "white-50": "rgba(256,256,256,0.5)",
  "black-6": "rgba(256,256,256,0.06)",
  "black-10": "rgba(256,256,256,0.1)",
  "black-30": "rgba(0,0,0,0.3)",
  "black-50": "rgba(0,0,0,0.5)",
  "main-20": "rgba(254,254,254,0.2)",
  "main-70": "rgba(254,254,254,0.7)",
  fb: "#1877F2",
};

export const typography = {
  "black-28": {
    fontSize: 28,
    fontFamily: "MulishBlack",
    lineHeight: 35,
  },
  "extrabold-20": {
    fontSize: 20,
    fontFamily: "MulishExtraBold",
    lineHeight: 25,
  },
  "extrabold-28": {
    fontSize: 28,
    fontFamily: "MulishExtraBold",
    lineHeight: 35,
  },
  "bold-10": {
    fontSize: 10,
    fontFamily: "MulishBold",
    lineHeight: 13,
  },
  "bold-12": {
    fontSize: 12,
    fontFamily: "MulishBold",
    lineHeight: 16,
  },
  "bold-14": {
    fontSize: 14,
    fontFamily: "MulishBold",
    lineHeight: 20,
  },
  "bold-15": {
    fontSize: 15,
    fontFamily: "MulishBold",
    lineHeight: 19,
  },
  "bold-16": {
    fontSize: 16,
    fontFamily: "MulishBold",
    lineHeight: 20,
  },
  "bold-17": {
    fontSize: 17,
    fontFamily: "MulishBold",
    lineHeight: 21,
  },
  "bold-18": {
    fontSize: 18,
    fontFamily: "MulishBold",
    lineHeight: 23,
  },
  "bold-20": {
    fontSize: 20,
    fontFamily: "MulishBold",
    lineHeight: 25,
  },
  "bold-22": {
    fontSize: 22,
    fontFamily: "MulishBold",
    lineHeight: 27,
  },
  "bold-24": {
    fontSize: 24,
    fontFamily: "MulishBold",
    lineHeight: 30,
  },
  "bold-28": {
    fontSize: 28,
    fontFamily: "MulishBold",
    lineHeight: 35,
  },
  "bold-34": {
    fontSize: 34,
    lineHeight: 41,
    fontFamily: "MulishBold",
  },
  "semi-12": {
    fontSize: 12,
    fontFamily: "MulishSemiBold",
    lineHeight: 16,
  },
  "semi-16": {
    fontSize: 16,
    fontFamily: "MulishSemiBold",
    lineHeight: 20,
  },
  "reg-10": {
    fontSize: 10,
    fontFamily: "MulishRegular",
    lineHeight: 14,
  },
  "reg-12": {
    fontSize: 12,
    fontFamily: "MulishRegular",
    lineHeight: 16,
  },
  "reg-13": {
    fontSize: 13,
    fontFamily: "MulishRegular",
    lineHeight: 17,
  },
  "reg-14": {
    fontSize: 14,
    fontFamily: "MulishRegular",
    lineHeight: 18,
  },
  "reg-15": {
    fontSize: 15,
    fontFamily: "MulishRegular",
    lineHeight: 19,
  },
  "reg-16": {
    fontSize: 16,
    fontFamily: "MulishRegular",
    lineHeight: 24,
  },
  "reg-17": {
    fontSize: 17,
    fontFamily: "MulishRegular",
    lineHeight: 22,
  },
  "medium-10": {
    fontSize: 10,
    lineHeight: 12,
    fontFamily: "MulishMedium",
  },
  "medium-12": {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "MulishMedium",
  },
  "medium-13": {
    fontSize: 13,
    lineHeight: 16,
    fontFamily: "MulishMedium",
  },
  "medium-14": {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "MulishMedium",
  },
  "medium-15": {
    fontSize: 15,
    lineHeight: 19,
    fontFamily: "MulishMedium",
  },
  "medium-16": {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "MulishMedium",
  },
  "medium-17": {
    fontSize: 17,
    lineHeight: 23,
    fontFamily: "MulishMedium",
  },
  "medium-20": {
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
