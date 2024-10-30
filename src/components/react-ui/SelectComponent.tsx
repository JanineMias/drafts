// IMPORTING UI-KIT FROM SHADCN
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
 
interface SelectScrollableProps {
  onValueChange: (value: string) => void; // Prop to handle value change
}

const SelectScrollable: React.FC<SelectScrollableProps> = ({onValueChange}) => {
  return (
    <Select onValueChange={onValueChange}>
    <SelectTrigger className="focus:border-transparent transition-shadow duration-300 ease-in-out w-32 ml-auto">
      <SelectValue placeholder="Buyer" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="buyer">Buyer</SelectItem>
      <SelectItem value="seller">Seller</SelectItem>
    </SelectContent>
  </Select>
  )
}

export default SelectScrollable;