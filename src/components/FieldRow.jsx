import React from "react";
import { Input, Select, Space, Button } from "antd";
import { useFormContext, Controller } from "react-hook-form";

const fieldTypes = [
  { label: "Nested", value: "Nested" },
  { label: "String", value: "String" },
  { label: "Number", value: "Number" },
  { label: "Float", value: "Float" }
];

export default function FieldRow({ nestIndex, idx, remove, update, fieldsArrayName }) {
  const { control, getValues } = useFormContext();
  const fieldName = nestIndex === "" ? `fields.${idx}` : `${nestIndex}.fields.${idx}`;

  return (
    <Space>
      <Controller
        control={control}
        name={`${fieldName}.name`}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Field name"
            style={{ width: 140 }}
          />
        )}
      />
      <Controller
        control={control}
        name={`${fieldName}.type`}
        render={({ field }) => (
          <Select
            {...field}
            allowClear
            placeholder="Field type"
            style={{ width: 100 }}
            options={fieldTypes}
            onChange={val => {
              field.onChange(val);
              const valueObj = getValues(fieldName);
              if (val === "Nested" && !Array.isArray(valueObj.fields)) {
                update(idx, { ...valueObj, type: val, fields: [] });
              }
              if (val !== "Nested" && valueObj?.fields) {
                const { fields, ...rest } = valueObj;
                update(idx, { ...rest, type: val });
              }
            }}
          />
        )}
      />
      <Button danger onClick={remove}>Delete</Button>
    </Space>
  );
}
