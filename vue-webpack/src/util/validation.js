
// 手机号码
export let validationMobile = value => /^(13|14|15|17|18)\d{9}$/.test(value);

// 邮箱
export let validationEmail = value => /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/.test(value);

// 店铺名  
export let validationUserName = value => /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_-]){1,20}$/.test(value);
