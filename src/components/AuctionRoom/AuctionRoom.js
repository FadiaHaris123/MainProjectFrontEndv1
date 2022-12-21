import Header from "./Header";
import AuctionChitDetails from "./AuctionChitDetails";
import BidDetails from "../AuctionRoom/BidDetails/BidDetails";
import styles from './App.module.css';
import { useLocation } from "react-router-dom";

function AuctionRoom() {

  const location = useLocation();
  const chittyId = location.state.chittyId;
  const userId = location.state.userId;
  const amount = location.state.amount;

    return (
      <div className={styles.App}>
        <Header/>
        <AuctionChitDetails userId={userId} chittyId={chittyId} amount={amount}/>
        <BidDetails userId={userId} chittyId={chittyId} amount={amount}/>
      </div>
    );
  }
  
  export default AuctionRoom;