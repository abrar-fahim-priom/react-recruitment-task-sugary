// ComplaintForm.jsx - Form component for submitting complaints

import { useForm } from "react-hook-form";
import Field from "./Common/Field";

const ComplaintForm = ({ onSubmitSuccess, isSubmitting, submitError }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const success = await onSubmitSuccess(data);
    if (success) {
      reset(); // Reset form after successful submission
    }
  };

  return (
    <div className="complain-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field label="Title" error={errors.title}>
          <input
            id="title"
            type="text"
            placeholder="Title"
            {...register("title", {
              required: "Title is required",
            })}
            className="w-full pl-3 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </Field>
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}

        <Field label="Complaint" error={errors.body}>
          <textarea
            id="body"
            placeholder="Enter your complaint"
            {...register("body", {
              required: "Complaint text is required",
              minLength: {
                value: 10,
                message: "Please provide at least 10 characters",
              },
            })}
            className="w-full pl-3 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 mt-2"
            rows={4}
          />
        </Field>
        {errors.body && (
          <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:bg-blue-300"
        >
          {isSubmitting ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>

      {submitError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {submitError}
        </div>
      )}
    </div>
  );
};

export default ComplaintForm;
