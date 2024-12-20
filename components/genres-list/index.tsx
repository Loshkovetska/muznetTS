import { colors, typography } from "@/tamagui.config";
import { Text, XStack, styled } from "tamagui";

const ItemInfoGenres = styled(XStack, {
  width: "100%",
  flexWrap: "wrap",
  overflow: "hidden",
});

const ItemInfoGenre = styled(XStack, {
  borderColor: colors["black"],
  borderWidth: 1,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
  variants: {
    type: {
      list: { paddingHorizontal: 8, paddingBottom: 3 },
      card: { paddingVertical: 6, paddingHorizontal: 16 },
    },
  },
  defaultVariants: {
    type: "list",
  },
});

export default function GenresList({
  genres,
  type = "list",
}: {
  genres: string[];
  type?: "card" | "list";
}) {
  return (
    <ItemInfoGenres
      gap={type === "list" ? 8 : 4}
      maxHeight={type === "list" ? 33 : undefined}
    >
      {genres.map((genre: string) => (
        <ItemInfoGenre
          key={genre}
          type={type}
        >
          <Text
            {...typography["paragraph-12"]}
            fontSize={type === "list" ? 10 : undefined}
          >
            {genre.toLowerCase()}
          </Text>
        </ItemInfoGenre>
      ))}
    </ItemInfoGenres>
  );
}
