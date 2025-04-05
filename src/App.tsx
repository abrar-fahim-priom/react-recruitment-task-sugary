import { useEffect, useState } from "react";
import { fetchComplaints, saveComplaint } from "./Api/api";
import ComplaintForm from "./Components/ComplaintForm";
import ComplaintsList from "./Components/ComplaintsList";

function App() {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle complaint submission with smooth UI updates
  const handleSaveComplaint = async (formData) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const result = await saveComplaint(formData);

      // Instead of reloading all complaints, just add the new one to the state
      // This creates a smoother experience without refreshing the entire list
      setComplaints((prevComplaints) => [
        {
          Id: result.Id || Date.now(), // Use the returned ID or fallback to timestamp
          Title: formData.title,
          Body: formData.body,
        },
        ...prevComplaints, // Add new complaint at the top
      ]);

      return true;
    } catch (error) {
      console.error("Error saving complaint:", error);
      setErrorMessage(
        error.message || "Failed to submit complaint. Please try again."
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch complaints on component mount
  useEffect(() => {
    const controller = new AbortController();

    // Define the loading function directly in useEffect
    const loadComplaints = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const data = await fetchComplaints();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setErrorMessage("Failed to load complaints. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadComplaints();

    // Clean up when component unmounts
    return () => {
      controller.abort();
    };
  }, []); // Empty dependency array since we're only running on mount

  return (
    <div className="wrapper max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Submit a Complaint</h2>
      <ComplaintForm
        onSubmitSuccess={handleSaveComplaint}
        isSubmitting={isSubmitting}
        submitError={errorMessage}
      />
      <h2 className="text-2xl font-bold mt-8 mb-4">Complaints List</h2>
      {/* Global error message for fetch errors */}
      {errorMessage && !isSubmitting && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
      <ComplaintsList complaints={complaints} isLoading={isLoading} />
    </div>
  );
}

export default App;
