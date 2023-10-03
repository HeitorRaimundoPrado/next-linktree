const cookie = require("cookie")

export const destroyTokenCookie = (res: Response) => {
  res.headers.set(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      maxAge: -1, // Set the maxAge to negative to delete the cookie
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })
  );
};
