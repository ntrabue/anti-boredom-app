import { v4 as uuidv4 } from "uuid";
import { IItem, itemType } from "../redux/events/types";
import { getIconForType } from "./getIconForType";

interface buildItem {
  name: string;
  type: itemType;
  minAge?: number;
  maxAge?: number;
}

export function buildItem({
  name,
  type,
  minAge = 0,
  maxAge = 0,
}: buildItem): IItem {
  return {
    id: uuidv4(),
    name,
    minAge,
    maxAge,
    type,
    icon: getIconForType(type),
    enabled: true,
  };
}
