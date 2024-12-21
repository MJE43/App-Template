"use client"

import { Measure } from "@/types"

interface MeasureGridProps {
  measures: Measure[]
}

export default function MeasureGrid({ measures }: MeasureGridProps) {
  const totalMeasures = Math.max(measures.length, 4) // Minimum 4 measures shown

  return (
    <div
      className="absolute inset-0 grid divide-x border-r"
      style={{
        gridTemplateColumns: `repeat(${totalMeasures}, 160px)`
      }}
    >
      {Array.from({ length: totalMeasures }).map((_, index) => (
        <div key={index} className="relative h-full">
          {/* Measure Number */}
          <div className="text-muted-foreground absolute left-2 top-2 text-sm">
            {index + 1}
          </div>

          {/* Beat Lines */}
          <div className="divide-border/30 grid h-full grid-cols-4 divide-x">
            {Array.from({ length: 4 }).map((_, beatIndex) => (
              <div key={beatIndex} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
