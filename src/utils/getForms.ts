import { ActionBlueprintGraph, CustomNode, Form } from "../types/resTypes";
import { FormGroup } from "@/types/resTypes";

export function fetchForm(
  nodes: CustomNode[],
  ids: string[],
  forms: Form[]
): Record<string, FormGroup> {
  const parentNodes = nodes.filter((node) => ids.includes(node.id));
  const parentForms: Record<string, FormGroup> = {};

  for (let i = 0; i < parentNodes.length; i++) {
    const {
      id,
      data: { component_id, name },
    } = parentNodes[i];

    if (!parentForms[name]) {
      parentForms[name] = {
        nodes: [],
        forms: forms.filter((form) => form.id === component_id),
      };
    }

    parentForms[name].nodes.push(parentNodes[i]);
  }

  return parentForms;
}
