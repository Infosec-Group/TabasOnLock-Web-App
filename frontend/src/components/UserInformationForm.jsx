import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "./ui/label";
import { userInfoSchema } from "../schemas/schemas";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router";
import { paths } from "../config/paths";
import { useBookingStore } from "@/stores/useBookingStore";

export const UserInformationForm = () => {
  const navigate = useNavigate();
  const setUserInfo = useBookingStore((state) => state.setUserInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userInfoSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
    }
  });

  const onSubmit = async (userData) => {
    // Refactor once backend is finish

    console.log("Submitted:", userData);
    await new Promise((resolve) => setTimeout(resolve, 500));

    reset();

    // setUserInfo(userData);
    navigate(paths.app.reservation.getHref());
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="first_name" className="flex items-center font-medium">
          First Name <span className="text-destructive">*</span>
        </Label>
        <Input 
          {...register("first_name")}
          id="first_name"
          type="text"
          placeholder="Enter your first name"
          className={`bg-input ${
            errors.first_name ? "border-destructive" : ""
          }`}
        />
        {errors.first_name && (
          <span className="text-sm text-destructive">
            {errors.first_name.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="last_name" className="flex items-center font-medium">
          Last Name <span className="text-destructive">*</span>
        </Label>
        <Input 
          {...register("last_name")}
          id="last_name"
          type="text"
          placeholder="Enter your last name"
          className={`bg-input ${
            errors.last_name ? "border-destructive" : ""
          }`}
        />
        {errors.last_name && (
          <span className="text-sm text-destructive">
            {errors.last_name.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone_number" className="flex items-center font-medium">
          Phone Number <span className="text-destructive">*</span>
        </Label>
        <Input 
          {...register("phone_number")}
          id="phone_number"
          type="tel"
          placeholder="09123456789"
          className={`bg-input ${
            errors.phone_number ? "border-destructive" : ""
          }`}
        />
        {errors.phone_number && (
          <span className="text-sm text-destructive">
            {errors.phone_number.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center font-medium">
          Email Address <span className="text-destructive">*</span>
        </Label>
        <Input 
          {...register("email")}
          id="email"
          type="email"
          placeholder="example@email.com"
          className={`bg-input ${
            errors.email ? "border-destructive" : ""
          }`}
        />
        {errors.email && (
          <span className="text-sm text-destructive">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="flex space-x-4 pt-6">
        <Button
          variant="outline"
          className="flex-1 h-12"
        >
          <Link to={paths.app.stylists.getHref()}>
            Cancel
          </Link>
        </Button>
        <Button className="flex-1 h-12">
          Confirm
        </Button>
      </div>
    </form>
  );
}
