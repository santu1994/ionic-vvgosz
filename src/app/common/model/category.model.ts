export interface CategoryModel {
  is_active: boolean;
  _id: string;
  name: string;
  sub_category: Array<SubCategoriesModel>;
  createdAt: string;
  updatedAt: string;
}
export interface SubCategoryModel {
  is_active: boolean;
  _id: string;
  name: string;
  sub_category: SubCategoriesModel;
  createdAt: string;
  updatedAt: string;
}

export interface SubCategoriesModel {
  is_active: boolean;
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
