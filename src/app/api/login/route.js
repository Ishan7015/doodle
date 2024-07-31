import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import jwt from "jsonwebtoken";


export async function POST(request) {
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody;
    const user = User.findOne({ email });
    if (!user)
      return NextResponse.json({ error: "User does not exist" }, { status: 400 }) //400 bad request, user is not registered
    const isPasswordValid = bcryptjs.compare(password, user.password);

    if (!isPasswordValid)
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 }) // 401 unauthorized access, password is incorrect

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    }
    const token = jwt.sign(tokenData, process.env.SECRET_TOKEN, {expiresIn: "1d"})

    const response = NextResponse.json({
      message: "Login successful",
      success: true, 
    })
    response.cookies.set("token", token, {
      httpOnly: true, 
        
    })
    return response;
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Somthing went wrong" });
  }
}