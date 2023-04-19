export const scrollToPosition = (top = 0) => {
  try {
    /**
     * Latest API
     */
    document.documentElement.scrollTo({
      top: top,
      left: 0,
      behavior: "smooth",
    });
  } catch (_) {
    /**
     * Fallback
     */
    document.documentElement.scrollTo(0, top);
  }
};

export const uuid = () => {
  let dt = new Date().getTime();

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export function setCookie(name, value, days) {
  var date, expires;
  if (days) {
    date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + ";secure " + expires + "; path=/";
}

export function getCookie(name) {
  var i,
    c,
    ca,
    nameEQ = name + "=";
  ca = document.cookie.split(";");
  for (i = 0; i < ca.length; i++) {
    c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return "";
}

export function deleteCookie(name) {
  setCookie(name, "", -1);
}
