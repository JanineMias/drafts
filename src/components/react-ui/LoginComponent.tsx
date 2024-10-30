// IMPORTING REACT 
import React, { useState } from 'react';
import type { FormEvent } from 'react';
// IMPORTING UI-KIT FROM SHADCN
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
// IMPORTING ICON FROM HEROICONS
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const LoginComponent: React.FC = () => {
  // VARIABLES TO BE POST
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isUserValid, setIsUserValid] = useState(true);
  const [isPassValid, setIsPassValid] = useState(true);
  const [loginState, setLoginState] = useState(false);
  const [error, setError] = useState<string>('');

  const [responseData, setResponseData] = useState<any>(null);

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
        setError(data.error);
        // USER IS NOT VALID IF STATUS RESPONSE IS ERROR 404, WHICH IS USER NOT FOUND
        setIsUserValid(response.status !== 404);
        // PASSWORD IS NOT VALID IF STATUS RESPONSE IS ERROR 401, WHICH IS NOT UNATHORIZED BECAUSE WRONG PASSWORD
        setIsPassValid(response.status !== 401);
      }else{
        setError('');
        setLoginState(true);
        setIsUserValid(true);
        setIsPassValid(true);
        // TESTING IF LOGIN IS SUCCESSFUL
        console.log('Login successful', data.token);
        setResponseData(data.message);
      }

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const closeDialog = () => {
    setLoginState(false);
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-blue-700 font-bold text-3xl">LOGIN</CardTitle>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-x-1">
              <UserIcon className="size-4 max-sm:size-5 text-gray-600" />
              <Label htmlFor="loginUsername">Username</Label>
            </div>
            <Input
              placeholder='Enter Username/E-mail'
              className={`focus:border-transparent transition-shadow duration-300 ease-in-out w-full ${isUserValid ? '' : 'border-red-500 text-red-700'}`}
              type="text"
              value={username}
              onInput={(e) => setUsername(e.currentTarget.value)}
              onChange={(e) => setIsUserValid(true)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-x-1">
              <LockClosedIcon className="size-4 max-sm:size-5 text-gray-600" />
              <Label htmlFor="loginPassword">Password</Label>
            </div>
            <Input
              placeholder='Enter password'
              className={`focus:border-transparent transition-shadow duration-300 ease-in-out w-full ${isPassValid ? '' : 'border-red-500 text-red-700'}`}
              type="password"
              value={password}
              onInput={(e) => setPassword(e.currentTarget.value)}
              onChange={(e) => setIsPassValid(true)}
              required
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col mt-2">
          {/* DISPLAYS ERROR AFTER SUBMITTING INPUTTED DATA*/}
          {error && (
              <div className="w-full flex flex-row gap-x-1">
                <p className="text-red-500 font-semibold ">Error:</p>
                <p className="text-red-500"> {JSON.stringify(error, null, 2).replace(/"/g, '')}</p>
              </div>
             
          )}
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