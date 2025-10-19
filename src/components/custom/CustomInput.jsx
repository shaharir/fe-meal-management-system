import { Controller } from "react-hook-form";

const CustomInput = ({
  control,
  name,
  label,
  type = "text",
  options = [],
  error,
}) => {
  return (
    <div className="form-control w-full">
      {type !== "checkbox" && label && (
        <label className="label">
          <span className="label-text font-medium">{label}</span>
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const baseClasses = "input input-bordered w-full";
          const errorClasses = error ? "input-error" : "";
          const finalClasses = `${baseClasses} ${errorClasses}`;

          if (type === "text" || type === "number") {
            return (
              <>
                <input
                  {...field}
                  type={type}
                  className={finalClasses}
                  placeholder={`Enter ${label || name}`}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </>
            );
          }
          if (type === "date") {
            return (
              <>
                <label className="label cursor-pointer justify-start gap-3">
                  {/* <span className="label-text">{label}</span> */}
                  <input
                    type="date"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </>
            );
          }

          if (type === "select") {
            return (
              <>
                <select
                  {...field}
                  className={`${baseClasses} ${error ? "select-error" : ""}`}
                >
                  <option value="">Select {label || name}</option>
                  {options.map((opt, i) => (
                    <option key={i} value={opt.value || opt}>
                      {opt.label || opt}
                    </option>
                  ))}
                </select>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </>
            );
          }

          if (type === "checkbox") {
            return (
              <>
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    checked={field.value || false}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="checkbox checkbox-neutral"
                  />
                  <span className="label-text">{label || name}</span>
                </label>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </>
            );
          }

          return (
            <>
              <input
                {...field}
                type="text"
                className={finalClasses}
                placeholder={`Enter ${label || name}`}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </>
          );
        }}
      />
    </div>
  );
};

export default CustomInput;
