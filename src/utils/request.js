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
export function getRoles(){
    return axios.get('/roles')
}
// 添加角色
export function addrole(data){
    return axios.post('/roles',data)
}
// 删除角色
export function delrole(id){
    return axios.delete(`/roles/${id}`)
}
// 查询角色信息
export function getrole(id){
    return axios.get(`/roles/${id}`)
}
// 修改角色信息
export function updatarole(id,data){
    return axios.put(`/roles/${id}`,data)
}
// 获取权限列表
export function rights(data){
    return axios.get(`/rights/${data}`)
}
// 删除角色权限
export function delrights(roleid,rightid){
    return axios.delete(`roles/${roleid}/rights/${rightid}`)
}
// 角色权限分配
export function addrights(id,data){
    return axios.post(`roles/${id}/rights`,data)
}