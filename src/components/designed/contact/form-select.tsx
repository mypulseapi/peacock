"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

/**
 * One contact-form select, so the page around it stays a server component.
 *
 * The form is server rendered and has exactly three dropdowns. Making the whole section a
 * client component to reach them would ship the entire contact page to the browser for the
 * sake of three controls; this ships the three controls.
 *
 * Radix renders a hidden native `<select>` for the `name`, so the form still submits an
 * ordinary field, and with JavaScript off the trigger is an inert button rather than a broken
 * one: the two optional fields simply go unanswered, which is what "optional" means.
 */
export function FormSelect({
  id,
  name,
  placeholder,
  options,
  defaultValue,
  required,
}: {
  id: string;
  name: string;
  /** Omitted when the field has a real default, which is what `required` wants. */
  placeholder?: string;
  options: readonly string[];
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <Select name={name} defaultValue={defaultValue} required={required}>
      {/* `id` goes on the trigger so the existing `<label htmlFor>` still points at it. */}
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
