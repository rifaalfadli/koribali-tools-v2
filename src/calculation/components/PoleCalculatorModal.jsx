import { AlertCircle, X } from "lucide-react";
import { CoverInput } from "./CoverInput";

export const CoverInputModal = ({
  open,
  onClose,
  cover,
  onUpdateCover,
  onMakeReport,
  coverErrors,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl mx-4 overflow-hidden animate-fadeIn">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#0d3b66] to-[#3399cc] p-4 flex items-center justify-between">
          <div className="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20">
            <h2 className="text-white font-bold text-[16px]">
              Cover Information
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          <CoverInput
            cover={cover}
            onUpdate={onUpdateCover}
            onMake={onMakeReport}
            errors={coverErrors}
          />
        </div>
      </div>
    </div>
  );
};

// Reset All Confirmation Modal
export const ConfirmResetAllModal = ({
  confirmResetAll,
  onClose,
  handleDeleteReport,
}) => {
  if (!confirmResetAll) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>

        {/* Title */}
        <h2 className="text-gray-900 text-center mb-2">Reset All Data?</h2>

        {/* Description */}
        <p className="text-gray-600 text-center mb-6">
          This will remove all form inputs and all calculation results. This
          action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              handleDeleteReport();
              onClose();
            }}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
export const ConfirmDeletePoleModal = ({
  confirmDelete,
  onClose,
  handleRemoveSection,
}) => {
  if (!confirmDelete) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>

        {/* Title */}
        <h2 className="text-gray-900 text-center mb-2">Delete Step?</h2>

        {/* Description */}
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete this step? This action cannot be
          undone.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              handleRemoveSection();
              onClose();
            }}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
export const ConfirmDeleteDoModal = ({
  confirmDelete,
  onClose,
  handleRemoveDo,
}) => {
  if (!confirmDelete) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>

        {/* Title */}
        <h2 className="text-gray-900 text-center mb-2">Delete Object?</h2>

        {/* Description */}
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete this object? This action cannot be
          undone.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              handleRemoveDo();
              onClose();
            }}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export const ConfirmReduceDoModal = ({
  confirmReduceDo,
  cancelReduceDirectObjects,
  confirmReduceDirectObjects,
}) => {
  if (!confirmReduceDo) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>

        {/* Title */}
        <h2 className="text-gray-900 text-center mb-2">
          Reduce Direct Objects?
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-center mb-6">
          You are about to reduce Direct Objects from{" "}
          <strong>{confirmReduceDo.from}</strong> to{" "}
          <strong>{confirmReduceDo.to}</strong>. The last objects will be
          permanently removed.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={cancelReduceDirectObjects}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={confirmReduceDirectObjects}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
export const ConfirmDeleteOhwModal = ({
  confirmDelete,
  onClose,
  handleRemoveOhw,
}) => {
  if (!confirmDelete) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>

        {/* Title */}
        <h2 className="text-gray-900 text-center mb-2">
          Delete Overhead Wire?
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete this overhead wire? This action cannot
          be undone.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              handleRemoveOhw();
              onClose();
            }}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export const ConfirmReduceOhwModal = ({
  confirmReduceOhw,
  cancelReduceOverheadWires,
  confirmReduceOverheadWires,
}) => {
  if (!confirmReduceOhw) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>

        {/* Title */}
        <h2 className="text-gray-900 text-center mb-2">
          Reduce Overhead Wire?
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-center mb-6">
          You are about to reduce Overhead Wires from{" "}
          <strong>{confirmReduceOhw.from}</strong> to{" "}
          <strong>{confirmReduceOhw.to}</strong>. The last Overhead Wires will
          be permanently removed.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={cancelReduceOverheadWires}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={confirmReduceOverheadWires}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast Modal
export const ToastModal = ({ toast, onClose }) => {
  if (!toast) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] max-w-fit mx-4 p-7 transform transition-all duration-300 ease-in-out scale-95 animate-fadeIn">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-50 text-yellow-500 border border-yellow-300 flex-shrink-0">
            <AlertCircle className="w-7 h-7" />
          </div>
          <p className="text-gray-700 text-[16px] font-medium whitespace-nowrap">
            {toast.message}
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg bg-blue-50 border border-blue-500 text-blue-700 
                hover:bg-blue-100 font-semibold text-sm transition-all shadow-sm active:scale-95"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
