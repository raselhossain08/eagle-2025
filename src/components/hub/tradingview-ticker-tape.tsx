"use client"

import { useEffect, useRef, memo } from "react"

function TradingViewTickerTape() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container.current) {
      // Clear any existing content
      container.current.innerHTML = ""

      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
      script.type = "text/javascript"
      script.async = true
      script.innerHTML = `
        {
          "symbols": [
            {
              "proName": "FOREXCOM:SPXUSD",
              "title": "S&P 500"
            },
            {
              "proName": "FOREXCOM:NSXUSD", 
              "title": "NASDAQ"
            },
            {
              "proName": "FOREXCOM:DJI",
              "title": "DOW"
            },
            {
              "proName": "BITSTAMP:BTCUSD",
              "title": "Bitcoin"
            },
            {
              "proName": "BITSTAMP:ETHUSD",
              "title": "Ethereum"
            }
          ],
          "showSymbolLogo": true,
          "colorTheme": "dark",
          "isTransparent": true,
          "displayMode": "adaptive",
          "locale": "en"
        }`

      // Add the widget container div
      const widgetDiv = document.createElement("div")
      widgetDiv.className = "tradingview-widget-container__widget"
      container.current.appendChild(widgetDiv)

      // Add the script
      container.current.appendChild(script)
    }
  }, [])

  return (
    <div
      className="tradingview-widget-container w-full h-full"
      ref={container}
      style={{ minHeight: "40px", height: "100%" }}
    ></div>
  )
}

export default memo(TradingViewTickerTape)
