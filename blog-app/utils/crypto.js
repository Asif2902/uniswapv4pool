import crypto from "crypto";
export function generateKey() {
  return crypto.randomBytes(8).toString("hex");
}
