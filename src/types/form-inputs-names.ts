export type TReportFormNames = "priority" | "CategoryID" | "PlaceID" | "who" | "what";
export type TLoginFormNames = "password" | "email";
export type TChangePasswordNames = "oldPassword" | "newPassword" | "confirmNewPassword";
export type TChangeEmailNames = "newEmail";
export type TInsertCategoryNames = "newCategoryName";
export type TInsertPlaceNames = "newPlaceName";
export type TChangeCategory = "category";
export type TChangePlace = "place";
export type TAddAdministrator = "name" | "email" | "password";

type TFormNames = TReportFormNames | TLoginFormNames | TChangePasswordNames | TChangeEmailNames | TInsertCategoryNames | TInsertPlaceNames | TChangeCategory | TChangePlace | TAddAdministrator;
export default TFormNames;