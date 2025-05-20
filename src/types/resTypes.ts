type Position = {
  x: number;
  y: number;
}

type SLADuration = {
  number: number;
  unit: string;
}

type NodeData = {
  id: string;
  component_key: string;
  component_type: string;
  component_id: string;
  name: string;
  prerequisites: string[];
  permitted_roles: string[];
  input_mapping: Record<string, any>;
  sla_duration: SLADuration;
  approval_required: boolean;
  approval_roles: string[];
}

type CustomNode = {
  id: string;
  type: string;
  position: Position;
  data: NodeData;
}

type Edge = {
  source: string;
  target: string;
}

type PayloadField = {
  type: string;
  value: string;
}

type DynamicFieldConfig = {
  selector_field: string;
  payload_fields: Record<string, PayloadField>;
  endpoint_id: string;
}

type Form = {
  id: string;
  name: string;
  description: string;
  is_reusable: boolean;
  field_schema: {
    type: string;
    properties: Record<string, any>;
    required: string[];
  };
  ui_schema: {
    type: string;
    elements: Array< {
      type: string;
      scope: string;
      label: string;
      options?: Record<string, any>;
    }>;
  };
  dynamic_field_config: Record<string, DynamicFieldConfig>;
}

export type ActionBlueprintGraph = {
  $schema: string;
  id: string;
  tenant_id: string;
  name: string;
  description: string;
  category: string;
  nodes: CustomNode[];
  edges: Edge[];
  forms: Form[];
  branches: any[];
  triggers: any[];
}