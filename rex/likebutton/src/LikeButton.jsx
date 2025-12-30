import { useState, useRef, useEffect } from 'react'
import './LikeButton.css'

export default function LikeButton({ initialCount = 0, size = 44, product = null, onAddToCart = null, onLike = null }) {
  const [count, setCount] = useState(initialCount)
  const [burst, setBurst] = useState(false)
  const [filled, setFilled] = useState(false)
  const [particles, setParticles] = useState([])

  const burstTimer = useRef(null)
  const fillTimer = useRef(null)
  const particlesTimer = useRef(null)

  useEffect(() => {
    return () => {
      if (burstTimer.current) clearTimeout(burstTimer.current)
      if (fillTimer.current) clearTimeout(fillTimer.current)
      if (particlesTimer.current) clearTimeout(particlesTimer.current)
    }
  }, [])

  // sync with external initialCount changes (e.g. parent updates rating)
  useEffect(() => {
    setCount(initialCount)
  }, [initialCount])

  function addLike() {
    // update internal count and notify consumer about the new value
    setCount((c) => {
      const nc = c + 1
      if (onLike && product) {
        try {
          onLike(product.id, nc)
        } catch (e) {}
      }
      return nc
    })

    // call cart handler if provided (backwards-compatible)
    if (onAddToCart && product) {
      try {
        onAddToCart(product)
      } catch (e) {
        // ignore errors from consumer
      }
    }

    // small UI states for animation
    setBurst(true)
    setFilled(true)

    if (burstTimer.current) clearTimeout(burstTimer.current)
    burstTimer.current = setTimeout(() => setBurst(false), 450)

    if (fillTimer.current) clearTimeout(fillTimer.current)
    fillTimer.current = setTimeout(() => setFilled(false), 650)

    // generate confetti particles
    const colors = ['#FF5A5F', '#FFB3C8', '#FFD67A', '#8BE9A5', '#7FB3FF']
    const countParticles = 10
    const newParticles = Array.from({ length: countParticles }).map(() => ({
      id: Math.random().toString(36).slice(2, 9),
      tx: `${(Math.random() * 120 - 60).toFixed(0)}px`,
      ty: `${-(Math.random() * 100 + 30).toFixed(0)}px`,
      rot: `${(Math.random() * 360).toFixed(0)}deg`,
      bg: colors[Math.floor(Math.random() * colors.length)],
      delay: `${(Math.random() * 180).toFixed(0)}ms`,
      size: `${(Math.random() * 6 + 6).toFixed(0)}px`
    }))

    setParticles(newParticles)
    if (particlesTimer.current) clearTimeout(particlesTimer.current)
    particlesTimer.current = setTimeout(() => setParticles([]), 900)
  }

  return (
    <button
      className={`like-button ${burst ? 'burst' : ''}`}
      onClick={addLike}
      aria-label={`Like — ${count} ${count === 1 ? 'like' : 'likes'}`}
      title={`${count} ${count === 1 ? 'like' : 'likes'}`}
      style={{ ['--btn-size']: `${size}px` }}
    >
      <span className={`icon ${burst ? 'pop' : ''}`} aria-hidden>
        <svg className={`heart-svg ${filled ? 'filled' : ''} ${burst ? 'pop' : ''}`} viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
          <path className="heart-shape" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h0.74C13.09 5.01 14.76 4 16.5 4 19.01 4 21 6 21 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </span>

      <span className={`count ${burst ? 'bump' : ''}`}>{count}</span>

      {/* confetti particles */}
      <div className="particles" aria-hidden>
        {particles.map((p) => (
          <i
            key={p.id}
            className="confetti"
            style={{
              ['--tx']: p.tx,
              ['--ty']: p.ty,
              ['--rot']: p.rot,
              ['--bg']: p.bg,
              ['--delay']: p.delay,
              width: p.size,
              height: p.size
            }}
          />
        ))}
      </div>

      <span className="sr-only" aria-live="polite">
        {count} {count === 1 ? 'like' : 'likes'}
      </span>
    </button>
  )
}
