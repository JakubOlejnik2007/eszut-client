import { TChangeEmailNames, TChangePasswordNames, TLoginFormNames, TReportFormNames } from "./form-inputs-names";
import { IOption } from "./forms-data";

export interface IFormInput<T extends TReportFormNames | TLoginFormNames | TChangePasswordNames | TChangeEmailNames> {
    id: number;
    name: T;
    type: string;
    placeholder?: string | undefined;
    label: string;
    value?: any;
    max?: number | undefined;
    min?: number | undefined;
    onChange?: ((e: any) => void) | undefined;
    options?: IOption[];
  };