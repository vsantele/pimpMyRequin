import classes from "./navigation.module.css"

export interface NavigationProps {
  onNext: () => void
  onPrevious: () => void
}

export default function Navigation({
  onNext,
  onPrevious,
}: Readonly<NavigationProps>) {
  return (
    <div className={classes.navigation}>
      <button
        className={classes["icon-button"]}
        style={{ marginLeft: "0.4rem" }}
        onClick={onPrevious}
      >
        👈
      </button>
      <button
        className={classes["icon-button"]}
        style={{ marginRight: "0.4rem" }}
        onClick={onNext}
      >
        👉
      </button>
    </div>
  )
}
