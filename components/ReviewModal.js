import { FaRegWindowClose } from "react-icons/fa";
import { firestore } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

function ReviewModal({ closeModal }) {
  const [professorName, setProfessorName] = useState("");
  const [reviewContent, setReviewContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(firestore, "reviews"), {
        professorName: professorName,
        reviewContent: reviewContent,
        date: new Date().toDateString(),
      });
    } catch (err) {
      console.error(err);
    }
    closeModal(false);
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
          <form className="w-full p-3" onSubmit={handleSubmit}>
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
                value={professorName}
                onChange={(e) => setProfessorName(e.target.value)}
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
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
