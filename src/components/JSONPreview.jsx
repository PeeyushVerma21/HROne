import React from "react";
import { useFormContext } from "react-hook-form";

function buildPreview(fields) {
  const obj = {};
  (Array.isArray(fields) ? fields : []).forEach(field => {
    if (!field?.name) return;
    if (!field?.type) obj[field.name] = "";
    else if (field.type === "String") obj[field.name] = "STRING";
    else if (field.type === "Number") obj[field.name] = "NUMBER";
    else if (field.type === "Float") obj[field.name] = "FLOAT";
    else if (field.type === "Nested") obj[field.name] = buildPreview(field.fields || []);
  });
  return obj;
}

export default function JSONPreviewRHF() {
  const { watch } = useFormContext();
  const fields = watch("fields") || [];

  return (
    <pre
      style={{
        background: "#f6f6f6",
        padding: 16,
        borderRadius: 8,
        minHeight: 200,
        maxHeight: 600,
        overflow: "auto",
        fontSize: 16
      }}
    >
      {JSON.stringify(buildPreview(fields), null, 2)}
    </pre>
  );
}
