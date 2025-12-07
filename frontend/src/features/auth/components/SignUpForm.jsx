import { userSchema } from "../schemas/auth.schemas.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    // Sign up logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="firstName" className="flex items-center">
          First Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="firstName"
          {...register("firstName")}
          placeholder="Juan"
          className={`${errors.firstName ? "border-destructive" : ""}`}
          required
        />

        {errors.firstName && (
          <span className="text-sm text-destructive">
            {errors.firstName.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName" className="flex items-center">
          Last Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="lastName"
          {...register("lastName")}
          placeholder="Dela Cruz"
          className={`${errors.lastName ? "border-destructive" : ""}`}
          required
        />
        {errors.lastName && (
          <span className="text-sm text-destructive">
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email Address <span className="text-destructive">*</span>
        </Label>
        <Input
          type="email"
          id="email"
          {...register("email")}
          placeholder="example@email.com"
          className={`${
            errors.email ? "border-destructive" : ""
          }`}
          required
        />
        {errors.email && (
          <span className="text-sm text-destructive">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">
          Contact Number <span className="text-destructive">*</span>
        </Label>
        <Input
          id="phoneNumber"
          {...register("phoneNumber")}
          placeholder="+639123456789"
          className={`${errors.phoneNumber ? "border-destructive" : ""}`}
          required
        />
        {errors.phoneNumber && (
          <span className="text-sm text-destructive">
            {errors.phoneNumber.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="flex items-center">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Enter Password"
            className={`${errors.password ? "border-destructive" : ""}`}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-0.5 px-3 hover:bg-transparent hover:text-primary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
        {errors.password && (
          <span className="text-sm text-destructive">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="flex items-center">
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className={`${errors.confirmPassword ? "border-destructive" : ""}`}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-0.5 px-3 hover:bg-transparent hover:text-primary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
        {errors.confirmPassword && (
          <span className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <Button 
        type="submit"
        className="w-full h-12 bg-rose-700 hover:bg-rose-600" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Signing up...
          </>
        ) : (
          <>Sign Up</>
        )}
      </Button>
    </form>
  );
};
