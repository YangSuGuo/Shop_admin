import http from "@/http";
import type {Category, CategoryListParm} from "@/api/category/CategoryModel";

// 新增
export const addCategoryApi = (parm: Category) => {
    return http.post("/api/v1/category", parm)
}

// 查询
export const listApi = (parm: CategoryListParm) => {
    return http.get("/api/v1/category/list", parm)
}

//编辑
export const editCategoryApi = (parm: Category) => {
    return http.put("/api/v1/category", parm)
}

//删除
export const deleteCategoryApi = (parm: Category) => {
    return http.delete(`/api/v1/category/${parm.categoryId}`)
}