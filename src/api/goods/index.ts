import http from "@/http"
import type {GoodsList2Parm, GoodsListParm, StatusParm} from "./GoodsModel"
//查询商品列表api
export const getGoodsListApi = (parm: GoodsListParm) => {
    return http.get("/api/v1/goods/list", parm)
}

export const getGoodsList2Api = (parm: GoodsList2Parm) => {
    return http.get("/api/v1/goods/list2", parm)
}

//上架下架
export const upanddownApi = (parm: StatusParm) => {
    return http.post("/api/v1/goods/upanddown", parm)
}

//删除
export const deleteApi = (parm: StatusParm) => {
    return http.post("/api/v1/goods/delete", parm)
}

//推荐首页
export const setIndexApi = (parm: StatusParm) => {
    return http.post("/api/v1/goods/setIndex", parm)
}

