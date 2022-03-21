import React, { useState, useEffect } from 'react'
import { View } from './components/View';

// getting the values of local storage
const getDatafromLS = () => {
  const data = localStorage.getItem('songs');
  if (data) {
    return JSON.parse(data);
  }
  else {
    return []
  }
}

export const App = () => {

  // main array of objects state || books state || books array of objects
  const [songs, setSongs] = useState(getDatafromLS());

  // input field states
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [album, setAlbum] = useState('');
  const [id, setId] = useState('');

  // form submit event
  const handleAddSongSubmit = (e) => {
    e.preventDefault();
    // creating an object
    let song = {
      title,
      author,
      album,
      id
    }
    setSongs([...songs, song]);
    setTitle('');
    setAuthor('');
    setAlbum('');
    setId('');
  }

  // delete book from LS
  const deleteSong = (id) => {
    const filteredSongs = songs.filter((element, index) => {
      return element.id !== id
    })
    setSongs(filteredSongs);
  }

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem('songs', JSON.stringify(songs));
  }, [songs])

  return (
    <div className='wrapper'>
      <h1>SongList App</h1>
      <p>manage your songs</p>
      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
            onSubmit={handleAddSongSubmit}>
            <label>Title</label>
            <input type="text" className='form-control' required
              onChange={(e) => setTitle(e.target.value)} value={title}></input>
            <br></br>
            <label>Author</label>
            <input type="text" className='form-control' required
              onChange={(e) => setAuthor(e.target.value)} value={author}></input>
            <br></br>
            <label>Album</label>
            <input type="text" className='form-control' required
              onChange={(e) => setAlbum(e.target.value)} value={album}></input>
            <br></br>
            <label>ID#</label>
            <input type="text" className='form-control' required
              onChange={(e) => setId(e.target.value)} value={id}></input>
            <br></br>
            <button type="submit" className='btn btn-success btn-md'>
              ADD
            </button>
          </form>
        </div>

        <div className='view-container'>
          {songs.length > 0 && <>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>ID#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Album</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View songs={songs} deleteSong={deleteSong} />
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md'
              onClick={() => setSongs([])}>Remove All</button>
          </>}
          {songs.length < 1 && <div>No songs are added yet</div>}
        </div>

      </div>
    </div>
  )
}

export default App
