import { userSchema } from "@/schemas/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
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
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = () => {
    // Sign up logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="first_name" className="flex items-center">
          First Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="first_name"
          {...register("first_name")}
          placeholder="Juan"
          className={`${errors.first_name ? "border-destructive" : ""}`}
          required
        />

        {errors.first_name && (
          <span className="text-sm text-destructive">
            {errors.first_name.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="last_name" className="flex items-center">
          Last Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="last_name"
          {...register("last_name")}
          placeholder="Dela Cruz"
          className={`${errors.last_name ? "border-destructive" : ""}`}
          required
        />
        {errors.last_name && (
          <span className="text-sm text-destructive">
            {errors.last_name.message}
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
        <Label htmlFor="phone_number">
          Contact Number <span className="text-destructive">*</span>
        </Label>
        <Input
          id="phone_number"
          {...register("phone_number")}
          placeholder="+639123456789"
          className={`${errors.phone_number ? "border-destructive" : ""}`}
          required
        />
        {errors.phone_number && (
          <span className="text-sm text-destructive">
            {errors.phone_number.message}
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
        <Label htmlFor="confirm_password" className="flex items-center">
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            id="confirm_password"
            type={showPassword ? "text" : "password"}
            {...register("confirm_password")}
            placeholder="Confirm Password"
            className={`${errors.confirm_password ? "border-destructive" : ""}`}
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
        {errors.confirm_password && (
          <span className="text-sm text-destructive">
            {errors.confirm_password.message}
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
