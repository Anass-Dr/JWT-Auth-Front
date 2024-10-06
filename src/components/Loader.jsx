import { useContext } from "react";
import { LoaderContext } from "../context/LoaderContext";
import "../styles/spinner.css";

export default function Loader() {
    const {loading} = useContext(LoaderContext);

    if (!loading) return null;
    return (
        <div id="loader-container">
            <span className="loader"></span>;
        </div>
    )
}