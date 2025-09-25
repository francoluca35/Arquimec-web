import React from 'react'
import { Button } from './ui/button'

interface ButtonTrabajoProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive'
}

const ButtonTrabajo: React.FC<ButtonTrabajoProps> = ({
  children,
  onClick,
  className = '',
  variant = 'outline'
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={`border-2 border-black text-gray-900 hover:border-amber-400 hover:text-black px-6 py-2.5 rounded-xl text-xs tracking-wider transition-all duration-300 ${className}`}
      style={{
        fontWeight: 400,
        letterSpacing: "0.1em",
        borderColor: "#000000",
        borderWidth: "2px",
        borderStyle: "solid"
      }}
    >
      {children}
    </Button>
  )
}

export default ButtonTrabajo
