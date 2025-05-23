"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ActionBlueprintGraph,
  CustomNode,
  Form,
  FormGroup,
} from "../../../types/resTypes";
import { IoCloseOutline } from "react-icons/io5";
import { fetchForm } from "@/utils/getForms";
import Tree from "../dataTree/Tree";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Props = {
  node: CustomNode;
  data: ActionBlueprintGraph;
};

const DEFAULT_VALUES = [
  "dynamic_checkbox_group",
  "dynamic_object",
  "dynamic-tracked_Input",
];

const PrefillContent = ({ node, data }: Props) => {
  const [checkBoxGroup, setCheckBoxGroup] = useState("dynamic_checkbox_group");
  const [dynamicObject, setDynamicObject] = useState("dynamic_object");
  const [trackedInput, setTrackedInput] = useState("dynamic-tracked_Input");
  const [isOpen, setIsOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const defaultValueStyle =
    "font-medium border-dashed border-2 p-3 rounded-sm w-full";
  const changedValueStyle =
    "font-medium border-solid border-2 p-3 rounded-full w-full";
  const parentForms = node.data.prerequisites;

  const pairedForm = useMemo(() => {
    return Object.entries(fetchForm(data.nodes, parentForms, data.forms));
  }, [data.nodes, parentForms, data.forms]);

  useEffect(() => {
    if (pairedForm) {
      pairedForm.forEach(([_, formGroup]) => {
        formGroup.forms.forEach((form) => {
          if (
            form.field_schema?.required &&
            form.field_schema.required.length > 0
          ) {
            setTrackedInput(
              form.field_schema.required.sort((a, b) => a.localeCompare(b))[0]
            );
          }
        });
      });
    }
  }, []);

  return (
    <Sheet>
      <div className="flex flex-col gap-2">
        {DEFAULT_VALUES.includes(checkBoxGroup) && (
          <SheetTrigger
            className={`${defaultValueStyle} flex justify-between`}
            onClick={() => {
              setActiveForm("checkBoxGroup");
            }}
          >
            <p>{checkBoxGroup}</p>
          </SheetTrigger>
        )}
        {!DEFAULT_VALUES.includes(checkBoxGroup) && (
          <div className={`${changedValueStyle} flex justify-between`}>
            <p>{checkBoxGroup}</p>
            <button onClick={() => setCheckBoxGroup("dynamic_checkbox_group")}>
              <IoCloseOutline />
            </button>
          </div>
        )}

        {DEFAULT_VALUES.includes(dynamicObject) && (
          <SheetTrigger
            className={`${defaultValueStyle} flex justify-between`}
            onClick={() => {
              setActiveForm("dynamicObject");
            }}
          >
            <p>{dynamicObject}</p>
          </SheetTrigger>
        )}
        {!DEFAULT_VALUES.includes(dynamicObject) && (
          <div className={`${changedValueStyle} flex justify-between`}>
            <p>{dynamicObject}</p>
            <button onClick={() => setCheckBoxGroup("dynamic_object")}>
              <IoCloseOutline />
            </button>
          </div>
        )}

        {DEFAULT_VALUES.includes(trackedInput) && (
          <SheetTrigger
            className={`${defaultValueStyle} flex justify-between`}
            onClick={() => {
              setActiveForm("trackedInput");
            }}
          >
            <p>{trackedInput}</p>
          </SheetTrigger>
        )}
        {!DEFAULT_VALUES.includes(trackedInput) && (
          <div className={`${changedValueStyle} flex justify-between`}>
            <p>{trackedInput}</p>
            <button onClick={() => setCheckBoxGroup("dynamic-tracked_Input")}>
              <IoCloseOutline />
            </button>
          </div>
        )}
      </div>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Select data element to map</SheetTitle>
          <SheetDescription>Tree</SheetDescription>
        </SheetHeader>
        {activeForm === "checkBoxGroup" && (
          <Tree
            pairedForm={pairedForm}
            setCheckBoxGroup={setCheckBoxGroup}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
        )}
        {activeForm === "dynamicObject" && (
          <Tree
            pairedForm={pairedForm}
            setDynamicObject={setDynamicObject}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
        )}
        {activeForm === "trackedInput" && (
          <Tree
            pairedForm={pairedForm}
            setTrackedInput={setTrackedInput}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default PrefillContent;
