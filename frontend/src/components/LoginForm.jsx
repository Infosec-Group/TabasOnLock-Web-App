import { loginSchema } from "@/schemas/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    // Login Logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center">
          <Mail className="w-4 h-4 mr-2" />
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="example@email.com"
          className={`${errors.email ? "border-destructive" : ""}`}
          required
        />
        {errors.email && (
          <span className="text-sm text-destructive">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="flex items-center">
          <Lock className="w-4 h-4 mr-2" />
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
      
      <Button 
        type="submit"
        className="w-full h-12 bg-rose-700 hover:bg-rose-600" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Logging In...
          </>
        ) : (
          <>Log In</>
        )}
      </Button>
    </form>
  );
};
