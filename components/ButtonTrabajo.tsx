import React, { useState } from 'react'
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
  const [isHovered, setIsHovered] = useState(false)
  return (
    <Button
      variant={variant}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${className}`}
      style={{
        fontWeight: 400,
        letterSpacing: "0.1em",
        backgroundColor: 'transparent',
        borderColor: isHovered ? "#fbbf24" : "#F1F1F1", // amber-400 en hover, BLANCO normal
        borderWidth: "2px",
        borderStyle: "solid",
        color: isHovered ? "#fbbf24" : "#F1F1F1", // BLANCO en hover, gray-900 normal
        padding: "10px 24px",
        borderRadius: "12px",
        fontSize: "12px",
        transition: "all 0.3s ease"
      }}
    >
      {children}
    </Button>
  )
}

export default ButtonTrabajo
