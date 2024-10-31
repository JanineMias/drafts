// IMPORTING REACT 
import React, { useState } from 'react';
import type { FormEvent } from 'react';

// IMPORTING REACT COMPONENT
import SelectComponent from "@/components/react-ui/SelectComponent";

// IMPORTING UI-KIT FROM SHADCN
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// OWN CREATED ASTRO COMPONENT
import InputLabel from '@/components/react-ui/InputLabel';

// CREATED A UTILITY TSX FILE FOR VALIDATING PASSWORD
import { validatePassword } from "@/utils/passwordValidator";
import { useCustomToast } from "@/utils/toastHelper";

// IMPORTING ICON FROM HEROICONS
import { UserIcon, LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
  
// SIGNUP REACT COMPONENT
const SignupComponent: React.FC = () => {

     // VARIABLES TO BE POST
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [email, setEmail] = useState<string>(''); 
    const [fname, setFName] = useState<string>(''); 
    const [lname, setLName] = useState<string>(''); 
    const [role, setRole] = useState<string>('Buyer'); 

    // CHECK EVERY VALIDITY OF VARIABLES
    const [isUserValid, setIsUserValid] = useState(true);
    const [isPassValid, setIsPassValid] = useState(true);
    const [isConfirmPassValid, setIsConfirmPassValid] = useState(true);
    const [isFNameValid, setIsFNameValid] = useState(true);
    const [isLNameValid, setIsLNameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    
    // FIRST TIME SUBMIT
    const [isSubmit, setIsSubmit] = useState(false);

    // CHECK IF FORM IS READY TO BE POST VARIABLE
    const [isFormValid, setIsFormValid] = useState(false);

    // CHECK WHETHER THE SIGNUP IS SUCCESSFUL VARIABLE
    const [signupState, setSignupState] = useState(false);

    // ERROR VARIABLE
    const [error, setError] = useState<string>('');

    // SHOW PASSWORD
    const [showPassword, setShowPassword] = useState(false);
    const handleCheckboxChange = () => setShowPassword(!showPassword);

    // CUSTOM TOAST
    const { showCustomToast } = useCustomToast();

    // HANDLE ROLE VALUE WHEN SELECT VALUE CHANGES
    const handleRoleChange = (value: string) => setRole(value); 

    // FOR CLOSING THE DIALOG BOX
    const closeDialog = () => setSignupState(false);
     
    // HANDLE SIGNUP FORM
    const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmit(true);
        // SET FORM TO VALID AND THEN CHECK VALIDATION AGAIN IF THE FORM IS VALID
        setIsFormValid(false);

        // CHECK IF THEIR IS EMPTY FIELDS
        if(username == '' || password == '' || confirmPassword == '' || email == '' || fname == '' || lname == ''){
            showCustomToast("Error:", "Please fill out the necessary field.", "destructive");
            setIsUserValid(username !== '');
            setIsPassValid(password !== '');
            setIsConfirmPassValid(confirmPassword !== '');
            setIsFNameValid(fname !== '');
            setIsLNameValid(lname !== '');
            setIsEmailValid(email !== '');
        }else{

            if (username.length >= 8 && username.length <=24){
                // CHECK IF THE PASSWORD IS VALID
                const validationResults = validatePassword(password);

                // IF THE PASSWORD IS INVALID
                if (validationResults.length > 0) {
                    const errorMessages = validationResults.map(result => result.message);
                    const errorMessageString = errorMessages[0];
                    setIsPassValid(false);
                    setError(errorMessageString);
                    showCustomToast("Error: Invalid Password", "Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.", "destructive");
                }else{
                    setError('');
                    if(password != confirmPassword){
                        setIsConfirmPassValid(false);
                        showCustomToast("Error:", "Password doesn't match.", "destructive");
                    }else{
                        console.log("Trying to signup", isFormValid);
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
                                showCustomToast("Error " + response.status + ":", data.error || "An error occured.", "destructive");
                                if(response.status == 400) setIsUserValid(false);
                            }else{
                                setSignupState(true);
                                console.log('Successfully SignIn.', data.token);
                            }
                        
                            } catch (err) {
                            if (err instanceof Error) {
                                showCustomToast("Error:", err.message, "destructive");
                            } else {
                                showCustomToast("Error:", "An unknown error occurred.", "destructive");
                            }
                        }  
                    }
                } 
            }else{
                showCustomToast("Error: Invalid Username", "Username must be 8 - 15 characters long.", "destructive");
                setIsUserValid(false);
            }
              
        }

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
                        <InputLabel label="First Name" icon ={UserIcon}>
                            <Input  placeholder='Enter First Name' 
                                    className={`focus:border-transparent transition-shadow duration-300 ease-in-out w-full ${isFNameValid ? '' : 'border-red-500 text-red-700'}`}
                                    type="text"
                                    value={fname}
                                    onInput={(e) => setFName(e.currentTarget.value)}
                                    onChange={(e) => {if(isSubmit) setIsFNameValid(fname !== '')}}
                                    />
                        </InputLabel>
                        <InputLabel label="Last Name">
                            <Input  placeholder='Enter Last Name' 
                                    className={`focus:border-transparent transition-shadow duration-300 ease-in-out w-full ${isLNameValid ? '' : 'border-red-500 text-red-700'}`}
                                    type="text"
                                    value={lname}
                                    onInput={(e) => setLName(e.currentTarget.value)}
                                    onChange={() => {if(isSubmit) setIsLNameValid(lname !== '')}}
                                    />
                        </InputLabel>
                    </div>

                    {/* REGISTER USERNAME */}
                    <InputLabel label="Username" icon ={UserIcon}>
                        <Input  placeholder='Create Username' 
                                className={`focus:border-transparent transition-shadow duration-300 ease-in-out w-full ${isUserValid ? '' : 'border-red-500 text-red-700'}`}
                                type="text"
                                value={username}
                                onInput={(e) => setUsername(e.currentTarget.value)}
                                onChange={() => {if(isSubmit) setIsUserValid(username !== '')}}
                                />
                    </InputLabel>
                    {/* REGISTER EMAIL */}
                    <InputLabel label="E-mail" icon ={EnvelopeIcon}>
                        <Input  placeholder='Enter E-mail' 
                                className={`focus:border-transparent transition-shadow duration-300 ease-in-out w-full ${isEmailValid ? '' : 'border-red-500 text-red-700'}`}
                                type="text"
                                value={email}
                                onInput={(e) => setEmail(e.currentTarget.value)}
                                onChange={() =>{if(isSubmit) setIsEmailValid(email !== '')}}
                                />
                        </InputLabel>
                    {/* REGISTER PASSWORD */}
                    <div className= "grid grid-cols-2 gap-x-4">
                        <InputLabel label="Password" icon ={LockClosedIcon}>
                            <Input placeholder='Create password' 
                                   className={`focus:border-transparent transition-shadow duration-300 ease-in-out w-full ${isPassValid ? '' : 'border-red-500 text-red-700'}`}
                                   type={showPassword ? 'text' : 'password'}
                                   value={password}
                                   onInput={(e) => setPassword(e.currentTarget.value)}
                                   onChange={() => {if(isSubmit) setIsPassValid(password !== '')}}
                                   />
                            {error && (
                            <div className="w-44 my-1">           
                                    <p className="text-sm text-red-600">{error}</p>
                            </div>
                         )}
                        </InputLabel>
                        <InputLabel label="Confirm Password">
                            <Input placeholder='Enter password' 
                                   className={`focus:border-transparent transition-shadow duration-300 ease-in-out w-full ${isConfirmPassValid ? '' : 'border-red-500 text-red-700'}`}
                                   type={showPassword ? 'text' : 'password'}
                                   value={confirmPassword}
                                   onInput={(e) => setConfirmPassword(e.currentTarget.value)}
                                   onChange={() => {if(isSubmit) setIsConfirmPassValid(confirmPassword !== '')}}
                                   />
                            <div className="flex flex-row float-right items-center space-x-2">  
                                <Checkbox id="show-password"
                                            checked={showPassword}
                                            onCheckedChange={handleCheckboxChange}
                                /> 
                                <Label className="text-sm font-normal">Show Password</Label>
                            </div>
                        </InputLabel>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button className="flex w-full my-2" type="submit">Confirm</Button>
                </CardFooter>
            </form>
                {/* SHOWS DIALOG COMPONENT AFTER A SUCCESSFUL LOGIN*/}
                <Dialog open={signupState} onOpenChange={closeDialog}>
                    <DialogContent className="w-60">
                    <DialogTitle className="text-blue-700">Successfully Signup!</DialogTitle>
                    <DialogDescription>
                        Welcome to OPPA, {username}!
                    </DialogDescription>
                    <Button onClick={closeDialog} className="mt-4 text-white p-2 rounded">
                        Continue
                    </Button>
                    </DialogContent>
                </Dialog>
    </Card>
    );
};

export default SignupComponent; // EXPORT ASTRO COMPONENT

