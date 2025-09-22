import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { UserDashboard } from "@/lib/types";
import type { UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import actionMenu from "@/assets/images/icons/menu-admin-action.png";

export function UserActionsDropdown({
  user,
  toggleUserStatus,
  handleDeleteClick,
}: {
  user: UserDashboard;
  toggleUserStatus: UseMutationResult<void, AxiosError<unknown, unknown>, {
    id: number;
}, unknown>;
  handleDeleteClick: (user: { id: number; name: string }) => void;
}) {
  const { t } = useTranslation();

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button className="p-1 rounded-full transition">
          <img
            src={actionMenu}
            alt="action menu"
            className="bg-blue-50 w-8 rounded-full p-2 text-xs"
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="bottom"
          align="end"
          className="z-50 bg-white shadow-lg border rounded-md w-44 overflow-hidden animate-in fade-in slide-in-from-top-2"
        >
          <DropdownMenu.Item asChild>
            <Link
              to={`${user.id}`}
              className="px-4 py-2 hover:bg-gray-100 outline-none hover:outline-none cursor-pointer block"
            >
              {t("adminUser.View Profile")}
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onClick={() => toggleUserStatus.mutate({ id: user.id })}
            className={`px-4 py-2 hover:bg-gray-100 outline-none hover:outline-none cursor-pointer ${
              user.status === "Active" ? "text-red-900" : "text-blue-700"
            }`}
          >
            {toggleUserStatus.isPending &&
            toggleUserStatus.variables?.id === user.id ? (
              <span className="text-gray-500">{t("adminUser.Loading")}</span>
            ) : user.status === "Active" ? (
              t("adminUser.Block")
            ) : (
              t("adminUser.UnBlock")
            )}
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onClick={() => handleDeleteClick({ id: user.id, name: user.name })}
            className="px-4 py-2 text-red-600 hover:bg-red-50 outline-none hover:outline-none cursor-pointer"
          >
            {t("adminUser.Delete User")}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
