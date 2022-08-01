import React, {useEffect} from 'react';
import {ethers} from "ethers";
import MyAuction from "../contractsData/MyAuction.json";
import contractAddress from "../contractsData/contract-address.json";
import Auctions from "../contractsData/Auction.json";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const auctionsContract = new ethers.Contract(contractAddress.Auctions, Auctions.abi, provider.getSigner(0));
const myAuctionsContracts=[];
let numMyAuctions=0;

class StartButton extends React.Component {
    buttonClick;

    render() {
        return (
            <div className="patient-container">
                <button class="btn">Start</button>
            </div>
        )
    }
}
const arr=[]
function _showAuction(){
    try{
        arr=this._auctions.allAuctions();
        console.log("function")
    }
    catch(error){
        console.log(error)
    }
}
function ShowAuctions() {
    // auctionsList.forEach((item) => {
    //         console.log(item.address);
    //     }
    // )

    // this.state._auctions;
    // contract=new Contract(address,MyAuction.abi,provider);

    useEffect(() => {

        function start(auc){
            auc.startAuction();
        }
        console.log(myAuctionsContracts)
        async function fetchData() {
            try {
                console.log(auctionsContract)
                auctionsContract.on('AuctionCreated', async (numAuctions, allAuctions) => {
                    
                    allAuctions.forEach((auctionAddress)=>{
                        myAuctionsContracts.push(new ethers.Contract(auctionAddress,MyAuction.abi,provider));
                    })
                    console.log(myAuctionsContracts)
                    numMyAuctions=numAuctions;
                    console.log(numMyAuctions)
                    this._showAuction();
                    document.getElementById("myAuctionsbody").innerHTML="";
                    for (var i=0;i<numMyAuctions;i++){
                        let auction=myAuctionsContracts[i];
                        let AucionsView ="<tr><td>"+ await auction.owner()+"</td>";
                        AucionsView+= "<td>" + await auction.objectName()+"</td>"
                        AucionsView+= "<td>" + await  auction.objectDescription()+"</td>";
                        // let started = await auction.started;
                        // let ended   = await auction.ended;
                        // let status="";
                        // if(!started) status="not started";
                        // else if(!ended) status="in action";
                        // else status="ended"
                        // AucionsView+= "<td>"+status+"</td>";
                        AucionsView+="<td>";
                        // <StartButton />
                        AucionsView+="</td>";
                        AucionsView+="</tr>";
                        console.log(AucionsView);
                        document.getElementById("myAuctionsbody").innerHTML+=AucionsView;
                    }
                    console.log(myAuctionsContracts);
                })
            } catch (e) {
            }
        }

        fetchData();
    }, []);
    

    return <div className="container">
        <h2>Auction Table</h2>
       
        <table className="table">
            <thead>
            <tr>
                <th>owner</th>
                <th>name</th>
                <th>description</th>
                
            </tr>
            </thead>
            <tbody id="myAuctionsbody">

            </tbody>
        </table>
    </div>
    ;
    
}
export default ShowAuctions;