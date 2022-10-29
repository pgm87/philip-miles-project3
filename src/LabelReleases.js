import axios from "axios";
import { useEffect, useState } from "react"
// lookup:   /<ENTITY_TYPE>/<MBID>?inc=<INC>

const LabelReleases = ({ id }) => {
    const [releasesArray, setReleasesArray] = useState([]);

    useEffect(() => {
        if (id !== '') {
            axios({
                url: `https://musicbrainz.org/ws/2/label`,
                method: "GET",
                params: {
                    mbid: id,
                    fmt: 'json',
                    inc: 'releases'
                }
            }).then((res) => {
                console.log(res);
            })
        }

    }, [id])
    console.log(id);
    return (
        <h3>HELLOW</h3>

    )
}

export default LabelReleases;