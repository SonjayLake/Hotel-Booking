import { useForm } from "react-hook-form";
import { UserType } from "../../../../backend/src/shared/types";

type Props = {
  currentUser: UserType;
};

type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

function BookingForm({ currentUser }: Props) {
  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    },
  });
  return (
    <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
      <span className="text-3-xl font-bold">Confirm your details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-grey-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-grey-700 bg-grey-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-grey-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-grey-700 bg-grey-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-grey-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-grey-700 bg-grey-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>
    </form>
  );
}

export default BookingForm;
