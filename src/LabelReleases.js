import axios from "axios";
import { useEffect, useState } from "react";
// lookup:   /<ENTITY_TYPE>/<MBID>?inc=<INC>

const LabelReleases = ({ id }) => {
    const [releasesArray, setReleasesArray] = useState([]);
    const [recordLabelID, setId] = useState(null);
    console.log(id);
    useEffect(() => {
        if (id !== '') {
            axios({
                url: `https://musicbrainz.org/ws/2/label/${id}`,
                method: "GET",
                params: {
                    fmt: 'json',
                    inc: 'releases+artist-credits'
                }
            }).then((res) => {
                console.log(res.data.releases);
                setReleasesArray(res.data.releases);
            })
        }

    }, [recordLabelID]);

    return (
        <div>
            <ul>
                {
                    releasesArray.length > 0 ?
                        releasesArray.map((release) => {
                            return (
                                <div key={release.id}>
                                    <li >{release["artist-credit"][0]["name"]}-{release.title}</li>
                                </div>
                            )
                        })
                        : null
                }
            </ul>
        </div >
    )
}

export default LabelReleases;