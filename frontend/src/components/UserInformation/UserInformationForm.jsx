import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "../ui/label"
import { userInfoSchema } from "../../schemas/schemas";
import { Input } from "../ui/input";

export const UserInformationForm = () => {
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
  }

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="first_name" className="flex items-center font-medium">
          First Name
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
        {errors.job_name && (
          <span className="text-sm text-destructive">
            {errors.first_name.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="last_name" className="flex items-center font-medium">
          Last Name
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
        {errors.job_name && (
          <span className="text-sm text-destructive">
            {errors.last_name.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone_number" className="flex items-center font-medium">
          Phone Number
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
        {errors.job_name && (
          <span className="text-sm text-destructive">
            {errors.phone_number.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center font-medium">
          Email Address
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
        {errors.job_name && (
          <span className="text-sm text-destructive">
            {errors.email.message}
          </span>
        )}
      </div>
    </>
  );
}
