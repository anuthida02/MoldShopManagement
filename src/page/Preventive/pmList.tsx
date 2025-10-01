import { useParams } from "react-router-dom";

function pmList() {
    const { pagetype } = useParams();

    return (
        <div>
            {pagetype === "Machine" ? "PM Machine List" : "PM Mold & Die List"}
        </div>
    )
}

export default pmList