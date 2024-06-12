import http from"@/http";
import type {Menu} from "@/api/menu/MenuModel";

//新增
export const addApi = (parm:Menu) => {
    return http.post("/api/v1/menu",parm)
}
export const getParentApi =()=>{
    return http.get("/api/v1/menu/getParent")
}
//查询
export const listApi =()=>{
    return http.get("/api/v1/menu/list")
}
//编辑
export const editApi = (parm:Menu)=>{
    return http.put("/api/v1/menu",parm)
}

//删除
export const deleteApi = (parm:Menu) => {
    return http.delete(`/api/v1/menu/${parm.menuId}`)
}
