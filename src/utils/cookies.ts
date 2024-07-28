import Cookies from "js-cookie";

// Define the types for the functions
function setToken(token: string): void {
  Cookies.set("jwt-token", token, {
    expires: 1,
    secure: true,
    sameSite: "strict",
  });
}

function getToken(): string | undefined {
  return Cookies.get("jwt-token");
}

function removeToken(): void {
  Cookies.remove("jwt-token");
}

export { setToken, getToken, removeToken };
