import styles from './CountriesTable.module.css';
import Link from "next/link";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import { useState } from "react";

const orderBy = (countires,direction,value) =>
{
    if(direction==='asc')
    {
        return [...countires].sort((a,b)=>a[value] > b[value] ?1:-1);
    }
    if(direction==='desc')
    {
        return [...countires].sort((a,b)=>a[value] > b[value] ?-1:1);
    }
    return countires;
}

const SortArraw = ({direction})=>{
    if(!direction)
    return <></>;
    if(direction==='desc')
        return (<div className={styles.heading_arrow}><KeyboardArrowDownRounded/></div>);
    else
        return (<div className={styles.heading_arrow}><KeyboardArrowUpRounded/></div>);
}

const CountriesTable = ({countries}) => {

    const [direction,setDirection] = useState();
    const [value,setValue]=useState();
    const orderedCountires = orderBy(countries,direction,value);

    const swithDirection = () =>
    {
        if(!direction)
            setDirection("desc");
        else if(direction==="desc")
            setDirection("asc");
        else
            setDirection(null)
    }

    const setValueAndDirection = (value) =>
    {
        swithDirection();
        setValue(value);
    }

    return (<div>
        <div className={styles.heading}>
            <button className={styles.heading_name} onClick={()=>setValueAndDirection("name")}><div>Name</div>
            <SortArraw/>
            </button>
       
            <button className={styles.heading_name} onClick={()=>setValueAndDirection("population")}><div>Population</div>
            <SortArraw direction={direction}/>

            </button>
        </div>

       {
           orderedCountires.map((country)=>(
               <Link href={`/country/${country.alpha3Code}`} key={country.alpha3Code}>
                <div  className={styles.row}>
                <div className={styles.name}>{country.name}</div>
                <div className={styles.name}>{country.population}</div>
               </div>
               </Link>
           ))
       }


         </div>

);
    }


export default CountriesTable;