import { itemType } from "../redux/events/types";

export function getIconForType(type: itemType): string {
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
