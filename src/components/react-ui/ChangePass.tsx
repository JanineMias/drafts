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

const ChangePass: React.FC = () => {

  // VARIABLES TO BE PUT
  const [password, setPassword] = useState<string>('');
  const [newPass, setNewPass] = useState<string>('');

  const [isPassValid, setIsPassValid] = useState(true);
  const [isNewPassValid, setIsNewPassValid] = useState(true);

  const [loginState, setLoginState] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);

  // FOR CLOSING THE DIALOG BOX
  const closeDialog = () =>  setLoginState(false);

  // CUSTOM TOAST
  const { showCustomToast } = useCustomToast();

  // HANDLE LOGIN FORM
  const handleChangePass = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      console.log("Response data:", data);

      // CHECKS IF THE RESPONSE IF OKAY OR NOT
      if (!response.ok) {
        showCustomToast("Error:", data.error, "destructive");
        if(response.status == 400){
            if(password == '') setIsPassValid(false);
        }else{
            // USER IS NOT VALID IF STATUS RESPONSE IS ERROR 404, WHICH IS USER NOT FOUND
            setIsPassValid(response.status !== 404);
           
        }

      }else{
        setLoginState(true);
        setIsPassValid(true);

        // TESTING IF LOGIN IS SUCCESSFUL
        console.log('Login successful', data.token);
        setResponseData(data.message);
      }

    } catch (err) {
      if (err instanceof Error) {
        showCustomToast("Error:", err.message, "destructive");
      } else {
        showCustomToast("Error:", "An unknown error occurred", "destructive");
      }
    }
  

};


  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-blue-700 font-bold text-3xl">Reset Your Password</CardTitle>
      </CardHeader>
      <form onSubmit={handleChangePass}>
        <CardContent className="space-y-4">
          <InputLabel label="Password" >
            <Input
                placeholder='Enter new password'
                className={`focus:border-transparent transition-shadow duration-300 ease-in-out w-full ${isPassValid ? '' : 'border-red-500 text-red-700'}`}
                type="text"
                value={password}
                onInput={(e) => setPassword(e.currentTarget.value)}
                onChange={(e) => setIsPassValid(true)}
              />
          </InputLabel >
        
          <InputLabel label="Confirm Password" >
            <Input
                placeholder='Re-enter new password'
                className={`focus:border-transparent transition-shadow duration-300 ease-in-out w-full ${isPassValid ? '' : 'border-red-500 text-red-700'}`}
                type="text"
                value={newPass}
                onInput={(e) => setPassword(e.currentTarget.value)}
                onChange={(e) => setIsPassValid(true)}
              />
          </InputLabel >
            
        </CardContent>

        <CardFooter className="flex flex-col mt-4">
          <Button className="flex w-full my-2" type="submit">Confirm Password</Button>
        </CardFooter>
      </form>


      {/* SHOWS DIALOG COMPONENT AFTER A SUCCESSFUL LOGIN*/}
      <Dialog open={loginState} onOpenChange={closeDialog}>
        <DialogContent className="w-60">
          <DialogTitle className="text-blue-700">Password changed! Log-in again</DialogTitle>
          <Button onClick={closeDialog} className="mt-4 text-white p-2 rounded">
            Continue
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ChangePass; // EXPORT ASTRO COMPONENT