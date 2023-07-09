import { IOption } from "./forms-data";

export interface IFormInput {
    id: number;
    name: string;
    type: string;
    placeholder?: string | undefined;
    label: string;
    value?: any;
    max?: number | undefined;
    min?: number | undefined;
    onChange?: ((e: any) => void) | undefined;
    options?: IOption[];
  };