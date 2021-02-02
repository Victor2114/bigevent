/*
 * @author: Victor
 * @Date: 2021-02-02 15:40:26
 * @LastEditTime: 2021-02-02 16:43:00
 */
$(function () {
  // 获取用户信息
  getUserInfo();
  // 登出
  $('.logout').click(function () {
    localStorage.removeItem('token');
    location.href = '/login.html';
  });
  function getUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg('获取用户信息失败！');
        }
        // 调用 renderAvatar 渲染用户的头像
        renderAvatar(res.data);
      },
    });
  }
  // 渲染用户的头像
  function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username;
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
      // 3.1 渲染图片头像
      $('.layui-nav-img').attr('src', user.user_pic).show();
      $('.text-avatar').hide();
    } else {
      // 3.2 渲染文本头像
      $('.layui-nav-img').hide();
      var first = name[0].toUpperCase();
      $('.text-avatar').html(first).show();
    }
  }
});
