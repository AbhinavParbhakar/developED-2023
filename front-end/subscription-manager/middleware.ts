export { default } from "next-auth/middleware";
export const config = { matcher: ["/","/subscription/:any*","/mysubscriptions"] }