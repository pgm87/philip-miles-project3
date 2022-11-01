import axios from "axios";
import { useEffect, useState } from "react";
// lookup:   /<ENTITY_TYPE>/<MBID>?inc=<INC>

const LabelReleases = ({ id }) => {
    const [releasesArray, setReleasesArray] = useState([]);
    const [recordLabelID, setId] = useState(null);
    const [offset, setOffset] = useState(0);
    const handleClickBack = () => {
        setOffset(offset - 25);
    }
    const handleClickForward = () => {
        setOffset(offset + 25);
    }

    useEffect(() => {
        if (id !== '') {
            axios({
                url: `https://musicbrainz.org/ws/2/release?label=${id}`,
                params: {
                    fmt: 'json',
                    inc: 'artist-credits+genres+media',
                    offset: offset
                }
            }).then((res) => {


                // const unique = [...new Map(res.data.releases.map((release) => [release["status-id"], release])).values()];
                // console.log(res.data.releases["status-id"]);
                console.log(res.data.releases);
                setReleasesArray(res.data.releases);
            })
        }

    }, [recordLabelID, offset]);



    return (
        <section className="labelReleases">
            {
                offset > 0 ?
                    <button onClick={handleClickBack}>BACK</button>
                    : null
            }
            <ul>
                {
                    releasesArray.length > 0 ?
                        releasesArray.map((release) => {
                            return (
                                < div key={release.id} >
                                    <li> |||||
                                        <em>
                                            {release["artist-credit"].map((artist) => {
                                                return (
                                                    artist["name"] + artist["joinphrase"]
                                                )
                                            })}
                                        </em> -
                                        {release.title} |||
                                        {
                                            release["cover-art-archive"].front == false ?
                                                <p>NO IMAGE FOUND</p>
                                                :
                                                <div style={{ maxWidth: '100px' }}><img style={{ height: 'auto', width: '100%' }} src={`https://coverartarchive.org/release/${release.id}/front`} alt="Photo" /></div>
                                        }
                                    </li>
                                </div>
                            )
                        })
                        : null
                }
            </ul >
            {releasesArray.length > 24 ?
                <button onClick={handleClickForward}>F</button>
                : null
            }
        </section >
    )
}

export default LabelReleases;