import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getUser } from '../services/userService'
import ReviewForm from '../components/ReviewForm'

const Library = () => {
  const { isAuthenticated, user } = useAuth0()
  const [cartItems, setCartItems] = useState([])
  const [selectedVideogame, setSelectedVideogame] = useState(null) // Estado para mantener el id del videojuego seleccionado

  useEffect(() => {
    const createUser = async () => {
      try {
        if (isAuthenticated && user.email) {
          const { videogames } = await getUser(user.email)
          setCartItems(videogames)
        }
      } catch (error) {
        console.log(error)
      }
    }

    createUser()
  }, [isAuthenticated, user])

  // Función para mostrar el formulario de reseña del videojuego seleccionado
  const handleReviewClick = (videogameId) => {
    setSelectedVideogame(videogameId)
  }

  return (
    <div className='min-h-screen flex flex-col justify-start items-start p-4 md:px-6 lg:px-10 xl:px-14 mb-10'>
      <div className='w-full bg-gray-200 text-gray-800 rounded-lg p-6 px-10'>
        <h2 className='text-2xl font-semibold my-3 border-b-2 border-gray-400'>
          Library of Video Games
        </h2>

        <div className='flex flex-col gap-2 px-4'>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className='flex items-center my-3 justify-between border-b-[1px] border-white pb-2'
            >
              <div className='flex items-start gap-2'>
                <div className='flex items-center w-[80px] h-[102px] overflow-hidden'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-full h-full object-cover'
                  />
                </div>
                <p>{item.name}</p>
              </div>

              {/* Renderizar el botón de reseña por cada videojuego */}
              <button
                onClick={() => handleReviewClick(item.id)}
                className='border border-purple-600 py-2 px-4 rounded'
              >
                Leave a Review
              </button>
            </div>
          ))}
        </div>

        
        {selectedVideogame && (
          <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50'>
            <div className='bg-white p-4 rounded-lg'>
              <h2 className='text-xl font-semibold mb-2'></h2>
              <ReviewForm
                videogameId={selectedVideogame}
                closeForm={() => setSelectedVideogame(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Library