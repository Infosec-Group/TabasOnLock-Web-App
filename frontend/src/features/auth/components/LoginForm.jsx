import { useState } from "react";
import { loginSchema } from "../schemas/auth.schemas.js";
import { useNavigate } from "react-router";
import { useLogin } from "@/lib/auth.js";
import { paths } from "@/config/paths.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Label } from "../../../components/ui/label";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

export const LoginForm = () => {
  const navigate = useNavigate();
  const login = useLogin({
    onSuccess: () => navigate(() => paths.app.root.getHref())
  });
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

  const onSubmit = (data) => {
    login.mutate({
      email: data.email,
      password: data.password,
    })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
