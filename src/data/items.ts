import { v4 as uuidv4 } from "uuid";
import { itemType, IItem } from "../types";

interface buildItem {
  name: string;
  type: itemType;
  minAge?: number;
}

function getIconForType(type: itemType): string {
  switch (type) {
    default:
      return "😕";
    case "clean":
      return "🧹";
    case "fun":
      return "😀";
    case "learning":
      return "🙋‍♀️";
    case "punishment":
      return "😞";
  }
}
export function buildItem({ name, type, minAge = 0 }: buildItem): IItem {
  return {
    id: uuidv4(),
    name,
    minAge,
    type,
    icon: getIconForType(type),
    enabled: true,
  };
}
export const defaultItems: IItem[] = [
  buildItem({ name: "Time to clean your room!", type: "clean" }),
  buildItem({
    name:
      "You have one hour to make a minecraft castle. Get it graded by an adult",
    type: "fun",
  }),
  buildItem({
    name: "Challenge someone to a dance-off. They pick the song",
    type: "fun",
  }),
  buildItem({
    name: "Ask an adult if they need help cleaning anything",
    type: "clean",
  }),
  buildItem({
    name: "Give a report on your favorite youtuber and share with an adult",
    type: "learning",
  }),
  buildItem({
    name: "Read a book of your choice for 30 minutes",
    type: "learning",
  }),
];
