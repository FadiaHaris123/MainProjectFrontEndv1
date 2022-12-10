import Navbar from '../../Navbar'
import { Fragment } from "react";
import Chit from '../../Chit';

const StartChit = (props) => {
    return (
        <Fragment>
            <Navbar />
            <ul>
                {props.chits.map((chit) => (
                    <Chit
                    id = {chit.id}
                    chitNumber = {chit.chitNumber}
                    installment = {chit.installment}
                    duration = {chit.duration}
                    numberOfChittal = {chit.numberOfChittal}
                    currentNumberOfChittal = {chit.currentNumberOfChittal}
                    totalAmount = {chit.totalAmount}
                    launchDate = {chit.launchDate}
                    />
                ))}
            </ul>
        </Fragment>
    )
}
export default StartChit;