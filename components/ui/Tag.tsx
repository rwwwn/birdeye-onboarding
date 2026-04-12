interface TagProps {
  label: string
  selected?: boolean
  onClick?: () => void
}

export default function Tag({ label, selected = false, onClick }: TagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-1
        ${
          selected
            ? 'bg-navy text-white border-navy'
            : 'bg-white text-navy border-gray hover:border-purple'
        }`}
    >
      {label}
    </button>
  )
}
