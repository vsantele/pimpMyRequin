import classes from "./header.module.css"

type HeaderProps = {
  activeTab: number
}

const Header = ({ activeTab }: HeaderProps) => {
  return (
    <div className={classes.header}>
      <div
        className={`${classes.tab} ${
          activeTab === 0 ? classes.active : classes.inactive
        }`}
      >
        Pimp My requin
      </div>
      <div
        className={`${classes.tab} ${
          activeTab === 1 ? classes.active : classes.inactive
        }`}
      >
        Tab 2
      </div>
      <div
        className={`${classes.tab} ${
          activeTab === 2 ? classes.active : classes.inactive
        }`}
      >
        Tab 3
      </div>
      <div
        className={`${classes.tab} ${
          activeTab === 3 ? classes.active : classes.inactive
        }`}
      >
        Tab 4
      </div>
    </div>
  )
}

export default Header
