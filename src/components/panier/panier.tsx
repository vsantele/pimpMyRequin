import { useNavigationContext } from "../../contexes/navigationContext"
import { useSharkContext } from "../../contexes/sharkContext"
import { panierMerged } from "../../utils/panier"

export default function Panier() {
  const { panier } = useSharkContext()
  const { setSelectedTab } = useNavigationContext()
  return (
    <div>
      <h1>Panier</h1>
      <div
        style={{
          borderStyle: "solid",
          borderWidth: "0.1rem",
          borderColor: "white",
          padding: "0.2rem",
          width: "20rem",
          margin: "0 auto",
          height: "30rem",
          marginBottom: "0.5rem",
        }}
      >
        {Object.entries(panierMerged(panier)).map(([specie, parts]) => (
          <div
            key={specie}
            style={{
              textAlign: "left",
              textTransform: "capitalize",
              backgroundColor: "whitesmoke",
              color: "black",
              padding: "0.2rem",
            }}
          >
            <strong>{specie}</strong>
            <p style={{ marginTop: "0.1rem" }}>{parts.join(" - ")}</p>
          </div>
        ))}
      </div>
      <button onClick={() => setSelectedTab(0)}>Nouvelle partie</button>
    </div>
  )
}
