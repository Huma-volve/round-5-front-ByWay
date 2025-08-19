import { useState } from "react";
import searchIcon from "@/assets/images/icons/search-admin.png";
import actionMenu from "@/assets/images/icons/menu-admin-action.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFetchUserDashboard } from "@/hooks/AdminDashboard/useFetchUserDashborad";
import ErrorDesign from "@/components/AdminDashboard/UserManagement/ErrorDesign";
import LoadingDesign from "@/components/AdminDashboard/UserManagement/LoadingDesign";
import { useDeleteUser } from "@/hooks/AdminDashboard/useDeleteUser";

export default function UserManagementPage() {
  const { data, error, isLoading, isError } = useFetchUserDashboard();
  const { t } = useTranslation();
  const [openRow, setOpenRow] = useState<number | string>("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ id: number; name: string } | null>(null);

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const handleDeleteClick = (user: { id: number; name: string }) => {
    setSelectedUser(user);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id, {
        onSuccess: () => {
          setShowConfirm(false);
          setSelectedUser(null);
        },
      });
    }
  };

  if (isLoading) return <LoadingDesign />;
  if (isError) return <ErrorDesign message={error?.message} />;

  return (
    <div>
      {/* header */}
      <div className="flex flex-col gap-2 w-full mt-12">
        <h1 className="md:text-3xl text-[#2C4E80] font-bold">
          {t("adminUser.User Management")}
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          {t("adminUser.Manage all registered users including learners and instructors")}
        </p>
      </div>

      {/* search */}
      <div className="w-full md:w-[60%] border mt-8 border-gray-300 rounded-lg shadow-sm bg-white">
        <div className="flex items-center gap-2 p-3">
          <img src={searchIcon} alt="search Icon" className="w-5 h-5" />
          <input
            type="text"
            className="w-full outline-none border-none text-sm md:text-base placeholder-gray-400"
            placeholder={t("adminUser.Search by name or email...")}
          />
        </div>
      </div>

      {/* table */}
      <div className="w-full mt-8 mb-12 overflow-x-auto rounded-lg shadow-sm border border-gray-200 relative">
        {data && data.length > 0 ? (
          <table className="w-full min-w-[700px] table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr className="text-left rtl:text-right text-sm text-[#2C4E80]">
                <th className="px-4 py-3">{t("adminUser.Name")}</th>
                <th className="px-4 py-3">{t("adminUser.Email")}</th>
                <th className="px-4 py-3">{t("adminUser.Role")}</th>
                <th className="px-4 py-3">{t("adminUser.Status")}</th>
                <th className="px-4 py-3">{t("adminUser.Date")}</th>
                <th className="px-4 py-3">{t("adminUser.Actions")}</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {data.map((his, index) => {
                const isLastThree = index >= data.length - 3;
                return (
                  <tr
                    key={his.id}
                    className="bg-white text-left rtl:text-right hover:bg-gray-50 transition-colors relative"
                  >
                    <td className="px-4 py-3 text-gray-800 text-sm">{his.name}</td>
                    <td className="px-4 py-3 text-indigo-600 font-medium text-sm">
                      {his.email}
                    </td>
                    <td className="px-4 py-3 text-sm">{his.role}</td>
                    <td
                      className={`px-4 py-3 text-sm ${
                        his.status === "Blocked"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {his.status}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {his.created_at.slice(0, 10)}
                    </td>
                    <td className="px-4 py-3 relative">
                      <button
                        onClick={() =>
                          setOpenRow(openRow === his.id ? "" : his.id)
                        }
                        className="p-1 hover:bg-gray-100 rounded-full transition relative z-10"
                      >
                        <img
                          src={actionMenu}
                          alt="action menu"
                          className="bg-blue-50 w-8 rounded-full p-2 text-xs"
                        />
                      </button>

                      {/* Dropdown menu */}
                      {openRow === his.id && (
                        <div
                          className={`absolute z-50 bg-white shadow-lg border rounded-md w-44 
                                      ${isLastThree ? "bottom-full mb-2" : "top-full mt-2"} 
                                      right-0`}
                        >
                          <ul className="flex flex-col text-sm">
                            <Link to={`${his.id}`}>
                              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
                                {t("adminUser.View Profile")}
                              </li>
                            </Link>
                            <li
                              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                                his.status === "Active"
                                  ? "text-red-900"
                                  : "text-blue-700"
                              }`}
                            >
                              {his.status === "Active"
                                ? t("adminUser.Block")
                                : t("adminUser.UnBlock")}
                            </li>
                            <li
                              onClick={() => handleDeleteClick({ id: his.id, name: his.name })}
                              className="px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer"
                            >
                              {t("adminUser.Delete User")}
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="w-full p-8 text-center text-gray-500">
            {t("adminUser.No users found")}
          </div>
        )}
      </div>

      {/* Confirm Delete Modal */}
      {showConfirm && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-800">
              {t("adminUser.Confirm Delete")}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {t("adminUser.Are you sure you want to delete")}{" "}
              <span className="font-medium">{selectedUser.name}</span>?
            </p>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                {t("adminUser.Cancel")}
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? t("adminUser.Deleting...") : t("adminUser.Delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
