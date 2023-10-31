import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import React Icons

interface Props {
  currentPage: number;
  setCurrentPage: (index: number) => void;
  totalPages: number;
}

const Pagination = ({ currentPage, setCurrentPage, totalPages }: Props) => {
  const handlePageChange = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      setCurrentPage(pageIndex);
    }
  };

  if (totalPages < 2) {
    return <div></div>;
  }
  return (
    <div className="flex items-center justify-center mt-8 xl:mt-12 space-x-2">
      <a
        href="#scroll"
        onClick={() => handlePageChange(currentPage - 1)}
        className={`w-12 h-12 rounded-full flex items-center justify-center`}
      >
        <FaChevronLeft
          className={currentPage === 0 ? "text-gray-400" : "text-primaryColor"}
          size={25}
        />
      </a>

      <button
        className={`w-12 h-12 rounded-full flex items-center justify-center text-base`}
        style={{
          background:
            "linear-gradient(108.74deg, rgba(192, 209, 235, 0.126) 0%, rgba(255, 255, 255, 0.54) 33.33%, rgba(255, 255, 255, 0.3) 66.67%, rgba(192, 209, 235, 0.324) 100%), linear-gradient(108.74deg, rgba(216, 218, 229, 0.24) 0%, rgba(215, 216, 219, 0.06) 100%)",
        }}
        disabled={currentPage === totalPages - 1}
      >
        {currentPage + 1}/{totalPages}
      </button>

      <a
        href="#scroll"
        onClick={() => handlePageChange(currentPage + 1)}
        className={`w-12 h-12 rounded-full flex items-center justify-center`}
      >
        <FaChevronRight
          className={
            currentPage === totalPages - 1
              ? "text-gray-400"
              : "text-primaryColor"
          }
          size={25}
        />
      </a>
    </div>
  );
};

export default Pagination;
