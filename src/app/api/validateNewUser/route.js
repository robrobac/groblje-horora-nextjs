import { dbConnect } from "@/lib/mongo/dbConnect"
import userModel from "@/lib/mongo/models/userModel"
import { NextResponse } from "next/server"

export async function POST(request, response) {
    dbConnect()
    const data = await request.json()
    const { username, email, password } = data

    let errorMessages = [];

    try {
        if (!username) {
            errorMessages.push('Invalid Username');
        } else {
            const existingUser = await userModel.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });

            if (existingUser) {
                errorMessages.push('Username already exists');
            }

            if (username.length > 15 || username.length < 3) {
                errorMessages.push('Username requires 3-15 characters');
            }

        }

        if (!email) {
            errorMessages.push('Invalid Email');
        } else {
            const existingEmail = await userModel.findOne({ email });

            if (existingEmail) {
                errorMessages.push('Email already exists');
            }
        }

        if (!password) {
            errorMessages.push('Invalid Password');
        } else {

            if (password.length < 6) {
                errorMessages.push('Pasword must be 6 digits long');
            }
        }

        if (errorMessages.length > 0) {
            return new NextResponse(JSON.stringify({ error: 'Registration Failed', errorMessages }), {
                status: 400
            })
        }

        return new NextResponse(JSON.stringify({ message: 'Validation successful' }), {
            status: 200
        })
    } catch (err) {
        console.error('Error during user validation:', err);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error, error during user details validation' }), {
            status: 500
        })
    }
}