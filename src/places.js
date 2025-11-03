import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
app = express();

nam=axios.get("https://maps.googleapis.com/maps/api/place/findplacefromtext/json")
