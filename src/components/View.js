import React from 'react'
import { Icon } from 'react-icons-kit'
import { trash } from 'react-icons-kit/feather/trash'

export const View = ({ songs, deleteSong }) => {

    return songs.map(song => (

        <tr key={song.id}>
            <td>{song.id}</td>
            <td>{song.title}</td>
            <td>{song.author}</td>
            <td>{song.album}</td>
            <td className='delete-btn' onClick={() => deleteSong(song.id)}>
                <Icon icon={trash} />
            </td>
        </tr>

    ))
}

