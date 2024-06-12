import http from "@/http";
import type {UnwrapNestedRefs} from "vue";
import type {searchParam} from "@/type/searchParam";
import type {WxUser} from "@/api/wxuser/WxUserModel";

//查询微信用户列表
export const getListApi = (parm: UnwrapNestedRefs<searchParam>) => {
    return http.get("/api/v1/wxUser/list", parm)
}

//停用
export const stopUserApi = (parm: WxUser) => {
    return http.post("/api/v1/wxUser/stopUser", parm)
}

//重置密码
export const updatePasswordApi = (parm: WxUser) => {
    return http.post("/api/v1/wxUser/updatePassword", parm)
}

//删除
export const deleteApi = (parm: WxUser) => {
    return http.delete(`/api/v1/wxUser/${parm.userId}`)
}
