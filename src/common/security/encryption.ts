import CryptoJS from "crypto-js";
import { env } from "@/common/utils/env.config";

const encrypt = (data: string) => {
  return CryptoJS.AES.encrypt(data, env.SECRET_KEY).toString();
}

const decrypt = (data: string) => {
  return CryptoJS.AES.decrypt(data, env.SECRET_KEY)
    .toString(CryptoJS.enc.Utf8);
}

export { encrypt, decrypt };