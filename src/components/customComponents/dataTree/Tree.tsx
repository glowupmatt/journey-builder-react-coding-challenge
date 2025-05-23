import React, { Dispatch, SetStateAction } from "react";
import { FormGroup } from "@/types/resTypes";
import { SheetClose } from "@/components/ui/sheet";

type CommonProps = {
  pairedForm: [string, FormGroup][];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

type CheckboxProps = CommonProps & {
  setCheckBoxGroup: Dispatch<SetStateAction<string>>;
};

type DynamicObjectProps = CommonProps & {
  setDynamicObject: Dispatch<SetStateAction<string>>;
};

type TrackedInputProps = CommonProps & {
  setTrackedInput: Dispatch<SetStateAction<string>>;
};

type Props = CheckboxProps | DynamicObjectProps | TrackedInputProps;

function Tree({ pairedForm, setIsOpen, isOpen, ...props }: Props) {
  console.log(isOpen);
  return (
    <div>
      {pairedForm.map(([key, formGroup]) => (
        <div key={key} className="p-2">
          <button
            className="flex justify-between p-4 items-center w-full"
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            <h3 className="text-lg font-semibold">{key}</h3>
            {isOpen ? (
              <p className="text-blue-500 hover:underline">-</p>
            ) : (
              <p className="text-blue-500 hover:underline">+</p>
            )}
          </button>
          {isOpen && (
            <div className="flex flex-col gap-2">
              {formGroup.forms.flatMap((form) => {
                const properties = Object.entries(form.field_schema.properties);
                return properties.map(([key, value], index) => (
                  <div key={`${key}-${index}`}>
                    <SheetClose
                      asChild
                      className="flex items-center justify-between p-4 border rounded-md w-full"
                      onClick={() => {
                        if ("setCheckBoxGroup" in props) {
                          props.setCheckBoxGroup(key);
                        } else if ("setDynamicObject" in props) {
                          props.setDynamicObject(key);
                        } else if ("setTrackedInput" in props) {
                          props.setTrackedInput(key);
                        }
                        setIsOpen(false);
                      }}
                    >
                      <span>{key}</span>
                    </SheetClose>
                  </div>
                ));
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Tree;
