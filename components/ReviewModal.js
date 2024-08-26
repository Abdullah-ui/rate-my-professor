import { FaRegWindowClose } from "react-icons/fa";
import { firestore } from "@/firebase";

function ReviewModal({ closeModal }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-7/12 h-7/12 bg-slate-200 p-6 rounded-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Write a professor review</h3>
          <FaRegWindowClose
            className="cursor-pointer w-6 h-6 hover:fill-slate-500"
            onClick={() => closeModal(false)}
          />
        </div>
        <div className="flex justify-center">
<<<<<<< HEAD
          <form className="w-full p-3">
            <div className="mb-4">
              <label htmlFor="professor_name" className="mr-3">
                Professor name
              </label>
              <input
                id="professor_name"
                type="text"
                autoComplete="off"
                placeholder="First & Last"
                className="w-full p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="reviewContent">Review</label>
              <textarea
                id="reviewContent"
                autoComplete="off"
                placeholder="Include specifics!"
                className="w-full p-2 h-28 rounded resize-none align-top"
                style={{ verticalAlign: "top" }}
              ></textarea>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
=======
          <form>
            <label for="firstName">First Name</label>
            <input id="firstName" type="text" autoComplete="off"></input>
            <label for="lastName">Last Name</label>
            <input id="lastName" type="text" autoComplete="off"></input>
            <button type="submit" onClick={(e) => handleSubmit(e)}>
>>>>>>> 7f2340b9086c83ed99f124f09067517f7f274f56
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
