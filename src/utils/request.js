import axios from '../plugins/axios'

// 登录
export function login(obj) {
    return axios.post('/login', { username: obj.name, password: obj.region })
}

// 左侧菜单栏
export function menus() {
    return axios.get('/menus')
}

// 用户列表数据
export function users(params) {
    return axios.get('/users', { params })
}

// 添加新用户
export function adduser(data) {
    return axios.post('/users', {
        username: data.username,
        password: data.password,
        email: data.email,
        mobile: data.mobile
    })
}

// 删除用户
export function del(id) {
    return axios.delete('/users/' + id)
}

// 修改用户信息
export function updatas(id, obj) {
    return axios.put(`/users/${id}`, obj)
}
// 查询用户信息
export function getuser(id) {
    return axios.get(`/users/${id}`)
}
// 修修改用户状态
export function axiosChangeState(data) {
    return axios.put(`/users/${data.id}/state/${data.state}`)
}

// 角色列表
export function getRoles() {
    return axios.get('/roles')
}
// 添加角色
export function addrole(data) {
    return axios.post('/roles', data)
}
// 删除角色
export function delrole(id) {
    return axios.delete(`/roles/${id}`)
}
// 查询角色信息
export function getrole(id) {
    return axios.get(`/roles/${id}`)
}
// 修改角色信息
export function updatarole(id, data) {
    return axios.put(`/roles/${id}`, data)
}
// 获取权限列表
export function rights(data) {
    return axios.get(`/rights/${data}`)
}
// 删除角色权限
export function delrights(roleid, rightid) {
    return axios.delete(`roles/${roleid}/rights/${rightid}`)
}
// 角色权限分配
export function addrights(id, data) {
    return axios.post(`roles/${id}/rights`, data)
}

// 获取商品列表
export function getgoods(params) {
    return axios.get('/goods', { params })
}
// 删除商品
export function deleted(id) {
    return axios.delete(`/goods/${id}`)
}
// 获取商品数据
export function good(id) {
    return axios.get(`/goods/${id}`)
}
// 编辑商品提交
export function upgood(id, data) {
    return axios.put(`/goods/${id}`, data)
}
// 商品分类
export function getcategories() {
    return axios.get('/categories')
}
// 获取订单列表
export function getorders(params) {
    return axios.get('/orders', { params })
}
// 获取订单物流信息
export function looks(id) {
    return axios.get(`/kuaidi/${id}`)
}
// 商品分类
export let getCategories = data => axios.get(`/categories`)

// 添加商品分类
export function addCategories(data) {
    return axios.post('/categories', data)
}
// 查询编辑分类
export function Categories(id) {
    return axios.get(`categories/${id}`)
}
// 确认修改
export function OKupdate(id, params) {
    return axios.put(`categories/${id}`, { cat_name: params })
}
// 删除商品分类
export function delcategories(id) {
    return axios.delete(`categories/${id}`)
}
// 获取图表数据
export function getChart() {
    return axios.get('/reports/type/1')
}

// 获取分类参数列表
export function getparams(id, sel) {
    return axios.get(`categories/${id}/attributes`, { params: { sel: sel } })
}
// 添加分类参数
export function addparams(id, params) {
    return axios.post(`categories/${id}/attributes`, params)
}
// 删除参数
export function delparams(id, attr_id) {
    return axios.delete(`categories/${id}/attributes/${attr_id}`)
}
// 获取参数详细
export function params(data) {
    return axios.get(`categories/${data.id}/attributes/${data.attr_id}`, { attr_sel: data.attr_sel })
}
// 确认修改参数
export function okupparams(data) {
    return axios.put(`categories/${data.cat_id}/attributes/${data.attr_id}`, { attr_name: data.attr_name, attr_sel: data.attr_sel, attr_vals:'' })
}
// 添加商品
export function addgoods(params){
    return axios.post('/goods',params)
}