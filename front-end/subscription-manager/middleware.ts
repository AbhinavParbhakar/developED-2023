
export { default } from "next-auth/middleware";
export const config = { matcher: ["/home","/mysubscriptions","/subscription"] }
//home is the main dashboard that '/' redirects to if user is signed in

