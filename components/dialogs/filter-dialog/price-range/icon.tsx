import { Rect, Svg } from "react-native-svg";

export default function PriceIcon() {
  return (
    <Svg
      width="100"
      height="39"
      viewBox="0 0 100 39"
      fill="none"
    >
      <Rect
        y="24"
        width="20"
        height="15"
        fill="#F3F3F3"
      />
      <Rect
        x="20"
        width="20"
        height="39"
        fill="#F3F3F3"
      />
      <Rect
        x="40"
        y="7"
        width="20"
        height="32"
        fill="#F3F3F3"
      />
      <Rect
        x="60"
        y="14"
        width="20"
        height="25"
        fill="#F3F3F3"
      />
      <Rect
        x="80"
        y="19"
        width="20"
        height="20"
        fill="#F3F3F3"
      />
    </Svg>
  );
}
