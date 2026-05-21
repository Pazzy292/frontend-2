import { useState } from "react";
import "./FerryConnectionsByPort.css";

const tabData = [
  {
    id: "france-corsica",
    label: "France - Corsica Ports",
    placeholder: "e.g. Marseille - Ajaccio",
    routes: [
      "Marseille - Ajaccio",
      "Marseille - Bastia",
      "Marseille - Porto Vecchio",
      "Toulon - Ajaccio",
      "Nice - Bastia",
      "Genoa - Bastia",
    ],
    pins: [
      { name: "Marseille", color: "orange", left: 28, top: 32 },
      { name: "Toulon",    color: "orange", left: 31, top: 35 },
      { name: "Nice",      color: "orange", left: 35, top: 28 },
      { name: "Genoa",     color: "orange", left: 40, top: 20 },
      { name: "Ajaccio",   color: "blue",   left: 40, top: 46 },
      { name: "Bastia",    color: "blue",   left: 43, top: 37 },
      { name: "Porto Vecchio", color: "blue", left: 43, top: 51 },
      { name: "Île Rousse", color: "blue",  left: 40, top: 39 },
    ],
  },
  {
    id: "italy-spain",
    label: "Italy - Spain Ports",
    placeholder: "e.g. Genoa - Barcelona",
    routes: [
      "Genoa - Barcelona",
      "Civitavecchia - Barcelona",
      "Livorno - Barcelona",
      "Barcelona - Genoa",
      "Barcelona - Civitavecchia",
    ],
    pins: [
      { name: "Genoa",          color: "orange", left: 40, top: 20 },
      { name: "Livorno",        color: "orange", left: 45, top: 28 },
      { name: "Civitavecchia",  color: "orange", left: 50, top: 45 },
      { name: "Barcelona",      color: "blue",   left: 17, top: 52 },
      { name: "Valencia",       color: "blue",   left: 10, top: 65 },
    ],
  },
  {
    id: "spain-balearics",
    label: "Spain - Balearics Ports",
    placeholder: "e.g. Denia - Ibiza",
    routes: [
      "Denia - Ibiza",
      "Denia - Palma",
      "Barcelona - Palma",
      "Valencia - Ibiza",
      "Barcelona - Ibiza",
    ],
    pins: [
      { name: "Denia",      color: "orange", left: 12, top: 70 },
      { name: "Barcelona",  color: "orange", left: 17, top: 52 },
      { name: "Valencia",   color: "orange", left: 10, top: 65 },
      { name: "Ibiza",      color: "blue",   left: 16, top: 68 },
      { name: "Palma",      color: "blue",   left: 20, top: 63 },
      { name: "Mahón",      color: "blue",   left: 26, top: 60 },
    ],
  },
  {
    id: "mediterranean",
    label: "Maroc Ports",
    placeholder: "e.g. Genoa - Tunis",
    routes: [
      "Genoa - Tunis",
      "Palermo - Tunis",
      "Salerno - Tangier",
      "Almería - Nador",
      "Bari - Durres",
    ],
    pins: [
      { name: "Genoa",    color: "orange", left: 40, top: 20 },
      { name: "Palermo",  color: "orange", left: 54, top: 78 },
      { name: "Salerno",  color: "orange", left: 60, top: 60 },
      { name: "Almería",  color: "orange", left: 8,  top: 76 },
      { name: "Bari",     color: "orange", left: 67, top: 53 },
      { name: "Tunis",    color: "blue",   left: 52, top: 88 },
      { name: "Tangier",  color: "blue",   left: 3,  top: 88 },
      { name: "Nador",    color: "blue",   left: 7,  top: 85 },
      { name: "Durres",   color: "blue",   left: 79, top: 50 },
    ],
  },
];

export default function FerryConnectionsByPort() {
  const [active, setActive] = useState(tabData[0]);
  const [selectedRoute, setSelectedRoute] = useState("");

  return (
    <section className="ferry-port-section">
      <div className="ferry-port-container">
        <h2>Ferry connections by Port</h2>

        <p className="ferry-port-description">
          See what port connections are available and find the best way to
          travel whether you are looking for the nearest port, the shortest
          route, the cheapest ferry ticket or just want to know which nearby
          islands you can visit while on holiday.
        </p>

        <div className="ferry-port-tabs">
          {tabData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActive(tab);
                setSelectedRoute("");
              }}
              className={active.id === tab.id ? "active" : ""}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="ferry-map-wrapper">
          <div className="route-box">
            <span>Ferry Routes and Tickets</span>

            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
            >
              <option value="">{active.placeholder}</option>
              {active.routes.map((route) => (
                <option key={route} value={route}>
                  {route}
                </option>
              ))}
            </select>

            <button type="button">⌄</button>
          </div>

          <div className="map-background">
            <span className="map-city rome">Rome</span>

            {active.pins.map((pin) => (
              <div
                key={pin.name}
                className={`port-pin ${pin.color}`}
                style={{
                  left: `${pin.left}%`,
                  top: `${pin.top}%`,
                }}
              >
                <div className="pin-shape">
                  <span>⛴</span>
                </div>
                <p>{pin.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
