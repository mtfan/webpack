export const validation = function (value, type, requisite) {

  const v = value.replace(/^\s+|\s+$/g, "");

  if (requisite) {
    return !!v;
  }

  if (type == 'mobile') {
    return /^(13|14|15|17|18)\d{9}$/i.test(v);
  }

  if (type == 'email') {
    return /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/.test(v);
  }

}
