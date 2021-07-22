import { useEffect, useState } from "react"
import Api from '../api/Api';
import { Categoria, CategoriesResponse } from '../interfaces/appInterface';


export const useCategories = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState<Categoria[]>([])

    useEffect(() => {
        getCategories();
    }, [])
    
    const getCategories = async () => {
        const resp = await Api.get<CategoriesResponse>('/categorias')
        setCategories(resp.data.categorias)
        setIsLoading(false)
    }
    return {
        isLoading,
        categories
    }
}
