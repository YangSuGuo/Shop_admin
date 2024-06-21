import http from "@/http"
import type {GoodsListParm, StatusParm} from "./GoodsModel"
//查询商品列表api
export const getGoodsListApi = (parm: GoodsListParm) => {
    return http.get("/api/v1/goods/list", parm)
}

export const getGoodsList2Api = (parm: GoodsListParm) => {
    return http.get("/api/v1/goods/wanted/list", parm)
}

// 查询闲置商品数量
export const getQueryIdleItemCountApi = () => {
    return http.get("/api/v1/goods/queryIdleItemCount")
}

// 查询求购商品数量
export const getQueryPurchaseItemQuantityApi = () => {
    return http.get("/api/v1/goods/queryPurchaseItemQuantity")
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

