import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type Option = {
  label: string;
  value: string;
};

type FormSelectProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  placeholder?: string;
  options: Option[];
  className?: string;
};

export function Dropdown<T extends FieldValues>({
  name,
  control,
  placeholder = "Select",
  options,
  className,
}: FormSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          key={field.value}
          value={field.value ?? ""}
          onValueChange={field?.onChange}
        >
          <SelectTrigger className={className}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {options.map((option) => (
                <SelectItem key={option?.value} value={option?.value}>
                  {option?.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
}
