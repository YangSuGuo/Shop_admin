import http from"@/http";
import type {ListParm} from "@/api/order/OrderModel";

// 查询闲置订单列表
export const getUnusedOrderListApi = (parm:ListParm)=>{
    return http.get("/api/v1/goodsOrder/getUnusedOrderList",parm)
}

// 查询求购订单列表
export const getBuyOrderListApi = (parm:ListParm)=>{
    return http.get("/api/v1/goodsOrder/getBuyOrderList",parm)
}

// 查询闲置订单列表数量
export const getQueryIdleOrderListCountApi = ()=>{
    return http.get("/api/v1/goodsOrder/getQueryIdleOrderListCount")
}

// 查询求购订单列表数量
export const getQueryPurchaseOrderListCountApi = ()=>{
    return http.get("/api/v1/goodsOrder/getQueryPurchaseOrderListCount")
}

// 查询订单总额
export const getQueryOrderTotalAmountApi = ()=>{
    return http.get("/api/v1/goodsOrder/getQueryOrderTotalAmount")
}
