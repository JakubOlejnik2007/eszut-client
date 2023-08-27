export type TReportFormNames = "priority" | "CategoryID" | "PlaceID" | "who" | "what";
export type TLoginFormNames = "password" | "email";
export type TChangePasswordNames = "oldPassword" | "newPassword" | "confirmNewPassword";
export type TChangeEmailNames = "newEmail";
export type TAddCategoryNames = "newCategoryName";
export type TAddPlaceNames = "newPlaceName";
export type TChangeCategory = "category";
export type TChangePlace = "place";


type TFormNames = TReportFormNames | TLoginFormNames | TChangePasswordNames | TChangeEmailNames | TAddCategoryNames | TAddPlaceNames | TChangeCategory | TChangePlace;
export default TFormNames;