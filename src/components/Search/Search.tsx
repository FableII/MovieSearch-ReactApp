import './Search.css'


export const Search = () => {
  return (
    <main className="app__search">
      <form className="app__search__form" action="">
      <input className="app__search__form-input" type="text" placeholder='Search...'/>
      <button className="app__search__form-btn">Search</button>
      </form>
    </main>
  )
}



