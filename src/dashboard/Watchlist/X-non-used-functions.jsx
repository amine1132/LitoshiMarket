import search from "#assets/search.svg";
import WelcomeBack from "../../components/Elements/WelcomeBack"
import homme from "#assets/homme.svg";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  Outlet,
  useMatch,
} from "react-router-dom";
import Bitcoin from "#assets/BitcoinBTC.svg";
import litecoinltclogo from "#assets/LitecoinLTC.svg";
import dogecoindogelogo from "#assets/DogecoinDRC.svg";

///////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////

const [showMarketCapContent, setShowMarketCapContent] = useState(true);
const [show24hVolContent, setShow24hVolContent] = useState(false);
const [isGraphContent, setIsGraphContent] = useState(false);
const [loading, setLoading] = useState(false);
const [isFilled, setIsFilled] = useState(false);
const [isConnected, setIsConnected] = useState(false);
const [isLoggedOut, setIsLoggedOut] = useState(false);

///////////////////////////////////////////////////////////////////////////////////

const handleGraphButtonClick = () => {
    setIsGraphContent(!isGraphContent);
};

const handleMarketCapButtonClick = () => {
    setShowMarketCapContent(true);
    setShow24hVolContent(false);
};

const handle24hVolButtonClick = () => {
    setShowMarketCapContent(false);
    setShow24hVolContent(true);
};

const handleTransactionButtonClick = () => {
    setShowNFTContent(false);
    setShowTokenContent(false);
    setShowTransactionContent(true);
};

///////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////

function formatAddress(address) {
    const length = address.length;
    const firstChars = address.substring(0, 8);
    const lastChars = address.substring(length - 8, length);
    return `${firstChars}...${lastChars}`;
}

///////////////////////////////////////////////////////////////////////////////////

const handleClick = () => {
    setIsFilled(!isFilled);
};