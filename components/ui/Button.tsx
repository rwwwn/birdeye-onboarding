import React from 'react'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'yellow'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  fullWidth?: boolean
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-navy text-white hover:bg-opacity-90 focus:ring-2 focus:ring-navy focus:ring-offset-2',
  secondary:
    'bg-white text-navy border border-gray hover:border-navy focus:ring-2 focus:ring-navy focus:ring-offset-2',
  outline:
    'bg-transparent text-navy border border-navy hover:bg-navy hover:text-white focus:ring-2 focus:ring-navy focus:ring-offset-2',
  yellow:
    'bg-yellow text-navy hover:bg-opacity-90 focus:ring-2 focus:ring-yellow focus:ring-offset-2',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  fullWidth = false,
}: ButtonProps) {
  const baseClasses = `inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
      {children}
    </button>
  )
}
