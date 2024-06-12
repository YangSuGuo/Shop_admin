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
