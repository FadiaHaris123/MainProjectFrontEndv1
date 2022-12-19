import style from './TickerCell.module.css';

const TickerCell = ({ label, value }) => {
    const formattedValue = value < 10 ? `0${value}`: value.toString();

    return (
        <div className={ style.tickerCell }>
            <span className={ style.tickerCellValue }>{ formattedValue }</span>
            <span className={ style.tickerCellLabel }>{ label }</span>
        </div>
    );
}

export default TickerCell;