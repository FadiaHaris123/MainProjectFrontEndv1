import Header from "./Header";
import AuctionChitDetails from "./AuctionChitDetails";
import BidDetails from "../AuctionRoom/BidDetails/BidDetails";
import styles from './App.module.css';

function AuctionRoom(props) {

    return (
      <div className={styles.App}>
        <Header/>
        <AuctionChitDetails userId={props.userId}/>
        <BidDetails/>
      </div>
    );
  }
  
  export default AuctionRoom;