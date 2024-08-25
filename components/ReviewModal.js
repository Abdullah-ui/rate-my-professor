import { FaRegWindowClose } from "react-icons/fa";

function ReviewModal({ closeModal }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-7/12 h-7/12 bg-slate-200 p-6 rounded-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Create a review</h3>
          <FaRegWindowClose
            className="cursor-pointer w-6 h-6 hover:fill-slate-500"
            onClick={() => closeModal(false)}
          />
        </div>
        <div className="flex justify-center">
          <form>
            <label for="firstName">First Name</label>
            <input id="firstName" type="text" autoComplete="off"></input>
            <label for="lastName">Last Name</label>
            <input id="lastName" type="text" autoComplete="off"></input>
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
