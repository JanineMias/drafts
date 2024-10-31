import type { FC, ReactNode, ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react';
import { Label } from "@/components/ui/label";

interface Props {
  label: string;
  icon?: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
  } & RefAttributes<SVGSVGElement>>;
  children?: ReactNode; // TO ACCEPT CHILDREN
}

const MyComponent: FC<Props> = ({ label, icon: Icon, children }) => {
  return (
  <div className="space-y-2"> 
    <div className="flex items-center gap-x-1">
      {Icon && <Icon className="size-4 max-sm:size-5 text-gray-600"/>} 
      <Label>{label}</Label>
    </div>
      {children} {/* Render children here */}
  </div>
  );
};

export default MyComponent;