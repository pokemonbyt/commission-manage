/*
 * @Description: auth
 * @Author: code pro
 * @Date: 2022-06-07 17:57:41
 * @LastEditTime: 2022-06-25 23:14:09
 * @LastEditors: code pro
 */
import Cookies from 'js-cookie';
import store from '../store';

// const TokenKey = 'token';
// const UsernameKey = 'username';
const userIdKey = 'userId';
// const isCaptchaKey = 'isCaptcha';

// 缓存isCaptcha 在cookies: 5分钟
export function setIsCaptcha(isCaptcha) {
  return Cookies.set('isCaptcha', isCaptcha, {
    expires: 7, // 7天
  });
}

// 获取isCaptcha 值
export function getIsCaptcha() {
  const isCaptcha = Cookies.get('isCaptcha');
  if (isCaptcha !== undefined) {
    return isCaptcha === 'true';
  }
  return false;
}

export function getToken() {
  return Cookies.get('token');
}

export function setToken(token) {
  return Cookies.set('token', token);
}
export function removeToken() {
  return Cookies.remove('token');
}

export function setUsername(username) {
  return Cookies.set('username', username);
}

export function getUsername() {
  return Cookies.get('username');
}

export function removeUsername() {
  return Cookies.remove('username');
}

export function setUserId(id) {
  return Cookies.set(userIdKey, id);
}

export function getUserId() {
  return Cookies.get(userIdKey);
}

//set loading data
export function setLoading(payload) {
  store.dispatch('auth/setLoading', payload);
}

//set toast data
export function setToast(payload) {
  store.dispatch('auth/setToast', payload);
}
