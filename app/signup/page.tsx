"use client";
import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import countries from "@/lib/placeholder_data";
import { Button } from "@/components/ui/button";
import { signUp } from "../api/auth/signup/actions";
import { useDebouncedCallback } from "use-debounce";
import { Separator } from "@/components/ui/separator";
import { ToastContainer, toast } from "react-toastify";
import { Eye, EyeOff, Mail, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

export default function SignupPage() {
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
    dialCode: "",
  });

  // Password validation states
  const [validations, setValidations] = useState({
    length: false,
    number: false,
    special: false,
    letter: false,
  });

  const validatePassword = (password: string) => {
    setValidations({
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      letter: /[a-zA-Z]/.test(password),
    });
  };

  const emailValidation = (email: string) => {
    const emailSchema = z.string().email();
    return emailSchema.safeParse(email).success;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      validatePassword(value);
    }
  };

  useEffect(() => {
    if (!isEmailAvailable) {
      toast.error("Email already exists", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isEmailAvailable]);




  const debounced = useDebouncedCallback(
    // function
    async () => {
      const response = await axios.get(
        `/api/auth/signup?email=${formData.email}`
      );
      if (response.data.message == "found") {
        setIsEmailAvailable(false);
        setDisabled(true);  
      } else {
        setIsEmailAvailable(true);
      }
    },
    // delay in ms
    1000
  );

  useEffect(() => {
    setDisabled(false);
    debounced();
  }, [formData.email, debounced]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!validations.length || !validations.letter || !validations.number || !validations.special) {
        toast.error("Password must be at least 8 characters long and contain at least one letter, one number, and one special character.");
        setIsLoading(false);
        return;
      }

      if (!emailValidation(formData.email)) {
        toast.error("Invalid email address.");
        setIsLoading(false);
        return;
      }

      // Add your signup logic here
      const response = await signUp(formData);
      if (response.message == "done") {
        toast.success(
          "Account created successfully! Please check your email for verification."
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <ToastContainer />
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">
            Create an Account
          </CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-[140px] justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <span>
                            {" "}
                            <Image
                              width={20}
                              height={20}
                              alt={selectedCountry.name}
                              src={selectedCountry.flag}
                            ></Image>
                          </span>
                          <span>{selectedCountry.dialCode}</span>
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search country..." />
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup className="max-h-[300px] overflow-auto">
                          {countries.map((country) => (
                            <CommandItem
                              key={country.name}
                              value={country.name}
                              onSelect={() => {
                                setSelectedCountry(country);
                                setFormData((prev) => ({ ...prev, dialCode: country.dialCode }));
                              }}
                            >
                              <span className="flex items-center gap-2">
                                <span>
                                  <Image
                                    width={20}
                                    height={20}
                                    alt={country.name}
                                    src={country.flag}
                                  ></Image>
                                </span>
                                <span>{country.name}</span>
                                <span className="ml-auto text-muted-foreground">
                                  {country.dialCode}
                                </span>
                              </span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>

                {/* Password Requirements */}
                <div className="space-y-2 mt-2 text-sm">
                  <p
                    className={
                      validations.length
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  >
                    • At least 8 characters
                  </p>
                  <p
                    className={
                      validations.letter
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  >
                    • At least one letter
                  </p>
                  <p
                    className={
                      validations.number
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  >
                    • At least one number
                  </p>
                  <p
                    className={
                      validations.special
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  >
                    • At least one special character
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full" type="submit" disabled={disabled}>
              {isLoading ? <PulseLoader color="#000000" size={10} className="text-white" /> : "Create Account"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center text-black">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button">
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="outline" type="button">
                <Mail className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
