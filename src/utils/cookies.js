import Cookies from "js-cookie";

function setToken(token) {
  Cookies.set("jwt-token", token, {
    expires: 7,
    secure: true,
    sameSite: "Strict",
  });
}

function getToken() {
  return Cookies.get("jwt-token");
}

function removeToken() {
  Cookies.remove("jwt-token");
}

export { setToken, getToken, removeToken };
