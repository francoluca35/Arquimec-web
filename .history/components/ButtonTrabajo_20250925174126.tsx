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
      className={`${className}`}
      style={{
        fontWeight: 400,
        letterSpacing: "0.1em",
        borderColor: "#000000",
        borderWidth: "2px",
        borderStyle: "solid",
        color: "#111827",
        padding: "10px 24px",
        borderRadius: "12px",
        fontSize: "12px",
        letterSpacing: "0.1em",
        transition: "all 0.3s ease"
      }}
    >
      {children}
    </Button>
  )
}

export default ButtonTrabajo
