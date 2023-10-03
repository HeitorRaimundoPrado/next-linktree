import { NextApiRequest, NextApiResponse } from 'next';
import { destroyTokenCookie } from '../../utils/auth'; // Implement this function to destroy the token cookie

export const POST = async (req: Request) => {
  // Call the function to destroy the token cookie
  const res = new Response(JSON.stringify({ msg: "Logged out successfully" }), { status: 200 });;
  destroyTokenCookie(res);

  // Optionally, you can also perform additional cleanup or actions here

  return res;
};
