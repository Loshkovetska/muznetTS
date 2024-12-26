import { MessageItemType } from "@/lib/types";
import { getClearDate } from "@/lib/utils/date-picker";

export const generateMessagesList = (messages: MessageItemType[]) => {
  const res: { title: string; data: MessageItemType[] }[] = [];
  const dates = new Set(
    messages.map((msg) => getClearDate(msg.created_at).format("DD MMM YYYY"))
  );

  Array.from(dates).forEach((date) => {
    const list = messages.filter(
      (msg) => getClearDate(msg.created_at).format("DD MMM YYYY") === date
    );

    const obj = {
      title: date,
      data: list,
    };

    res.push(obj);
  });

  return res;
};
