import TickComponent from "./TickComponent";
import TickComponent2 from "./TickComponent2";
import TickComponent3 from "./TickComponent3";
import Group5333 from "#assets/explorer/Group5333.svg";
import Filtre from '../../utils/Filtre';
import WelcomeMessage from '../../components/Elements/WelcomeBack'

////////////////////////////////////////////////////////////////////////////////////////////////////

const [showTransactionContent, setShowTransactionContent] = useState(false);
const [showMarketCapContent, setShowMarketCapContent] = useState(true);
const [show24hVolContent, setShow24hVolContent] = useState(false);
const [isGraphContent, setIsGraphContent] = useState(false);
const [loading, setLoading] = useState(false);
const [isFilled, setIsFilled] = useState(false);
const [isConnected, setIsConnected] = useState(false);
const [isLoggedOut, setIsLoggedOut] = useState(false);

////////////////////////////////////////////////////////////////////////////////////////////////////

const handleTransactionButtonClick = () => {
    setShowNFTContent(false);
    setShowTokenContent(false);
    setShowTransactionContent(true);
};

////////////////////////////////////////////////////////////////////////////////////////////////////

const requestAccounts = async () => {
    try {
      const accounts = await window.unisat.requestAccounts();
      setAccounts(accounts);
      console.log("Connect success", accounts);
      setIsConnected(true);
    } catch (e) {
      console.log("Connect failed");
      setIsLoggedOut(true);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////

function formatAddress(address) {
    const length = address.length;
    const firstChars = address.substring(0, 8);
    const lastChars = address.substring(length - 8, length);
    return `${firstChars}...${lastChars}`;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

const handleClick = () => {
    setIsFilled(!isFilled);
};

const handleGraphButtonClick = () => {
    setIsGraphContent(!isGraphContent);
};

const handle24hVolButtonClick = () => {
    setShowMarketCapContent(false);
    setShow24hVolContent(true);
};

////////////////////////////////////////////////////////////////////////////////////////////////////

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "left",
        family: "MontRegular",
        labels: {
          color: "white",
          usePointStyle: true,
          pointStyle: "rect",
          padding: 15, // Spacing between labels
          borderWidth: 10,
          font: {
            size: 16, // Change the size of caption text
            family: "MontRegular",
          },
        },
      },
      layout: {
        padding: {
          left: 200, // Doughnut left spacing
        },
      },
    },
    cutout: 80,
    elements: {
      arc: {
        borderWidth: 2, // Edge thickness
      },
    },
}; 