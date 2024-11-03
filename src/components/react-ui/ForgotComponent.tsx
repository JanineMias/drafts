// IMPORTING REACT 
import { useForm } from "react-hook-form"
import React, { useState } from 'react';
import type { FormEvent } from 'react';

// IMPORTING UI-KIT FROM SHADCN
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { OTPInput, OTPInputContext } from "input-otp";
import {InputOTP,InputOTPGroup,InputOTPSlot,} from "@/components/ui/input-otp";

// CREATED A UTILITY TSX FILE FOR CREATING CUSTOM TOAST.
import { useCustomToast } from "@/utils/toastHelper";

// OWN CREATED ASTRO COMPONENT
import InputLabel from '@/components/react-ui/InputLabel';

// IMPORTING ICON FROM HEROICONS
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const ForgotComponent: React.FC = () => {

  // VAIRABLES TO GET

  // VARIABLES TO BE PUT
  const [otp, setOtp] = useState<string>('');
  const [email, getEmail] = useState<string>('');
  const [username, getUsername] = useState<string>('');

  const [isUserValid, setIsUserValid] = useState(true);
  const [isOtpValid, setIsOtpValid] = useState(true);

  const [loginState, setLoginState] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);

  // FOR CLOSING THE DIALOG BOX
  const closeDialog = () =>  setLoginState(false);

  // CUSTOM TOAST
  const { showCustomToast } = useCustomToast();

  // HANDLE LOGIN FORM
  const handleForgot = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // GENERATING OTP
    function generateOTP(): number {
        // Combine current timestamp with random number for better uniqueness
        const setOtp = Math.floor(Math.random() * 1000000) + Date.now();
        
        // Ensure the number has 6 digits by adding or removing the thousands digit
        const otpCheck = setOtp.toString();
        if (otpCheck.length < 6) {
        return parseInt(otpCheck.padStart(6, '0'));
        } else if (otpCheck.length > 6) {
        return parseInt(otpCheck.slice(0, 6));
        }
        
        // If a duplicate still occurs (unlikely), generate another one recursively
        return generateOTP();
        }


        const otp = generateOTP();
        console.log("Generated OTP:", otp);

    try {

        const fetchEmail = await fetch('/api/auth/login', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
    
          const dataEmail = await fetchEmail.json();
          console.log("Email:", dataEmail);


          const fetchUsername= await fetch('/api/auth/login', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({username}),
          });
    
          const dataUser = await fetchUsername.json();
          console.log("Username:", dataUser);


      // CHECKS IF THE RESPONSE IF OKAY OR NOT
      if (!fetchEmail.ok) {
        showCustomToast("Error:", dataEmail.error, "destructive");
        if(fetchEmail.status == 400){
            if(username == '') setIsUserValid(false);
        }else{
            // PASSWORD IS NOT VALID IF STATUS RESPONSE IS ERROR 404, WHICH IS USER NOT FOUND
            setIsUserValid(fetchEmail.status !== 404);

        }

      }else{
        setLoginState(true);
        setIsUserValid(true);

        // TESTING IF LOGIN IS SUCCESSFUL
        console.log('Login successful', dataEmail.token);
        setResponseData(dataEmail.message);
      }

    } catch (err) {
      if (err instanceof Error) {
        showCustomToast("Error:", err.message, "destructive");
      } else {
        showCustomToast("Error:", "An unknown error occurred", "destructive");
      }
    }
  

};

// SENDING OTP TO EMAIL
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "oppa@gmail.com",
  port: 8081,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "oppa@gmail.com",
    pass: "jn7jnAPss4f63QBp6D", // pass ng email used
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"OPPA" <oppa@gmail.com>', // sender address
      to: " ", // list of receivers
      subject: "One-Time Password", // Subject line
      text: "Hello, this is your one-time password", // plain text body
      html: "<b>OTP</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
  
  main().catch(console.error);

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-blue-700 font-bold text-3xl">Reset Your Password</CardTitle>
      </CardHeader>
      <form onSubmit={handleForgot}>
        <CardContent className="space-y-4 items-center">
        <InputLabel label="One-Time Password" >
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                
              <span>  Please enter the one-time password sent to your phone. </span>
              </InputLabel>
        </CardContent>

        <CardFooter className="flex flex-col mt-4">
          <Button className="flex w-full my-2" type="submit">Submit</Button>
        </CardFooter>
      </form>

      {/* SHOWS DIALOG COMPONENT AFTER A SUCCESSFUL LOGIN*/}
      <Dialog open={loginState} onOpenChange={closeDialog}>
        <DialogContent className="w-60">
          <DialogTitle className="text-blue-700">OTP confirmed</DialogTitle>
          <Button ref="/newPass" onClick={closeDialog} className="mt-4 text-white p-2 rounded">
            Continue
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ForgotComponent; // EXPORT ASTRO COMPONENT