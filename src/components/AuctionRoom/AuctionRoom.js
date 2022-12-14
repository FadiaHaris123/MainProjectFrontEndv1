import Header from "./Header";
import AuctionChitDetails from "./AuctionChitDetails";
import BidDetails from "../AuctionRoom/BidDetails/BidDetails";
import styles from './App.module.css';

function AuctionRoom() {

    return (
      <div className={styles.App}>
        <Header/>
        <AuctionChitDetails/>
        <BidDetails/>
      </div>
    );
  }
  
  export default AuctionRoom;