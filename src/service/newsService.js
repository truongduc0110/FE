import { get, post, patch, del } from '../utils/request'

const newsService = {
    // Lấy danh sách tất cả tin tức
    async getAllNews() {
        try {
            console.log('Calling getAllNews API...')
            const response = await get('news')
            console.log('getAllNews API response:', response)
            return response
        } catch (error) {
            console.error('Error in getAllNews:', error)
            throw error
        }
    },

    // Lấy tin tức theo ID
    async getNewsById(id) {
        try {
            console.log('Calling getNewsById API with id:', id)
            const response = await get(`news/${id}`)
            console.log('getNewsById API response:', response)
            return response
        } catch (error) {
            console.error('Error in getNewsById:', error)
            throw error
        }
    },

    // Tạo tin tức mới
    async createNews(newsData) {
        try {
            console.log('Calling createNews API with data:', newsData)
            const response = await post('news', newsData)
            console.log('createNews API response:', response)
            return response
        } catch (error) {
            console.error('Error in createNews:', error)
            throw error
        }
    },

    // Cập nhật tin tức
    async updateNews(id, newsData) {
        try {
            console.log('Calling updateNews API with id:', id, 'data:', newsData)
            const response = await patch(`news/${id}`, newsData)
            console.log('updateNews API response:', response)
            return response
        } catch (error) {
            console.error('Error in updateNews:', error)
            throw error
        }
    },

    // Xóa tin tức
    async deleteNews(id) {
        try {
            console.log('Calling deleteNews API with id:', id)
            const response = await del(`news/${id}`)
            console.log('deleteNews API response:', response)
            return response
        } catch (error) {
            console.error('Error in deleteNews:', error)
            throw error
        }
    }
}

export default newsService
