// ComplaintsList.jsx - Component to display list of complaints

const ComplaintsList = ({ complaints, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (!complaints.length) {
    return <p className="text-gray-500 py-4">No complaints available.</p>;
  }

  return (
    <div className="complaints-list mt-4 space-y-4">
      {complaints.map((complaint) => (
        <div
          key={complaint.Id}
          className="complain-item p-4 border rounded-lg shadow-sm"
        >
          <h3 className="font-medium text-lg">{complaint.Title}</h3>
          <p className="text-gray-700 mt-2">{complaint.Body}</p>
        </div>
      ))}
    </div>
  );
};

export default ComplaintsList;
