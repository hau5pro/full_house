import { visit } from "unist-util-visit";
import { replaceFractions } from "../infrastructure/fractions.ts";

export function remarkFractions() {
  return (tree: any) => {
    visit(tree, "text", (node: any) => {
      node.value = replaceFractions(node.value);
    });
  };
}
