import { Bell } from "lucide-react"
import clsx from "clsx"

type Props = {
  count?: number
  onClick?: () => void
  className?: string
  iconSize?: number
  showZero?: boolean
  ariaLabel?: string
}

export default function BellWithBadge({
  count = 0,
  onClick,
  className,
  iconSize = 22,
  showZero = false,
  ariaLabel = "Notifications",
}: Props) {
  const showBadge = showZero ? count >= 0 : count > 0
  const label = count > 0 ? `${ariaLabel}: ${count} new` : ariaLabel

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={clsx(
        "relative flex items-center justify-center",
        "hover:bg-muted/60 rounded-full focus:outline-none",
        className
      )}
      style={{ lineHeight: 0 }} // Ensures no vertical alignment quirks
    >
      <Bell aria-hidden="true" width={iconSize} height={iconSize} className="stroke-yellow-500"/>
      {showBadge && (
        <span
          className={clsx(
            "absolute top-0 right-0 translate-x-1/3 -translate-y-1/3",
            "min-w-[18px] h-[18px] rounded-full text-[10px] leading-[18px] font-medium",
            "px-1 text-white bg-red-600 flex items-center justify-center"
          )}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  )
}
