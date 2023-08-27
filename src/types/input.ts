import TFormNames from "./form-inputs-names";
import { IOption } from "./forms-data";


export interface IFormInputControl<T extends TFormNames> {
    id: number;
    name: T;
    type: string;
    placeholder?: string | undefined;
    label: string;
    value?: any;
    max?: number | undefined;
    min?: number | undefined;

    options?: IOption[];
  };

  export interface IFormInputComponentProps<T extends TFormNames> extends IFormInputControl<T> {
    onChange: ((e: any) => void);
  }