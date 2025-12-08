import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { paths } from "@/config/paths";
import { useBookingStore } from "@/stores/useBookingStore";
import { Label } from "@/components/ui/label";
import { userInfoSchema } from "@/schemas/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";

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
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    },
  });

  const onSubmit = async (userData) => {
    // Refactor once backend is finish

    console.log("Submitted:", userData);
    await new Promise((resolve) => setTimeout(resolve, 500));

    reset();

    setUserInfo(userData);
    navigate(paths.app.reservation.getHref());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="firstName" className="flex items-center font-medium">
          First Name <span className="text-destructive">*</span>
        </Label>
        <Input
          {...register("firstName")}
          id="firstName"
          type="text"
          placeholder="Enter your first name"
          className={`bg-input ${
            errors.firstName ? "border-destructive" : ""
          }`}
        />
        {errors.firstName && (
          <span className="text-sm text-destructive">
            {errors.firstName.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName" className="flex items-center font-medium">
          Last Name <span className="text-destructive">*</span>
        </Label>
        <Input
          {...register("lastName")}
          id="lastName"
          type="text"
          placeholder="Enter your last name"
          className={`bg-input ${errors.lastName ? "border-destructive" : ""}`}
        />
        {errors.lastName && (
          <span className="text-sm text-destructive">
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber" className="flex items-center font-medium">
          Phone Number <span className="text-destructive">*</span>
        </Label>
        <Input
          {...register("phoneNumber")}
          id="phoneNumber"
          type="tel"
          placeholder="09123456789"
          className={`bg-input ${
            errors.phoneNumber ? "border-destructive" : ""
          }`}
        />
        {errors.phoneNumber && (
          <span className="text-sm text-destructive">
            {errors.phoneNumber.message}
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
          className={`bg-input ${errors.email ? "border-destructive" : ""}`}
        />
        {errors.email && (
          <span className="text-sm text-destructive">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="flex space-x-4 pt-6">
        <Link to={paths.app.stylists.getHref()} className="flex-1">
          <Button variant="outline" className="h-12 w-full">
            Cancel
          </Button>
        </Link>

        <Button className="flex-1 h-12">Confirm</Button>
      </div>
    </form>
  );
};
