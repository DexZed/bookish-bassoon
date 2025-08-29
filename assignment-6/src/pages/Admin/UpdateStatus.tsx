import { useParams } from "react-router";
import InputLayout from "../../components/InputLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  StatusLogSchema,
  type StatusLogFields,
} from "../../interfaces/globalInterfaces";
import { showErrorAlert, showSuccessAlert } from "../../utilities/utils";
import { useUpdateStatusMutation } from "../../features/parcel/parcelApiSlice";

function UpdateStatus() {
  const { parcelId } = useParams();
  const [statusUpdate] = useUpdateStatusMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<StatusLogFields>({
    resolver: zodResolver(StatusLogSchema),
  });
  const onSubmit = async (data: StatusLogFields) => {
    try {
      await statusUpdate({ id: parcelId as string, body: data }).unwrap();
      showSuccessAlert("Success", "Parcel Status Updated successfully");
    } catch (error) {
      showErrorAlert("Error", "Something went wrong");
      setError("root", {
        type: "FormError",
        message: "Something went wrong",
      });
      console.error(error);
    }
  };

  return (
    <>
      <article className="h-dvh flex justify-center items-center flex-col gap-4">
        <h2 className="text-xl text-center font-bold">Update Status</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 card bg-base-200 border-base-300 rounded-box w-xs border p-4 "
        >
          <fieldset>
            <legend className="text-center text-gray-400">
              Status Log Update for: {parcelId}
            </legend>
            <InputLayout
              description="Status"
              errorDescription={errors.status && `${errors.status.message}`}
            >
              <input
                {...register("status")}
                type="text"
                placeholder="Status"
                className="invalid-status input input-primary"
                required
              />
            </InputLayout>
            <InputLayout
              description="Location"
              errorDescription={errors.location && `${errors.location.message}`}
            >
              <input
                {...register("location")}
                type="text"
                placeholder="Location"
                className="invalid-status input input-info"
                required
              />
            </InputLayout>
            <InputLayout
              description="Note"
              errorDescription={errors.note && `${errors.note.message}`}
            >
              <textarea
                {...register("note")}
                placeholder="Additional Note"
                className="invalid-status textarea textarea-primary"
                required
              />
            </InputLayout>
            <div className="mt-3 flex flex-col gap-2 justify-center items-center">
              <span className="text-amber-500 text-center">
                {errors.root?.message}
              </span>
              <button
                disabled={isSubmitting}
                className="btn btn-secondary w-full btn-outline rounded-2xl"
                type="submit"
              >
                {isSubmitting ? "Loading..." : "Update Status"}
              </button>
            </div>
          </fieldset>
        </form>
      </article>
    </>
  );
}

export default UpdateStatus;
