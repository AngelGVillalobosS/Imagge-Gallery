const memoryStore = {
    photos: [],
    messages: [],
    users: ['Jorge', 'Carlos', 'Aziel', 'Itzel', 'Gabriel', 'Arturo', 'Mireya', 'Adriana', 'Michelle', 'Zyanya'],

    counters: {
        photoId: 0,
        mssgId: 0
    },

    addPhoto(photoData){
        const newPhoto = {
            id: ++this.counters.photoId,
            user: photoData.user,
            base64: photoData.base64,
            date: new Date().toISOString(),
        };

        this.photos.unshift(newPhoto);
        return newPhoto;
    },

    addMsg(messageData){
        const newMssg = {
            id: ++this.counters.mssgId,
            user: messageData.user,
            text: messageData.text,
            date: new Date().toISOString()
        };

        this.messages.unshift(newMssg);
        return newMssg;
    },

    getPhotos(page = 0, limit = 20){
        const start = page * limit;
        const end = start + limit;

        return {
            photos: this.photos.slice(start, end),
            total: this.photos.length,
            page,
            totalPages: Math.ceil(this.photos.length / limit)
        };
    },

    getLastMessages(limit = 4){
        return this.messages.slice(0, limit);
    },

    getRandomUser(){
        const index = Math.floor(Math.random() * this.users.length);
        return this.users[index];
    }
};

module.exports = memoryStore;