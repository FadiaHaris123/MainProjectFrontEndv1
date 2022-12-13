import  TickerCell  from './TickerCell';
import  useTicker  from './useTicker';
import classes from './Ticker.module.css';


const Ticker = ({ futureDate }) => {
    const { minutes, seconds, isTimeUp } = useTicker(futureDate);
    const tickerContents = isTimeUp ? (
        <div className={classes.warning}>Time is up!!!</div>
    ) : (
        <span className={classes.ticker}>
         <TickerCell value={minutes} label=" min" /><span className={classes.separator}>:</span><TickerCell value={seconds} label=" sec" />
        </span>
    );

    return (
        <div>
            { tickerContents }           
        </div>              
    );
}

export default Ticker;