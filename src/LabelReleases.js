import axios from "axios";
import { useEffect, useState } from "react";
// lookup:   /<ENTITY_TYPE>/<MBID>?inc=<INC>

const LabelReleases = ({ id }) => {
    const [releasesArray, setReleasesArray] = useState([]);
    const [recordLabelID, setId] = useState(null);
    console.log(id);
    // useEffect(() => {
    //     if (id !== '') {
    //         axios({
    //             url: `https://musicbrainz.org/ws/2/label/${id}`,
    //             method: "GET",
    //             params: {
    //         
    //                 fmt: 'json',
    //                 inc: 'releases'
    //             }
    //         }).then((res) => {
    //             console.log(res);
    //         })
    //     }

    // }, [recordLabelID])
    return (
        <div>
            {
                id
            }
        </div>
    )
}

export default LabelReleases;