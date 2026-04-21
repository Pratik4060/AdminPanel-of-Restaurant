import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";

export function Topbar() {
  const dispatch = useAppDispatch();

  return (
    <header className="sticky top-0 z-10 h-14 border-b border-[#e4ddd3] bg-white px-4 md:px-5 xl:px-6">
      <div className="mx-auto flex h-full w-full max-w-[1120px] items-center justify-end gap-4">
        <div className="text-right leading-4">
          <p className="text-[11px] font-medium text-[#2a2a2a]">Admin User</p>
          <p className="text-[10px] text-[#8b857c]">Admin</p>
        </div>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-[10px] font-semibold text-white">
          A
        </div>
        <button
          onClick={() => dispatch(logout())}
          className="rounded-md border border-[#f0dede] px-2.5 py-1.5 text-[11px] font-medium text-[#d45757] transition hover:bg-[#fff5f5]"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
