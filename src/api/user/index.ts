import http from "@/http"
import type {ListParam, LoginUser, User} from "@/api/user/UserModel";

export const addAdminUserApi = (parm: User) => {
    return http.post("/api/v1/sysUser", parm)
}

//查询管理员
export const getListApi = ((parm: ListParam) => {
    return http.get("/api/v1/sysUser/getList", parm)
})

// 修改管理员
export const editAdminApi = (parm: User) => {
    return http.put("/api/v1/sysUser", parm)
}

// 删除管理员
export const deleteAdminApi = (userId: string) => {
    return http.delete(`/api/v1/sysUser/${userId}`)
}

// 生成验证码
export const getCodeApi = () => {
    return http.get("/api/v1/sysUser/image")
}

// 后台登录
export const loginApi = (parm: LoginUser) => {
    return http.post("/api/v1/sysUser/login", parm)
}
