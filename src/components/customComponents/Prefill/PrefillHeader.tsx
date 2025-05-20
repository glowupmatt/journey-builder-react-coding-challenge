import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

type Props = {};

const PrefillHeader = (props: Props) => {
  return (
    <DialogHeader>
      <DialogTitle>Prefill</DialogTitle>
      <DialogDescription>Prefill fields for this form</DialogDescription>
    </DialogHeader>
  );
};

export default PrefillHeader;
