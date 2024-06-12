//定义用户的数据类型:interface 和 type
// 与后端管理员实体类同
export type User = {
    userId?: string,
    username: string,
    password: string,
    nickName: string,
    phone: string,
    sex: string,
    status: string
}

export type LoginUser = {
    userId?: string,
    username: string,
    password: string,
    code: string,
}

// 定义列表查询
// 与后端实体类PageParam同
export type ListParam = {
    currentPage: number,
    pageSize: number,
    nickName: string,
    total?: number //新增参数查询总条数
}
