import React, { useState } from 'react'
import NextImage from 'next/image'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
  fill?: boolean
  sizes?: string
  priority?: boolean
  quality?: number
  loading?: 'lazy' | 'eager'
  onError?: () => void
  onLoad?: () => void
  [key: string]: any
}

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    setDidError(true)
    setIsLoading(false)
    props.onError?.()
  }

  const handleLoad = () => {
    setIsLoading(false)
    props.onLoad?.()
  }

  const { 
    src, 
    alt, 
    style, 
    className, 
    fill, 
    sizes, 
    priority, 
    quality = 75,
    loading = 'lazy',
    onError,
    onLoad,
    ...rest 
  } = props

  // Optimizar la URL para WebP
  const optimizedSrc = src.includes('.webp') ? src : src.replace(/\.(jpg|jpeg|png)$/i, '.webp')

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
      role="img"
      aria-label={`Error al cargar imagen: ${alt}`}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" data-original-url={src} />
      </div>
    </div>
  ) : (
    <div className="relative">
      {/* Skeleton loading */}
      {isLoading && (
        <div 
          className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`}
          style={fill ? { position: 'absolute', inset: 0 } : {}}
        >
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        </div>
      )}
      
      <NextImage 
        src={optimizedSrc} 
        alt={alt} 
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={style} 
        fill={fill}
        sizes={sizes}
        priority={priority}
        quality={quality}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        {...rest} 
      />
    </div>
  )
}
