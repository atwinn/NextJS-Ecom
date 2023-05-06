import * as React from "react";
export default function GuaranteeFormStep2({ result }: any) {
  return (
    <div>
      {result ? (
        <h1 className="select-none text-green-500">{result}!</h1>
      ) : (
        null
      )}
    </div>
  );
}
