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
        Pimp My Requin
      </div>
      <div
        className={`${classes.tab} ${
          activeTab === 1 ? classes.active : classes.inactive
        }`}
      >
        Where Is My Requin ?
      </div>
      <div
        className={`${classes.tab} ${
          activeTab === 2 ? classes.active : classes.inactive
        }`}
      >
        Who's the Best ?
      </div>
      <div
        className={`${classes.tab} ${
          activeTab === 3 ? classes.active : classes.inactive
        }`}
      >
        The Panier
      </div>
    </div>
  )
}

export default Header
