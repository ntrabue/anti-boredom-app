import { buildItem } from "../utils/buildItem";
import { IItem } from "../redux/events/types";

export const defaultItems: IItem[] = [
  buildItem({ name: "Time to clean your room!", type: "clean" }),
  buildItem({
    name:
      "You have one hour to make a minecraft castle. Get it graded by an adult",
    type: "fun",
    minAge: 5,
    maxAge: 18,
  }),
  buildItem({
    name: "Challenge someone to a dance-off. They pick the song",
    type: "fun",
  }),
  buildItem({
    name: "Ask an adult if they need help cleaning anything",
    type: "clean",
    maxAge: 18,
  }),
  buildItem({
    name: "Give a report on your favorite youtuber and share with an adult",
    type: "learning",
    maxAge: 18,
  }),
  buildItem({
    name: "Read a book of your choice for 30 minutes",
    type: "learning",
  }),
];
