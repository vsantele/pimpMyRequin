import classes from "./sharkChoice.module.css"

export default function SharkChoice() {
  return (
    <div>
      <div className={classes.choice}>
        <label>
          <p>Choisissez votre requin :</p>
          <select name="shark_choice" size={10}>
            <option>Requin 1</option>
            <option>Requin 2</option>
          </select>
        </label>
      </div>
      <div className={classes.barchart}></div>
      <div className={classes.spiderchart}></div>
      <div className={classes.map}></div>
    </div>
  )
}
