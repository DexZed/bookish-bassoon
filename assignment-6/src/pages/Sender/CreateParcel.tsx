import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import InputLayout from "../../components/InputLayout";
import SelectorLayout from "../../components/SelectorLayout";
import {
  ParcelSchema,
  type ParcelData,
  type ParcelFields,
  type User,
} from "../../interfaces/globalInterfaces";
import { useAppSelector } from "../../features/app/hooks";
import axios from "axios";
import { useAddSenderParcelMutation } from "../../features/sender/senderApiSlice";
import { showErrorAlert, showSuccessAlert } from "../../utilities/utils";

function CreateParcels() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ParcelFields>({
    resolver: zodResolver(ParcelSchema),
  });
  const [addParcel]  = useAddSenderParcelMutation();
  const selector = useAppSelector((state) => state.auth);
  const onSubmit: SubmitHandler<ParcelFields> = async (data) => {
    const receiverData = await fetchUser(data.receiver);
    const parcelData: Partial<ParcelData> = {
      ...data,
      sender: selector.id as string,
      receiver: receiverData?._id as string,
    };

    try {
      await addParcel(parcelData).unwrap();
      showSuccessAlert("Success","Parcel created successfully");
    } catch (error) {
      console.error(error);
      showErrorAlert("Error","Something went wrong");
      setError("root", {
        type: "FormError",
        message: "Something went wrong",
      });
      console.error(error);
    }
  };
  async function fetchUser(email: string): Promise<User | null> {
    try {
      const response = await axios.get<{ message: string; user: User }>(
        `http://localhost:3000/user/${email}`
      );
      return response.data.user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  return (
    <>
      <div className="h-dvh flex justify-center items-center flex-col gap-4">
        <h1 className="text-3xl font-bold">Create Parcel</h1>
        <form
          className="space-y-2 card bg-base-200 border-base-300 rounded-box w-xs border p-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputLayout
            description="Receiver Email"
            errorDescription={errors.receiver && `${errors.receiver?.message}`}
          >
            <input
              {...register("receiver")}
              type="email"
              className="input input-primary"
              placeholder="Receiver"
              required
            />
          </InputLayout>
          <SelectorLayout
            description="Type"
            errorDescription={errors.type && `${errors.type?.message}`}
          >
            <select
              {...register("type")}
              className="select select-primary w-full"
              required
            >
              <option disabled>Select Package Type</option>
              <option value={"Document"}>Document</option>
              <option value={"Box"}>Box</option>
              <option value={"Fragile"}>Fragile</option>
              <option value={"Other"}>Other</option>
            </select>
          </SelectorLayout>
          <InputLayout
            description="Weight kg"
            errorDescription={errors.weight && `${errors.weight?.message}`}
          >
            <input
              {...register("weight", { valueAsNumber: true })}
              type="number"
              className="input input-info"
              placeholder="84 kg"
              required
              min={0}
            />
          </InputLayout>
          <InputLayout
            description="Pickup Address"
            errorDescription={
              errors.pickupAddress && `${errors.pickupAddress?.message}`
            }
          >
            <input
              {...register("pickupAddress")}
              type="text"
              className="input input-accent"
              placeholder="1234 Main St, Anytown, USA"
              required
            />
          </InputLayout>
          <InputLayout
            description="Delivery Address"
            errorDescription={
              errors.deliveryAddress && `${errors.deliveryAddress?.message}`
            }
          >
            <input
              {...register("deliveryAddress")}
              type="text"
              className="input input-warning"
              placeholder="4567 Elm St, Anytown, USA"
              required
            />
          </InputLayout>
          <InputLayout
            description="Fee"
            errorDescription={errors.fee && `${errors.fee?.message}`}
          >
            <input
              {...register("fee", { valueAsNumber: true })}
              type="number"
              className="input input-success"
              placeholder="$10"
              required
              min={0}
            />
          </InputLayout>
          <InputLayout
            description="Delivery Date"
            errorDescription={
              errors.deliveryDate && `${errors.deliveryDate?.message}`
            }
          >
            <input
              {...register("deliveryDate", { valueAsDate: true })}
              type="date"
              className="input input-secondary"
              placeholder="dd/mm/yyyy"
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </InputLayout>
          <div className="mt-3">
            <button
              disabled={isSubmitting}
              className="btn btn-accent w-full btn-outline rounded-2xl"
              type="submit"
            >
              {isSubmitting ? "Loading..." : "Create Parcel"}
            </button>
            <span className="text-amber-500">{errors.root?.message}</span>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateParcels;
