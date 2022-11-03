import axios from "axios";
import { useEffect, useState } from "react";
// lookup:   /<ENTITY_TYPE>/<MBID>?inc=<INC>

const LabelReleases = ({ id }) => {

    const [releasesArray, setReleasesArray] = useState([]);
    const [offset, setOffset] = useState(0);

    const handleClickBack = () => {
        setOffset(offset - 5);
    }
    const handleClickForward = () => {
        setOffset(offset + 5);
    }

    useEffect(() => {
        if (id !== '') {
            axios({
                url: `https://musicbrainz.org/ws/2/release?label=${id}`,
                params: {
                    fmt: 'json',
                    inc: 'artist-credits+genres+media',
                    offset: offset,
                    limit: 5
                }
            }).then((res) => {

                setReleasesArray(res.data.releases)

            })
        }

    }, [id, offset]);



    return (
        <>
            <ul>
                {
                    offset > 0 ?
                        <button className="btnBack" onClick={handleClickBack}><i class="fa-solid fa-backward-step" alt="Click Backward through releases"></i></button>
                        : null
                }
                {
                    releasesArray.length > 0 ?
                        releasesArray.map((release) => {
                            return (
                                < div key={release.id} className="labelReleaseContainer" >
                                    <li key={release.id}>
                                        <p>
                                            {release["artist-credit"].map((artist) => {
                                                return (
                                                    artist["name"] + artist["joinphrase"]
                                                    // checkout array.join
                                                )
                                            })}
                                            -
                                            {release.title}
                                        </p>
                                        {
                                            release["cover-art-archive"].front === false ?
                                                <div className="imgContainer"><i className="fa-solid fa-record-vinyl" alt="Image Not Found"></i></div>
                                                :
                                                <div className="imgContainer"><img src={`https://coverartarchive.org/release/${release.id}/front`} alt={`Album cover for ${release.title}`} /></div>
                                            // record spinning animation
                                        }
                                    </li>
                                </div>
                            )
                        })
                        : null
                }
                {
                    releasesArray.length > 4 ?
                        <button className="btnForward" onClick={handleClickForward}><i class="fa-solid fa-forward-step" alt="Click Forward through releases"></i></button>
                        : null
                }

            </ul >

        </>
    )
}

export default LabelReleases;