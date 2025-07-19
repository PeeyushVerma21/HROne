import React from "react";
import { Button } from "antd";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import FieldRow from "./FieldRow";

export default function FieldList({ nestIndex }) {
  const { control, watch } = useFormContext();
  const name = nestIndex === "" ? "fields" : `${nestIndex}.fields`;
  const { fields, append, remove, update } = useFieldArray({ control, name });
  const values = watch(name) || [];

  return (
    <div style={{ marginLeft: nestIndex ? 24 : 0 }}>
      {fields.map((item, idx) => (
        <div key={item.id || idx} style={{ marginBottom: 12 }}>
          <FieldRow
            nestIndex={nestIndex}
            idx={idx}
            field={item}
            remove={() => remove(idx)}
            update={update}
            fieldsArrayName={name}
          />
          {values[idx]?.type === "Nested" && (
            <div style={{
              borderLeft: "1px solid #eee",
              marginLeft: 16,
              paddingLeft: 8,
              marginTop: 4,
              marginBottom: 4
            }}>
              <FieldList nestIndex={`${name}.${idx}`} />
            </div>
          )}
        </div>
      ))}
      <Button
        type="dashed"
        onClick={() => append({ name: "" })}
        style={{ width: "70%", backgroundColor: "blue", color: "white"}}
      >+ Add field</Button>
    </div>
  );
}
