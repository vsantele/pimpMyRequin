import classes from "./navigation.module.css"

export default function Navigation() {
  return (
    <div className={classes.navigation}>
      <span className={classes.icon} style={{ marginLeft: "0.4rem" }}>
        👈
      </span>
      <span className={classes.icon} style={{ marginRight: "0.4rem" }}>
        👉
      </span>
    </div>
  )
}
