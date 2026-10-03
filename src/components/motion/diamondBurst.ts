/**
 * A short burst of gold diamonds and sparkles from the centre of `origin`, drawn on a temporary
 * full-viewport canvas that removes itself when the last particle fades. Does nothing under
 * prefers-reduced-motion.
 */
export function diamondBurst(origin: Element) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const canvas = document.createElement("canvas")
    canvas.setAttribute("aria-hidden", "true")
    Object.assign(canvas.style, {
        position: "fixed",
        inset: "0",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: "90",
    })
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    ctx.scale(dpr, dpr)
    document.body.append(canvas)

    const rect = origin.getBoundingClientRect()
    const particles = Array.from({ length: 44 }, (_, i) =>
        makeParticle(rect, i % 4 === 0)
    )

    let last = performance.now()
    const tick = (now: number) => {
        const dt = Math.min((now - last) / 1000, 1 / 30)
        last = now
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        let alive = 0
        for (const p of particles) {
            p.age += dt
            if (p.age >= p.ttl) continue
            alive++
            const drag = Math.exp(-2.4 * dt)
            p.vx *= drag
            p.vy = p.vy * drag + GRAVITY * dt
            p.x += p.vx * dt
            p.y += p.vy * dt
            p.spin += p.spinSpeed * dt
            p.flip += p.flipSpeed * dt
            // Full strength until the last 40% of its life, then fade out
            const fade = Math.min(1, (1 - p.age / p.ttl) / 0.4)
            if (p.sparkle) drawSparkle(ctx, p, fade)
            else drawDiamond(ctx, p, fade)
        }
        if (alive) requestAnimationFrame(tick)
        else canvas.remove()
    }
    requestAnimationFrame(tick)
}

const GRAVITY = 900 // px/s²
const GOLDS = ["#ddac3c", "#e9c167", "#f3d58f", "#b88424"]
const SHINE = "#fff6dc"

type Particle = {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    spin: number
    spinSpeed: number
    /** Turns the diamond edge-on and back, like confetti, so its facets catch the light */
    flip: number
    flipSpeed: number
    color: string
    age: number
    ttl: number
    sparkle: boolean
}

function makeParticle(rect: DOMRect, sparkle: boolean): Particle {
    // Fan out upwards, ±115° from straight up
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 4
    const speed = 280 + Math.random() * 520
    return {
        x:
            rect.left +
            rect.width / 2 +
            (Math.random() - 0.5) * rect.width * 0.6,
        y: rect.top + rect.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: sparkle ? 5 + Math.random() * 5 : 4 + Math.random() * 5,
        spin: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 8,
        flip: Math.random() * Math.PI * 2,
        flipSpeed: 6 + Math.random() * 8,
        color: GOLDS[Math.floor(Math.random() * GOLDS.length)],
        age: 0,
        ttl: 1 + Math.random() * 0.7,
        sparkle,
    }
}

function drawDiamond(
    ctx: CanvasRenderingContext2D,
    p: Particle,
    alpha: number
) {
    const turn = Math.cos(p.flip)
    const w = p.size * 0.65
    const h = p.size
    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate(p.spin)
    ctx.scale(turn, 1)
    ctx.globalAlpha = alpha
    ctx.fillStyle = p.color
    ctx.beginPath()
    ctx.moveTo(0, -h)
    ctx.lineTo(w, 0)
    ctx.lineTo(0, h)
    ctx.lineTo(-w, 0)
    ctx.closePath()
    ctx.fill()
    // The lit facet brightens as the diamond turns to face the light
    ctx.globalAlpha = alpha * Math.max(0, Math.sin(p.flip)) * 0.85
    ctx.fillStyle = SHINE
    ctx.beginPath()
    ctx.moveTo(0, -h)
    ctx.lineTo(w, 0)
    ctx.lineTo(0, 0)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
}

/** A four-pointed twinkle */
function drawSparkle(
    ctx: CanvasRenderingContext2D,
    p: Particle,
    alpha: number
) {
    const r = p.size * (0.6 + 0.4 * Math.abs(Math.sin(p.flip)))
    const waist = r * 0.18
    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate(p.spin * 0.2)
    ctx.globalAlpha = alpha
    ctx.fillStyle = SHINE
    ctx.beginPath()
    ctx.moveTo(0, -r)
    ctx.lineTo(waist, -waist)
    ctx.lineTo(r, 0)
    ctx.lineTo(waist, waist)
    ctx.lineTo(0, r)
    ctx.lineTo(-waist, waist)
    ctx.lineTo(-r, 0)
    ctx.lineTo(-waist, -waist)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
}
