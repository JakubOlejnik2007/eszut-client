import { ICategory, IPlace, IOption } from "../types/forms-data";

const mapOptions = (arrayOfOptions: ICategory[] | IPlace[]): IOption[] => {
    return arrayOfOptions.map((item: ICategory | IPlace) => {
        return {
            value: String(item._id),
            label: item.name,
        };
    });
};
export default mapOptions;
