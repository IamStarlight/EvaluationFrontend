const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  sid: state => state.user.sid,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  cid: state => state.course.cid,
  cname: state => state.course.cname,
  teacher: state => state.course.teacher,
  cintroduction: state => state.course.cintroduction,
  homeworkid: state => state.course.homeworkid,
  homeworkname: state => state.course.homeworkname,
  exchangeid: state => state.course.exchangeid
}
export default getters
