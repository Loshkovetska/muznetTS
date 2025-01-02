import { toggleToast } from "@/lib/utils/toast";
import { useCallback } from "react";
import { Share } from "react-native";

export function useShare(enabled: boolean = true, url: string, title: string) {
  const onShare = useCallback(async () => {
    if (!enabled) {
      toggleToast("You don't have permissions to share", "error");
    }
    await Share.share({
      message: title,
    });
  }, [enabled, title, url]);

  return { onShare };
}
