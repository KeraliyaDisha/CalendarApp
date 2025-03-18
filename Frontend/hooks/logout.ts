/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";

export const handleEventLogout = (
    router: any
) => {
  Cookies.remove("token");
  router.push("/");
};
