import { createMiddleware } from "hono/factory";
import UserService from "../services/users.js";

interface RequestData {
  user_id: string;
}

const Middleware = createMiddleware<{
  Variables: {
    userObj: any;
  };
}>(async (c, next) => {
  console.log("Middleware: before request");

  let uid: string | null = null;

  if (c.req.method === "POST") {
    const data: RequestData = await c.req.json();
    if (!data.user_id) {
      return c.text("Missing plant data", 400);
    }
    uid = data.user_id;
  } else if (c.req.method === "GET") {
    uid = c.req.query("uid") ?? null;
  }

  try {
    const userObj = await new UserService().getUser(uid as string);
    if (!userObj) {
      return c.text("Invalid user_id", 400);
    }
    console.log("userObj", userObj);
    c.set("userObj", userObj);
  } catch (error) {
    return c.text("Invalid user_id", 400);
  }

  await next();
  console.log("Middleware: after request");
});

export default Middleware;
