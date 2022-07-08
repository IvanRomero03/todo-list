import { BadgeProps } from "@chakra-ui/react";
type PriorityItem = {
  priority: string;
  priorityColor: BadgeProps["colorScheme"];
};

export const defaultPriorityArray = (): PriorityItem[] => [
  { priority: "Low", priorityColor: "green" },
  { priority: "Medium", priorityColor: "yellow" },
  { priority: "High", priorityColor: "red" },
];

export const defaultFullPriorityArray = (): PriorityItem[] => [
  { priority: "Very Low", priorityColor: "purple" },
  { priority: "Low", priorityColor: "teal" },
  { priority: "Low-Medium", priorityColor: "green" },
  { priority: "Medium", priorityColor: "yellow" },
  { priority: "Medium-High", priorityColor: "orange" },
  { priority: "High", priorityColor: "red" },
  { priority: "Very High", priorityColor: "pink" },
];

export const typesColorSchemes = [
  "whiteAlpha",
  "blackAlpha",
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
  "linkedin",
  "facebook",
  "messenger",
  "whatsapp",
  "twitter",
  "telegram",
];
export default PriorityItem;
