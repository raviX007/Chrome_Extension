import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import React from "react"

import ChatWindow from "~popup"

 

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return (
    <div className="plasmo-z-50 plasmo-flex plasmo-fixed plasmo-top-32 plasmo-right-8">
      <ChatWindow />
    </div>
  )
}

export default PlasmoOverlay
