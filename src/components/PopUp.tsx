interface ChildProps {
  foodId?: string;
  onConfirm: (id: string | undefined) => void;
  onClose: () => void;
}

const PopUp = ({ foodId, onConfirm, onClose }: ChildProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 space-y-4 text-center">
        <span className="text-4xl">⚠️</span>

        <div className="text-lg font-semibold">Delete Item?</div>

        <div className="text-sm text-gray-600">
          This will permanently delete the item. Are you sure you want to
          continue?
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
          <button
            onClick={() => onConfirm(foodId)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 w-full sm:w-auto"
          >
            Yes
          </button>

          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 w-full sm:w-auto"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
