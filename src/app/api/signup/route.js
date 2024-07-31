import { NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request) {
  try {
		const reqBody = await request.json()
		const { username, email, password } = reqBody;
		const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
		const newUser = new User({ username, email, password: hashedPassword })
		await newUser.save()
    console.log("User Registered Sucessfully: ", newUser.username)
		return NextResponse.json({ msg: `User ${username} sucessfully registered` }, { status: 200 });

	} catch (error) {
		if (error.code === 11000) { //Status code 11000 means user already exists in database
			console.log(error);
      return NextResponse.json({
        data: {
        error: error
      } }, { status: 409 });
		}
		console.log(error)
		return NextResponse.json({ error: "Somthing went wrong" });
	}
}