import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './HomePage.css'

// OMDb-based sections using your API key (fd2db609)
// Each section uses a different search query to simulate categories.
const sections = [
  { key: 'trending', title: 'Trending Now', query: 'Avengers' },
  { key: 'popular', title: 'Popular on Netflix', query: 'Batman' },
  { key: 'top_rated', title: 'Top Rated', query: 'Spider Man' },
]

const fetchMovies = async (query) => {
  const apiKey = import.meta.env.VITE_MOVIE_API_KEY || 'fd2db609'
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}&type=movie`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch movies')
  const data = await response.json()
  if (data.Response === 'False') {
    return []
  }
  return data.Search || []
}

const Header = ({ onLogout }) => {
  const username = localStorage.getItem('nf_username') || 'Guest'
  return (
    <header className="nf-header">
      <div className="nf-header-left">
        <div className="nf-logo-small">NETFLIX</div>
        <nav className="nf-nav">
          <span className="nf-nav-item active">Home</span>
          <span className="nf-nav-item">Series</span>
          <span className="nf-nav-item">Movies</span>
        </nav>
      </div>
      <div className="nf-header-right">
        <div className="nf-user-pill">
          <div className="nf-avatar">{username.charAt(0).toUpperCase()}</div>
          <span className="nf-username">{username}</span>
        </div>
        <button className="nf-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}

const HeroBanner = ({ movie }) => {
  if (!movie) return null

  const backgroundImage =
    movie.Poster && movie.Poster !== 'N/A'
      ? movie.Poster
      : 'https://images.pexels.com/photos/7991371/pexels-photo-7991371.jpeg?auto=compress&cs=tinysrgb&w=1600'

  return (
    <section className="hero-banner">
      <div
        className="hero-bg"
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {movie.Title}
        </motion.h1>
        <motion.p
          className="hero-overview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {movie.Year ? `Released in ${movie.Year}` : 'Enjoy the latest blockbusters and classics.'}
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <button className="hero-button primary">Play</button>
          <button className="hero-button secondary">More Info</button>
        </motion.div>
      </div>
      <div className="hero-gradient-bottom" />
    </section>
  )
}

const MovieCard = ({ movie, index }) => {
  const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : ''
  const title = movie.Title
  const subtitle = movie.Year || ''

  return (
    <motion.div
      className="movie-card"
      whileHover={{ scale: 1.08, y: -10 }}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.05 * index,
      }}
    >
      {poster ? <img src={poster} alt={title} className="movie-poster" /> : <div />}
      <div className="movie-overlay">
        <h3 className="movie-title">{title}</h3>
        {subtitle && <p className="movie-rating">{subtitle}</p>}
      </div>
    </motion.div>
  )
}

const MovieRow = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null

  return (
    <section className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-scroll">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </div>
    </section>
  )
}

const HomePage = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        setLoading(true)
        const results = {}
        for (const section of sections) {
          const movies = await fetchMovies(section.query)
          if (!cancelled) {
            results[section.key] = movies
          }
        }
        if (!cancelled) {
          setData(results)
        }
      } catch (err) {
        console.error(err)
        if (!cancelled) setError('Could not load movies. Please check your API key.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('nf_username')
    navigate('/login')
  }

  const heroMovie = data.trending && data.trending.length > 0 ? data.trending[0] : null

  return (
    <div className="home-page">
      <Header onLogout={handleLogout} />
      {error && <div className="home-error-banner">{error}</div>}
      {loading && !error ? (
        <div className="home-loader">
          <div className="loader-spinner" />
          <p>Loading the latest movies for you...</p>
        </div>
      ) : (
        <>
          <HeroBanner movie={heroMovie} />
          <main className="home-main">
            {sections.map((section) => (
              <MovieRow
                key={section.key}
                title={section.title}
                movies={data[section.key] || []}
              />
            ))}
          </main>
        </>
      )}
    </div>
  )
}

export default HomePage

