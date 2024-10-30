// IMPORTING REACT 
import React, { useState } from 'react';
import type { FormEvent } from 'react';
// IMPORTING REACT COMPONENT
import SelectComponent from "@/components/react-ui/SelectComponent";
// IMPORTING UI-KIT FROM SHADCN
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
// IMPORTING ICON FROM HEROICONS
import { UserIcon, LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const SignupComponent: React.FC = () => {
     // VARIABLES TO BE POST
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [email, setEmail] = useState<string>(''); 
    const [fname, setFName] = useState<string>(''); 
    const [lname, setLName] = useState<string>(''); 
    const [role, setRole] = useState<string>('Buyer'); 

    const [signupState, setSignupState] = useState(false);
    const [error, setError] = useState<string>('');

    const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
          const response = await fetch('/api/register/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email, fname, lname, role }),
          });
    
          const data = await response.json();
          console.log("Response data:", data);
    
          // CHECKS IF THE RESPONSE IF OKAY OR NOT
          if (!response.ok) {
            setError(data.error || 'An error occured.');
          }else{
            setError('');
            console.log('Successfully Sign In.', data.token);
          }
    
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        }
      };

      const handleRoleChange = (value: string) => {
        setRole(value); // Update state with the selected value
      };

    return(
        <Card className="w-fit">
            <form onSubmit={handleSignup}>
                <CardHeader className="mb-2" >
                    <div className = "grid grid-cols-2 gap-x-4 items-center">
                        <CardTitle className="text-blue-700 font-bold text-3xl">REGISTER AS</CardTitle>
                        <SelectComponent onValueChange={handleRoleChange}/>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* REGISTER NAME */}
                    <div className = "grid grid-cols-2 gap-x-4">
                        <div className ="space-y-2">
                            <div className ="flex items-center gap-x-1">
                                <UserIcon className="size-4 max-sm:size-5 text-gray-600" />
                                <Label htmlFor="registerFName">First Name</Label>
                            </div>
                            <Input 
                            placeholder='Enter First Name' 
                            className="focus:border-transparent transition-shadow duration-300 ease-in-out w-full"
                            type="text"
                            value={fname}
                            onInput={(e) => setFName(e.currentTarget.value)}
                            required
                            />
                        </div>
                        <div className ="space-y-2">
                            <div className ="flex items-center gap-x-1">
                                <Label htmlFor="registerLName">Last Name</Label>
                            </div>
                            <Input
                            placeholder='Enter Last Name' 
                            className="focus:border-transparent transition-shadow duration-300 ease-in-out w-full"
                            type="text"
                            value={lname}
                            onInput={(e) => setLName(e.currentTarget.value)}
                            required
                            />
                        </div>
                    </div>

                    {/* REGISTER USERNAME */}
                    <div className ="space-y-2">
                        <div className ="flex items-center gap-x-1">
                            <UserIcon className ="size-4 max-sm:size-5 text-gray-600" />
                            <Label htmlFor="registerUName">Username</Label>
                        </div>
                        <Input placeholder='Create Username' 
                               className="focus:border-transparent transition-shadow duration-300 ease-in-out w-full"
                               type="text"
                               value={username}
                               onInput={(e) => setUsername(e.currentTarget.value)}
                               required
                               />
                    </div>

                    {/* REGISTER EMAIL */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-x-1">
                            <EnvelopeIcon className ="size-4 max-sm:size-5 text-gray-600" />
                            <Label htmlFor="registerMail">E-mail</Label>
                        </div>
                        <Input placeholder='Enter E-mail' 
                               className="focus:border-transparent transition-shadow duration-300 ease-in-out w-full"
                               type="text"
                               value={email}
                               onInput={(e) => setEmail(e.currentTarget.value)}
                               required
                               />
                    </div>

                    {/* REGISTER PASSWORD */}
                    <div className= "grid grid-cols-2 gap-x-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-x-1">
                                <LockClosedIcon className="size-4 max-sm:size-5 text-gray-600" />
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input placeholder='Create password' 
                                   className="focus:border-transparent transition-shadow duration-300 ease-in-out w-full"
                                   type="password"
                                   value={password}
                                   onInput={(e) => setPassword(e.currentTarget.value)}
                                   required
                                   />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-x-1">
                                <Label htmlFor="conPassword">Confirm Password</Label>
                            </div>
                            <Input placeholder='Enter password' 
                                   className="focus:border-transparent transition-shadow duration-300 ease-in-out w-full"
                                   type="password"
                                   value={confirmPassword}
                                   onInput={(e) => setConfirmPassword(e.currentTarget.value)}
                                   required
                                   />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="mt-4">
                    <Button className="flex w-full ">Confirm</Button>
                </CardFooter>
            </form>
    </Card>
    );
};

export default SignupComponent; // EXPORT ASTRO COMPONENT

