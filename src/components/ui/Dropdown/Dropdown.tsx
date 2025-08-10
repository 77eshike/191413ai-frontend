import React, { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'

export interface DropdownOption {
  label: string
  value: string
}

export interface DropdownProps {
  options: DropdownOption[]
  selected?: string
  onSelect: (value: string) => void
  placeholder?: string
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  onSelect,
  placeholder = '请选择',
}) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (value: string) => {
    onSelect(value)
    setOpen(false)
  }

  return (
    <div className="relative inline-block w-48" ref={dropdownRef}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className="w-full px-4 py-2 text-left bg-white border rounded shadow"
      >
        {options.find(opt => opt.value === selected)?.label || placeholder}
      </button>
      {open && (
        <ul className="absolute z-10 w-full mt-2 bg-white border rounded shadow">
          {options.map(opt => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={clsx(
                'px-4 py-2 cursor-pointer hover:bg-gray-100',
                selected === opt.value && 'bg-gray-100 font-bold',
              )}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
