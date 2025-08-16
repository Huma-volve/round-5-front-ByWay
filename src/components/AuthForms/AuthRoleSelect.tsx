import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AuthRoleSelect({ value, onChange }: any) {
  return (
    <Select
      value={value}
      onValueChange={(val) => {
        onChange({ target: { name: "role", value: val } }) // mimic Formik event
      }}
    >
      <SelectTrigger className="lg:w-[180px]">
        <SelectValue placeholder="Select a Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Role</SelectLabel>
          <SelectItem value="learner">Learner</SelectItem>
          <SelectItem value="instructor">Instructor</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

