// IMPORTING REACT 
import React, { useState } from 'react';
import type { FormEvent } from 'react';

// IMPORTING UI-KIT FROM SHADCN
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// CREATED A UTILITY TSX FILE FOR CREATING CUSTOM TOAST.
import { useCustomToast } from "@/utils/toastHelper";

// OWN CREATED ASTRO COMPONENT
import InputLabel from '@/components/react-ui/InputLabel';

// IMPORTING ICON FROM HEROICONS
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const LoginComponent: React.FC = () => {

  // VARIABLES TO BE POST
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isUserValid, setIsUserValid] = useState(true);
  const [isPassValid, setIsPassValid] = useState(true);
  const [loginState, setLoginState] = useState(false);

  const [responseData, setResponseData] = useState<any>(null);

  // FOR CLOSING THE DIALOG BOX
  const closeDialog = () =>  setLoginState(false);

  // SHOW PASSWORD
  const [showPassword, setShowPassword] = useState(false);
  const handleCheckboxChange = () => setShowPassword(!showPassword);

  // CUSTOM TOAST
  const { showCustomToast } = useCustomToast();

  // HANDLE LOGIN FORM
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Response data:", data);

      // CHECKS IF THE RESPONSE IF OKAY OR NOT
      if (!response.ok) {
        showCustomToast("Error:", data.error, "destructive");
        if(response.status == 400){
            if(username == '') setIsUserValid(false);
            if(password == '') setIsPassValid(false);
        }else{
            // USER IS NOT VALID IF STATUS RESPONSE IS ERROR 404, WHICH IS USER NOT FOUND
            setIsUserValid(response.status !== 404);
            // PASSWORD IS NOT VALID IF STATUS RESPONSE IS ERROR 401, WHICH IS NOT UNATHORIZED BECAUSE WRONG PASSWORD
            setIsPassValid(response.status !== 401);
        }

      }else{
        setLoginState(true);
        setIsUserValid(true);
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
        <CardTitle className="text-blue-700 font-bold text-3xl">LOGIN</CardTitle>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-4">
          <InputLabel label="Username" icon ={UserIcon}>
            <Input
                placeholder='Enter Username/E-mail'
                className={`focus:border-transparent transition-shadow duration-300 ease-in-out w-full ${isUserValid ? '' : 'border-red-500 text-red-700'}`}
                type="text"
                value={username}
                onInput={(e) => setUsername(e.currentTarget.value)}
                onChange={(e) => setIsUserValid(true)}
              />
          </InputLabel >
          <a className="flex flex-row float-right items-center space-x-2">  
              <Label className="text-sm font-semibold text-blue-800 hover:text-blue-600">Forgot Password?</Label>
          </a>
          <InputLabel label="Password" icon ={LockClosedIcon}>
            <Input
              placeholder='Enter password'
              className={`focus:border-transparent transition-shadow duration-300 ease-in-out w-full ${isPassValid ? '' : 'border-red-500 text-red-700'}`}
              type= {showPassword ? 'text' : 'password'}
              value={password}
              onInput={(e) => setPassword(e.currentTarget.value)}
              onChange={(e) => setIsPassValid(true)}
            />
          <div className="flex flex-row float-right items-center space-x-2">  
              <Checkbox id="show-password"
                        checked={showPassword}
                        onCheckedChange={handleCheckboxChange}
               /> 
              <Label className="text-sm font-normal">Show Password</Label>
          </div>
          </InputLabel>
          
            
        </CardContent>
        <CardFooter className="flex flex-col mt-4">
          <Button className="flex w-full my-2" type="submit">Confirm</Button>
        </CardFooter>
      </form>
      {/* SHOWS DIALOG COMPONENT AFTER A SUCCESSFUL LOGIN*/}
      <Dialog open={loginState} onOpenChange={closeDialog}>
        <DialogContent className="w-60">
          <DialogTitle className="text-blue-700">Login Successful!</DialogTitle>
          <DialogDescription>
            Welcome back, {username}!
          </DialogDescription>
          <Button onClick={closeDialog} className="mt-4 text-white p-2 rounded">
            Continue
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default LoginComponent; // EXPORT ASTRO COMPONENT