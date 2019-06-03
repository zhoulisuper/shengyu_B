import server from './server';
// import url from './serviceAPI.config';

//接口1方法
export function fetch(url, data) {
  return server({
    url: url,
    method: 'post',
    dataType: "json",
    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
    data: data
  }).catch(() => {
    console.log('catch')
  })
}