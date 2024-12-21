"use client"

import { Button } from "@/components/ui/button"
import { Save, Settings, Download } from "lucide-react"
import GenreSelect from "@/components/context/genre-select"
import EraSelect from "@/components/context/era-select"

export default function TopBar() {
  return (
    <div className="flex h-full items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <GenreSelect />
        <EraSelect />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Save className="mr-2 size-4" />
          Save
        </Button>
        <Button variant="outline" size="sm">
          <Download className="mr-2 size-4" />
          Export
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="mr-2 size-4" />
          Settings
        </Button>
      </div>
    </div>
  )
}
