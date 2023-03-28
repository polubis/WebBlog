import React from "react"
import { useLayoutEffect } from "react"

interface BlackHoleProps {
  id: string
  height: number
  width: number
  radius: number
}

const animate = window.requestAnimationFrame

const useBlackHoleAnimation = ({
  id,
  height,
  width,
  radius,
}: BlackHoleProps) => {
  useLayoutEffect(() => {
    let canvas = document.getElementById(id)! as HTMLCanvasElement
    let ctx = canvas.getContext("2d")!
    canvas.width = width
    canvas.height = height
    let acc = 0
    let reverseAll = false

    function Particle(x, y, distance, reversed) {
      this.angle = Math.random() * 2 * Math.PI
      this.radius = Math.random() + 1
      this.opacity = (Math.random() * 5 + 2) / 10
      this.distance = (1 / this.opacity) * distance
      this.speed = this.distance * 0.000003
      this.direction = this.position = {
        x: x + this.distance * Math.cos(this.angle),
        y: y + this.distance * Math.sin(this.angle),
      }

      this.draw = function () {
        ctx.fillStyle = "rgba(255,255,255," + this.opacity + ")"
        ctx.beginPath()
        ctx.arc(
          this.position.x,
          this.position.y,
          this.radius,
          0,
          Math.PI * 2,
          false
        )
        ctx.fill()
        ctx.closePath()
      }
      this.update = function () {
        this.angle += this.speed

        if (reversed) {
          this.position = {
            x: x + this.distance * -Math.sin(this.angle),
            y: y + this.distance * -Math.cos(this.angle),
          }
        } else {
          this.position = {
            x: x + this.distance * Math.cos(this.angle),
            y: y + this.distance * Math.sin(this.angle),
          }
        }

        this.draw()
      }
    }

    function Emitter(x, y) {
      this.position = { x: x, y: y }
      this.radius = radius
      this.count = 3000
      this.particles = []

      for (var i = 0; i < this.count; i++) {
        this.particles.push(
          new Particle(this.position.x, this.position.y, this.radius, i >= 1500)
        )
      }
    }

    Emitter.prototype = {
      update: function () {
        for (var i = 0; i < this.count; i++) {
          this.particles[i].update()
        }

        if (acc === this.count / 10 - 1) {
          reverseAll = true
        } else if (acc === 0) {
          reverseAll = false
        }

        if (reverseAll) {
          acc--
        } else {
          acc++
        }
      },
    }

    var emitter = new Emitter(canvas.width / 2, canvas.height / 2)

    let reg

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      emitter.update()
      reg = animate(loop)
    }

    if (width > 0 && height > 0) {
      loop()
    }

    return () => {
      cancelAnimationFrame(reg)
    }
  }, [])
}

const BlackHole = (props: BlackHoleProps) => {
  useBlackHoleAnimation(props)

  return <canvas id={props.id}></canvas>
}

export type { BlackHoleProps }

export { BlackHole }
