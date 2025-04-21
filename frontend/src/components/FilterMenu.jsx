import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'

export default function FilterMenu({ isOpen, setFilterMenuOpen, activeFilters, setActiveFilters, applyFilters }) {
    
    const [tags, setTags] = useState([]);
    const [groups, setGroups] = useState([]);


    const toggleTagFilter = (filterId) => {
        if (activeFilters.tags.includes(filterId)) {
            setActiveFilters(prev => ({...prev, tags: prev.tags.filter(tag => tag !== filterId) }))
        } else {
            setActiveFilters(prev => ({...prev, tags: [...prev.tags, filterId] }))
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("jwt")
        const userId = jwtDecode(token).id

        const fetchTags = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}tag/user/` + userId, {
                headers: {
                    "authorization": "Bearer " + token
                }
            })

            if (response.ok) {
                const data = await response.json()
                setTags(data)
            } else {
                console.log("Error al recuperar las etiquetas")
            }
        }

        fetchTags()

        const fetchGroups = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}group/user/` + userId, {
                headers: {
                    "authorization": "Bearer " + token
                }
            })

            if (response.ok) {
                const data = await response.json()
                setGroups(data)
            } else {
                console.log("Error al recuperar los grupos")
            }
        }

        fetchGroups()

    }, [])

    return (
        <div className={`absolute w-full h-full p-4 bg-white z-50 transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="w-full flex">
                <h1 className="font-bold text-2xl">
                    Filtrar
                </h1>
                <button className="ml-auto" onClick={() => setFilterMenuOpen(false)}>
                    <img src="/images/x.svg" alt="Cerrar Menu" className="w-8 h-8" />
                </button>
            </div>

            <div className="w-full flex flex-col mt-4">
                <p className="mb-2 text-lg">Filtrar por grupo:</p>
                {
                    groups.length === 0 ?
                    <p className='text-center text-sm'>
                        No hay grupos disponibles
                    </p>
                    :
                    <select name="group" id="group" className='w-3/4 bg-gray-200 py-1 px-2 pr-4 rounded-3xl'
                        onChange={(e) => setActiveFilters(prev => ({ ...prev, group: e.target.value }))}
                    >
                        <option value="all">Todos</option>
                        <option value="undefined">Sin grupo</option>
                        {
                            groups.map(group => (
                                <option key={group.id} value={group.id}>{group.name}</option>
                            ))
                        }
                    </select>
                }                


                <p className="mt-8 mb-2 text-lg">Filtrar por etiquetas:</p>
                <div className="flex flex-wrap gap-2">
                    {
                    tags.length === 0 ?
                    <p className='w-full text-center text-sm'>
                        No hay etiquetas disponibles
                    </p>
                    :
                    tags.map(tag => (
                        <span 
                            key={tag.id}
                            className={`px-2 py-1 ${activeFilters.tags.includes(tag.id) ? 'bg-green-200' : 'bg-gray-200'} rounded-3xl flex items-center cursor-pointer`}
                            onClick={() => toggleTagFilter(tag.id)}
                        >
                            {
                                activeFilters.tags.includes(tag.id)?
                                <img src="/images/check.svg" alt="Grupo" className="w-4 h-4 mr-1" />
                                :
                                <img src="/images/x.svg" alt="Grupo" className="w-4 h-4 mr-1" />
                            }
                            {tag.name}
                        </span>
                    ))}
                </div>

                <button className='bg-black w-full text-white mt-12 py-4 rounded-3xl rounded-tr-md rounded-bl-md'
                    onClick={() => {
                        setFilterMenuOpen(false)
                        applyFilters(activeFilters)
                    }}
                >
                    Aplicar filtros
                </button>
            </div>
        </div>
    )
};