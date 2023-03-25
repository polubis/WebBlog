import React from "react"
import { useLayoutEffect } from "react"

interface BlackHoleProps {
  id: string
}

const animate =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60)
  }

const useBlackHoleAnimation = ({ id }: BlackHoleProps) => {
  useLayoutEffect(() => {
    var canvas = document.getElementById(id)
    var ctx = canvas.getContext("2d")
    canvas.width = canvas?.clientWidth
    canvas.height = canvas?.clientHeight
    console.log( canvas.width)
    let acc = 0
    let reverseAll = false

    // Particles Around the Parent
    function Particle(x, y, distance, reversed) {
      this.angle = Math.random() * 2 * Math.PI
      this.radius = Math.random()
      this.opacity = (Math.random() * 5 + 2) / 10
      this.distance = (1 / this.opacity) * distance
      this.speed = this.distance * 0.00003
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
      this.radius = 26
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

    function loop() {
      if (!reverseAll) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }

      emitter.update()
      animate(loop)
    }

    loop()
  }, [])
}

const BlackHole = (props: BlackHoleProps) => {
  useBlackHoleAnimation(props)

  return <canvas id={props.id}></canvas>
}

export { BlackHole }
